<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run()
    {
        // Crear el rol super-admin si no existe
        $superAdminRole = Role::firstOrCreate(['name' => 'super-admin']);

        // Obtener todos los permisos
        $permissions = Permission::all();

        // Asignar todos los permisos al rol super-admin
        $superAdminRole->syncPermissions($permissions);

        // Crear el rol empleado si no existe
        $empleadoRole = Role::firstOrCreate(['name' => 'empleado']);

        // Asignar permisos específicos al rol empleado
        $empleadoRole->syncPermissions([
            'users.view'
        ]);
    }
} 