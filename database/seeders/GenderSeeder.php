<?php

namespace Database\Seeders;

use App\Models\Gender;
use Illuminate\Database\Seeder;

class GenderSeeder extends Seeder
{
    public function run(): void
    {
        $genders = [
            ['name' => 'Masculino'],
            ['name' => 'Femenino'],
            ['name' => 'No binario'],
            ['name' => 'Prefiero no decirlo'],
        ];

        foreach ($genders as $gender) {
            Gender::create($gender);
        }
    }
} 