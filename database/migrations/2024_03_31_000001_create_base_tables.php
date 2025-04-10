<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Tablas de configuración base
        Schema::create('positions', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Índices
            $table->index('name');
        });

        Schema::create('collaborator_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Índices
            $table->index('name');
        });

        Schema::create('department', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Índices
            $table->index('name');
            $table->unique(['name']);
        });

        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('department_id'); // Cambiado a unsignedBigInteger
            $table->foreign('department_id')
                ->references('id')
                ->on('department')
                ->onDelete('cascade');
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Índices
            $table->index('name');
            $table->unique(['name', 'department_id']);
        });

        Schema::create('genders', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Índices
            $table->index('name');
        });

        Schema::create('civil_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Índices
            $table->index('name');
        });

        Schema::create('blood_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Índices
            $table->index('name');
        });

        Schema::create('termination_reasons', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Índices
            $table->index('name');
        });

        Schema::create('eps', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('mobility_code')->nullable()->unique();
            $table->string('name')->unique();
            $table->string('nit')->nullable()->unique();
            $table->string('regime')->nullable();
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Índices
            $table->index('name');
            $table->index('regime');
        });

        Schema::create('cie10', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('description');
            $table->string('group')->nullable();
            $table->string('segment')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Índices para búsqueda optimizada
            $table->index('code');
            $table->fulltext(['description']); // Índice fulltext para búsqueda en descripción
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('positions');
        Schema::dropIfExists('collaborator_types');
        Schema::dropIfExists('department');
        Schema::dropIfExists('cities');
        Schema::dropIfExists('genders');
        Schema::dropIfExists('civil_statuses');
        Schema::dropIfExists('blood_types');
        Schema::dropIfExists('termination_reasons');
        Schema::dropIfExists('eps');
        Schema::dropIfExists('cie10');
        Schema::dropIfExists('employees');
    }
}; 