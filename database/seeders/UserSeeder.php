<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Crear o actualizar el usuario super admin
        $superAdmin = User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Asignar el rol super-admin
        $superAdmin->assignRole('super-admin');

        // Crear usuario de pruebas con rol empleado
        $empleado = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Usuario Prueba',
                'password' => Hash::make('user1234'),
                'email_verified_at' => now(),
            ]
        );

        // Asignar el rol empleado
        $empleado->assignRole('empleado');
    }
} 