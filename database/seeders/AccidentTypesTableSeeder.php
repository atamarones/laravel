<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AccidentTypesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('accident_types')->insert([
            [
                'name' => 'Colisión',
                'description' => 'Un accidente que involucra una colisión entre vehículos.',
                'created_by' => 'Seeder',
                'updated_by' => null,
                'deleted_by' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Resbalón y caída',
                'description' => 'Un accidente causado por resbalones o tropiezos.',
                'created_by' => 'Seeder',
                'updated_by' => null,
                'deleted_by' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Incendio',
                'description' => 'Un accidente causado por fuego o explosión.',
                'created_by' => 'Seeder',
                'updated_by' => null,
                'deleted_by' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}