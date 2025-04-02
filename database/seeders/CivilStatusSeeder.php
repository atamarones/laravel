<?php

namespace Database\Seeders;

use App\Models\CivilStatus;
use Illuminate\Database\Seeder;

class CivilStatusSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = [
            ['name' => 'Soltero/a'],
            ['name' => 'Casado/a'],
            ['name' => 'Divorciado/a'],
            ['name' => 'Viudo/a'],
            ['name' => 'Unión libre'],
        ];

        foreach ($statuses as $status) {
            CivilStatus::create($status);
        }
    }
} 