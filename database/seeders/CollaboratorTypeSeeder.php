<?php

namespace Database\Seeders;

use App\Models\CollaboratorType;
use Illuminate\Database\Seeder;

class CollaboratorTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            ['name' => 'Empleado de planta'],
            ['name' => 'Contratista'],
            ['name' => 'Temporal'],
            ['name' => 'Practicante'],
            ['name' => 'Aprendiz SENA'],
        ];

        foreach ($types as $type) {
            CollaboratorType::create($type);
        }
    }
} 