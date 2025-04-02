<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            ['name' => 'Gerente General'],
            ['name' => 'Gerente de Recursos Humanos'],
            ['name' => 'Gerente Financiero'],
            ['name' => 'Gerente de Operaciones'],
            ['name' => 'Gerente de Ventas'],
            ['name' => 'Supervisor de Producción'],
            ['name' => 'Supervisor de Calidad'],
            ['name' => 'Supervisor de Mantenimiento'],
            ['name' => 'Operario de Producción'],
            ['name' => 'Operario de Calidad'],
            ['name' => 'Operario de Mantenimiento'],
            ['name' => 'Auxiliar Administrativo'],
            ['name' => 'Auxiliar Contable'],
            ['name' => 'Auxiliar de Recursos Humanos'],
            ['name' => 'Recepcionista'],
            ['name' => 'Mensajero'],
            ['name' => 'Servicios Generales'],
        ];

        foreach ($positions as $position) {
            Position::create($position);
        }
    }
} 