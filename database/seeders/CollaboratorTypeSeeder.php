<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CollaboratorTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'name' => 'Empleado de Tiempo Completo',
                'description' => 'Empleado que labora 8 horas diarias o 48 horas semanales'
            ],
            [
                'name' => 'Empleado de Medio Tiempo',
                'description' => 'Empleado que labora 4 horas diarias o 24 horas semanales'
            ],
            [
                'name' => 'Contratista',
                'description' => 'Persona natural o jurídica que presta servicios a través de un contrato de prestación de servicios'
            ],
            [
                'name' => 'Consultor',
                'description' => 'Profesional independiente que presta servicios de asesoría'
            ],
            [
                'name' => 'Practicante',
                'description' => 'Estudiante que realiza prácticas profesionales'
            ],
            [
                'name' => 'Temporal',
                'description' => 'Empleado contratado por un tiempo determinado'
            ],
        ];

        DB::table('collaborator_types')->insert($types);
    }
} 