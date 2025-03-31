<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitySeeder extends Seeder
{
    public function run(): void
    {
        $cities = [
            // Antioquia
            ['name' => 'Medellín', 'department' => 'Antioquia'],
            ['name' => 'Bello', 'department' => 'Antioquia'],
            ['name' => 'Itagüí', 'department' => 'Antioquia'],
            ['name' => 'Envigado', 'department' => 'Antioquia'],
            ['name' => 'Rionegro', 'department' => 'Antioquia'],

            // Atlántico
            ['name' => 'Barranquilla', 'department' => 'Atlántico'],
            ['name' => 'Soledad', 'department' => 'Atlántico'],
            ['name' => 'Malambo', 'department' => 'Atlántico'],
            ['name' => 'Puerto Colombia', 'department' => 'Atlántico'],

            // Valle del Cauca
            ['name' => 'Cali', 'department' => 'Valle del Cauca'],
            ['name' => 'Palmira', 'department' => 'Valle del Cauca'],
            ['name' => 'Buenaventura', 'department' => 'Valle del Cauca'],
            ['name' => 'Tuluá', 'department' => 'Valle del Cauca'],
            ['name' => 'Yumbo', 'department' => 'Valle del Cauca'],

            // Cundinamarca
            ['name' => 'Bogotá', 'department' => 'Cundinamarca'],
            ['name' => 'Soacha', 'department' => 'Cundinamarca'],
            ['name' => 'Zipaquirá', 'department' => 'Cundinamarca'],
            ['name' => 'Facatativá', 'department' => 'Cundinamarca'],
            ['name' => 'Chía', 'department' => 'Cundinamarca'],

            // Santander
            ['name' => 'Bucaramanga', 'department' => 'Santander'],
            ['name' => 'Floridablanca', 'department' => 'Santander'],
            ['name' => 'Girón', 'department' => 'Santander'],
            ['name' => 'Piedecuesta', 'department' => 'Santander'],
            ['name' => 'Barrancabermeja', 'department' => 'Santander'],

            // Vaupés
            ['name' => 'Mitú', 'department' => 'Vaupés'],
            ['name' => 'Carurú', 'department' => 'Vaupés'],
            ['name' => 'Pacoa', 'department' => 'Vaupés'],
            ['name' => 'Papunaua', 'department' => 'Vaupés'],
            ['name' => 'Taraira', 'department' => 'Vaupés'],
            ['name' => 'Yavaraté', 'department' => 'Vaupés'],

            // Vichada
            ['name' => 'Puerto Carreño', 'department' => 'Vichada'],
            ['name' => 'Cumaribo', 'department' => 'Vichada'],
            ['name' => 'La Primavera', 'department' => 'Vichada'],
            ['name' => 'Santa Rosalía', 'department' => 'Vichada'],

            // Amazonas
            ['name' => 'Leticia', 'department' => 'Amazonas'],
            ['name' => 'El Encanto', 'department' => 'Amazonas'],
            ['name' => 'La Chorrera', 'department' => 'Amazonas'],
            ['name' => 'La Pedrera', 'department' => 'Amazonas'],
            ['name' => 'La Victoria', 'department' => 'Amazonas'],
            ['name' => 'Mirití - Paraná', 'department' => 'Amazonas'],
            ['name' => 'Puerto Alegría', 'department' => 'Amazonas'],
            ['name' => 'Puerto Arica', 'department' => 'Amazonas'],
            ['name' => 'Puerto Nariño', 'department' => 'Amazonas'],
            ['name' => 'Puerto Santander', 'department' => 'Amazonas'],
            ['name' => 'Tarapacá', 'department' => 'Amazonas'],

            // Guainía
            ['name' => 'Inírida', 'department' => 'Guainía'],
            ['name' => 'Barranco Minas', 'department' => 'Guainía'],
            ['name' => 'Mapiripana', 'department' => 'Guainía'],
            ['name' => 'San Felipe', 'department' => 'Guainía'],
            ['name' => 'La Guadalupe', 'department' => 'Guainía'],
            ['name' => 'Cacahual', 'department' => 'Guainía'],
            ['name' => 'Pana Pana', 'department' => 'Guainía'],
            ['name' => 'Morichal', 'department' => 'Guainía'],

            // Guaviare
            ['name' => 'San José del Guaviare', 'department' => 'Guaviare'],
            ['name' => 'Calamar', 'department' => 'Guaviare'],
            ['name' => 'El Retorno', 'department' => 'Guaviare'],
            ['name' => 'Miraflores', 'department' => 'Guaviare'],
        ];

        DB::table('cities')->insert($cities);
    }
} 