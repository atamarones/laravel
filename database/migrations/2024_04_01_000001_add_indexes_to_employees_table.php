<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            // Verificar si los índices ya existen antes de crearlos
            if (!Schema::hasIndex('employees', 'employees_identification_number_index')) {
                $table->index('identification_number');
            }
            
            if (!Schema::hasIndex('employees', 'employees_full_name_index')) {
                $table->index('full_name');
            }

            // Añadir índice FULLTEXT para búsquedas más eficientes
            if (!Schema::hasIndex('employees', 'employees_full_name_fulltext')) {
                $table->fullText('full_name');
            }

            // Índices compuestos para búsquedas comunes
            if (!Schema::hasIndex('employees', 'employees_search_index')) {
                $table->index(['identification_number', 'full_name'], 'employees_search_index');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropIndex('employees_identification_number_index');
            $table->dropIndex('employees_full_name_index');
            $table->dropFullText('employees_full_name_fulltext');
            $table->dropIndex('employees_search_index');
        });
    }
}; 