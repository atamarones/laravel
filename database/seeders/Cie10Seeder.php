<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Cie10Seeder extends Seeder
{
    public function run(): void
    {
        $cie10 = [
            ['code' => 'A00.0', 'description' => 'Cólera debido a Vibrio cholerae 01, biotipo cholerae'],
            ['code' => 'A15.0', 'description' => 'Tuberculosis del pulmón, confirmada por hallazgo microscópico del bacilo tuberculoso en esputo'],
            ['code' => 'B20.0', 'description' => 'Enfermedad por VIH, resultante en infección micobacteriana'],
            ['code' => 'C50.9', 'description' => 'Tumor maligno de la mama, parte no especificada'],
            ['code' => 'E11.9', 'description' => 'Diabetes mellitus tipo 2 sin complicaciones'],
            ['code' => 'F32.9', 'description' => 'Episodio depresivo, no especificado'],
            ['code' => 'I10.X', 'description' => 'Hipertensión esencial (primaria)'],
            ['code' => 'J45.9', 'description' => 'Asma, no especificada'],
            ['code' => 'K29.7', 'description' => 'Gastritis, no especificada'],
            ['code' => 'M54.5', 'description' => 'Lumbago no especificado'],
        ];

        DB::table('cie10')->insert($cie10);
    }
} 