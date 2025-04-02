<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    public function run(): void
    {
        $cities = [
            ['name' => 'Bogotá', 'department' => 'Bogotá D.C.'],
            ['name' => 'Medellín', 'department' => 'Antioquia'],
            ['name' => 'Cali', 'department' => 'Valle del Cauca'],
            ['name' => 'Barranquilla', 'department' => 'Atlántico'],
            ['name' => 'Cartagena', 'department' => 'Bolívar'],
            ['name' => 'Cúcuta', 'department' => 'Norte de Santander'],
            ['name' => 'Bucaramanga', 'department' => 'Santander'],
            ['name' => 'Pereira', 'department' => 'Risaralda'],
            ['name' => 'Santa Marta', 'department' => 'Magdalena'],
            ['name' => 'Ibagué', 'department' => 'Tolima'],
            ['name' => 'Pasto', 'department' => 'Nariño'],
            ['name' => 'Manizales', 'department' => 'Caldas'],
            ['name' => 'Neiva', 'department' => 'Huila'],
            ['name' => 'Villavicencio', 'department' => 'Meta'],
            ['name' => 'Armenia', 'department' => 'Quindío'],
        ];

        foreach ($cities as $city) {
            City::create($city);
        }
    }
} 