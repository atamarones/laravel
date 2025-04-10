<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            BaseDataSeeder::class,      // Datos base del sistema
            PermissionSeeder::class,    // Permisos del sistema
            RoleSeeder::class,          // Roles y permisos
            UserSeeder::class,          // Usuarios del sistema
            EpsSeeder::class,           // EPS del sistema
            Cie10Seeder::class,         // Códigos CIE-10
            DepartmentSeeder::class,    // Departamentos de Colombia
            CitySeeder::class,          // Ciudades de Colombia
            CollaboratorTypeSeeder::class, // Tipos de colaborador
            AccidentTypesTableSeeder::class, // Accident Types
            EmployeeSeeder::class,      // Empleados de ejemplo
          
        ]);
    }
}
