<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Permisos de usuarios
        Permission::firstOrCreate(['name' => 'users.view']);
        Permission::firstOrCreate(['name' => 'users.create']);
        Permission::firstOrCreate(['name' => 'users.edit']);
        Permission::firstOrCreate(['name' => 'users.delete']);

        // Permisos de empleados
        Permission::firstOrCreate(['name' => 'employees.view']);
        Permission::firstOrCreate(['name' => 'employees.create']);
        Permission::firstOrCreate(['name' => 'employees.edit']);
        Permission::firstOrCreate(['name' => 'employees.delete']);

        // Permisos de asistencias
        Permission::firstOrCreate(['name' => 'attendances.view']);
        Permission::firstOrCreate(['name' => 'attendances.create']);
        Permission::firstOrCreate(['name' => 'attendances.edit']);
        Permission::firstOrCreate(['name' => 'attendances.delete']);

        // Permisos de ausencias
        Permission::firstOrCreate(['name' => 'absences.view']);
        Permission::firstOrCreate(['name' => 'absences.create']);
        Permission::firstOrCreate(['name' => 'absences.edit']);
        Permission::firstOrCreate(['name' => 'absences.delete']);

        // Permisos de accidentes
        Permission::firstOrCreate(['name' => 'accidents.view']);
        Permission::firstOrCreate(['name' => 'accidents.create']);
        Permission::firstOrCreate(['name' => 'accidents.edit']);
        Permission::firstOrCreate(['name' => 'accidents.delete']);

        // Permisos para Roles
        Permission::create(['name' => 'roles.view']);
        Permission::create(['name' => 'roles.create']);
        Permission::create(['name' => 'roles.edit']);
        Permission::create(['name' => 'roles.delete']);

        // Permisos para EPS
        Permission::create(['name' => 'eps.view']);
        Permission::create(['name' => 'eps.create']);
        Permission::create(['name' => 'eps.edit']);
        Permission::create(['name' => 'eps.delete']);

        // Permisos para Tipos de Sangre
        Permission::create(['name' => 'blood-types.view']);
        Permission::create(['name' => 'blood-types.create']);
        Permission::create(['name' => 'blood-types.edit']);
        Permission::create(['name' => 'blood-types.delete']);

        // Permisos para Ciudades
        Permission::create(['name' => 'cities.view']);
        Permission::create(['name' => 'cities.create']);
        Permission::create(['name' => 'cities.edit']);
        Permission::create(['name' => 'cities.delete']);

        // Permisos para Razones de Terminación
        Permission::create(['name' => 'termination-reasons.view']);
        Permission::create(['name' => 'termination-reasons.create']);
        Permission::create(['name' => 'termination-reasons.edit']);
        Permission::create(['name' => 'termination-reasons.delete']);

        // Permisos para Cargos
        Permission::create(['name' => 'positions.view']);
        Permission::create(['name' => 'positions.create']);
        Permission::create(['name' => 'positions.edit']);
        Permission::create(['name' => 'positions.delete']);

        // Permisos para Tipos de Colaborador
        Permission::create(['name' => 'collaborator-types.view']);
        Permission::create(['name' => 'collaborator-types.create']);
        Permission::create(['name' => 'collaborator-types.edit']);
        Permission::create(['name' => 'collaborator-types.delete']);

        // Permisos para CIE-10
        Permission::create(['name' => 'cie10.view']);
        Permission::create(['name' => 'cie10.create']);
        Permission::create(['name' => 'cie10.edit']);
        Permission::create(['name' => 'cie10.delete']);

        // Crear rol super-admin y asignar todos los permisos
        $role = Role::create(['name' => 'super-admin']);
        $role->givePermissionTo(Permission::all());
    }
} 