<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Tabla principal de empleados
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('identification_number')->unique();
            $table->dateTime('birth_date');
            $table->string('birth_place');
            $table->foreignId('gender_id')->constrained();
            $table->foreignId('civil_status_id')->constrained();
            $table->decimal('height', 5, 2);
            $table->decimal('weight', 5, 2);
            $table->dateTime('start_date');
            $table->date('end_date')->nullable();
            $table->foreignId('termination_reason_id')->nullable()->constrained();
            $table->foreignId('position_id')->constrained();
            $table->foreignId('collaborator_type_id')->constrained();
            $table->foreignId('city_id')->constrained();
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Índices
            $table->index('identification_number');
            $table->index('full_name');
        });

        // Información de contacto
        Schema::create('employee_contact_information', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('address');
            $table->string('phone');
            $table->string('email')->unique();
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Índices
            $table->index('email');
        });

        // Seguridad social
        Schema::create('employee_social_security', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('eps');
            $table->string('pension_fund');
            $table->string('arl');
            $table->string('compensation_fund');
            $table->foreignId('blood_type_id')->constrained();
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // Salario
        Schema::create('salaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->decimal('salary', 10, 2);
            $table->decimal('salary_exclusion', 10, 2)->nullable();
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // Cuenta bancaria
        Schema::create('bank_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('bank');
            $table->string('account_type');
            $table->string('account_number')->unique();
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Índices
            $table->index('account_number');
        });

        // Contacto de emergencia
        Schema::create('emergency_contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('contact_name');
            $table->string('relationship');
            $table->string('contact_phone');
            $table->string('contact_address');
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // Uniforme
        Schema::create('uniforms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('shirt');
            $table->string('t_shirt');
            $table->string('pants');
            $table->string('shoes');
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // Observaciones
        Schema::create('observations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->text('comment');
            $table->string('version')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('observations');
        Schema::dropIfExists('uniforms');
        Schema::dropIfExists('emergency_contacts');
        Schema::dropIfExists('bank_accounts');
        Schema::dropIfExists('salaries');
        Schema::dropIfExists('employee_social_security');
        Schema::dropIfExists('employee_contact_information');
        Schema::dropIfExists('employees');
    }
}; 