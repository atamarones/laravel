<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('configurations', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('value');
            $table->string('description')->nullable();
            $table->string('group')->nullable();
            $table->timestamps();
        });

        // Insertar la configuración inicial
        DB::table('configurations')->insert([
            'key' => 'working_hours_per_day',
            'value' => '8',
            'description' => 'Horas laborales por día para cálculo de incapacidades',
            'group' => 'absences',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('configurations');
    }
}; 