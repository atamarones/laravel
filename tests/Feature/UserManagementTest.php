<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Route;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Limpiar caché de roles y permisos
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Crear permisos necesarios
        $permissions = [
            'create users',
            'read users',
            'update users',
            'delete users',
            'create roles',
            'read roles',
            'update roles',
            'delete roles',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Crear rol super-admin
        $role = Role::create(['name' => 'super-admin']);
        $role->givePermissionTo(Permission::all());
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function super_admin_can_access_users_page()
    {
        // Crear usuario admin
        $admin = User::factory()->create([
            'email' => 'admin@example.com',
            'password' => bcrypt('admin123'),
        ]);

        $admin->assignRole('super-admin');

        // Verificar que el usuario tiene el rol
        $this->assertTrue($admin->hasRole('super-admin'));

        // Simular inicio de sesión y acceso a la página de usuarios
        $response = $this->actingAs($admin)
            ->withHeaders(['Accept' => 'application/json'])
            ->get('/users');
        
        // Verificar respuesta
        $response->assertStatus(200);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function non_admin_cannot_access_users_page()
    {
        // Crear usuario regular
        $user = User::factory()->create();

        // Verificar que el usuario no tiene el rol super-admin
        $this->assertFalse($user->hasRole('super-admin'));

        // Intentar acceder a la página de usuarios
        $response = $this->actingAs($user)
            ->withHeaders(['Accept' => 'application/json'])
            ->get('/users');
        
        // Verificar que el acceso es denegado
        $response->assertStatus(403);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function super_admin_can_create_user()
    {
        // Crear usuario admin
        $admin = User::factory()->create();
        $admin->assignRole('super-admin');

        // Verificar que el usuario tiene el rol
        $this->assertTrue($admin->hasRole('super-admin'));

        // Datos para el nuevo usuario
        $userData = [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'roles' => ['super-admin']
        ];

        // Intentar crear un nuevo usuario
        $response = $this->actingAs($admin)
            ->withHeaders(['Accept' => 'application/json'])
            ->post('/users', $userData);
        
        // Verificar que el usuario fue creado
        $this->assertDatabaseHas('users', [
            'email' => 'newuser@example.com'
        ]);

        // Verificar redirección
        $response->assertRedirect('/users');
    }
} 