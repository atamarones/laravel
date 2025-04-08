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
        Permission::firstOrCreate(['name' => 'employees.view', 'description' => 'Ver empleados']);
        Permission::firstOrCreate(['name' => 'employees.create', 'description' => 'Crear empleados']);
        Permission::firstOrCreate(['name' => 'employees.edit', 'description' => 'Editar empleados']);
        Permission::firstOrCreate(['name' => 'employees.delete', 'description' => 'Eliminar empleados']);

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
        Permission::firstOrCreate(['name' => 'roles.view']);
        Permission::firstOrCreate(['name' => 'roles.create']);
        Permission::firstOrCreate(['name' => 'roles.edit']);
        Permission::firstOrCreate(['name' => 'roles.delete']);

        // Permisos para EPS
        Permission::firstOrCreate(['name' => 'eps.view']);
        Permission::firstOrCreate(['name' => 'eps.create']);
        Permission::firstOrCreate(['name' => 'eps.edit']);
        Permission::firstOrCreate(['name' => 'eps.delete']);

        // Permisos para Tipos de Sangre
        Permission::firstOrCreate(['name' => 'blood-types.view']);
        Permission::firstOrCreate(['name' => 'blood-types.create']);
        Permission::firstOrCreate(['name' => 'blood-types.edit']);
        Permission::firstOrCreate(['name' => 'blood-types.delete']);

        // Permisos para Ciudades
        Permission::firstOrCreate(['name' => 'cities.view']);
        Permission::firstOrCreate(['name' => 'cities.create']);
        Permission::firstOrCreate(['name' => 'cities.edit']);
        Permission::firstOrCreate(['name' => 'cities.delete']);

        // Permisos para Razones de Terminación
        Permission::firstOrCreate(['name' => 'termination-reasons.view']);
        Permission::firstOrCreate(['name' => 'termination-reasons.create']);
        Permission::firstOrCreate(['name' => 'termination-reasons.edit']);
        Permission::firstOrCreate(['name' => 'termination-reasons.delete']);

        // Permisos para Cargos
        Permission::firstOrCreate(['name' => 'positions.view']);
        Permission::firstOrCreate(['name' => 'positions.create']);
        Permission::firstOrCreate(['name' => 'positions.edit']);
        Permission::firstOrCreate(['name' => 'positions.delete']);

        // Permisos para Tipos de Colaborador
        Permission::firstOrCreate(['name' => 'collaborator-types.view']);
        Permission::firstOrCreate(['name' => 'collaborator-types.create']);
        Permission::firstOrCreate(['name' => 'collaborator-types.edit']);
        Permission::firstOrCreate(['name' => 'collaborator-types.delete']);

        // Permisos para CIE-10
        Permission::firstOrCreate(['name' => 'cie10.view']);
        Permission::firstOrCreate(['name' => 'cie10.create']);
        Permission::firstOrCreate(['name' => 'cie10.edit']);
        Permission::firstOrCreate(['name' => 'cie10.delete']);

        // Permisos para Géneros
        Permission::firstOrCreate(['name' => 'genders.view']);
        Permission::firstOrCreate(['name' => 'genders.create']);
        Permission::firstOrCreate(['name' => 'genders.edit']);
        Permission::firstOrCreate(['name' => 'genders.delete']);

        // Permisos para Estados Civiles
        Permission::firstOrCreate(['name' => 'civil-status.view']);
        Permission::firstOrCreate(['name' => 'civil-status.create']);
        Permission::firstOrCreate(['name' => 'civil-status.edit']);
        Permission::firstOrCreate(['name' => 'civil-status.delete']);

        // Permisos para Tipos de Ausencia
        Permission::firstOrCreate(['name' => 'absence-types.view']);
        Permission::firstOrCreate(['name' => 'absence-types.create']);
        Permission::firstOrCreate(['name' => 'absence-types.edit']);
        Permission::firstOrCreate(['name' => 'absence-types.delete']);

        // Crear rol super-admin y asignar todos los permisos
        $role = Role::firstOrCreate(['name' => 'super-admin']);
        $role->givePermissionTo(Permission::all());
    }
} 