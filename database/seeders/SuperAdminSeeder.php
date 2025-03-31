<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        // Crear el rol super-admin si no existe
        $superAdminRole = Role::firstOrCreate(['name' => 'super-admin']);

        // Crear el usuario super-admin
        $superAdmin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('admin123'),
            ]
        );

        // Asignar el rol super-admin al usuario
        $superAdmin->assignRole('super-admin');

        $this->command->info('Super Admin creado exitosamente.');
        $this->command->info('Email: admin@example.com');
        $this->command->info('Password: admin123');
    }
} 