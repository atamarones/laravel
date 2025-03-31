<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            ['name' => 'Gerente General'],
            ['name' => 'Director de Recursos Humanos'],
            ['name' => 'Director Financiero'],
            ['name' => 'Director de Operaciones'],
            ['name' => 'Supervisor de Producción'],
            ['name' => 'Analista de Sistemas'],
            ['name' => 'Contador'],
            ['name' => 'Asistente Administrativo'],
            ['name' => 'Recepcionista'],
            ['name' => 'Auxiliar de Servicios Generales'],
        ];

        DB::table('positions')->insert($positions);
    }
} 