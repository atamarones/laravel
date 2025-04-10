<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Gender;
use App\Models\CivilStatus;
use App\Models\BloodType;
use App\Models\TerminationReason;
use App\Models\Position;
use App\Models\CollaboratorType;
use App\Models\City;
use App\Models\Eps;
use App\Models\Cie10;
use App\Models\AbsenceType;

class BaseDataSeeder extends Seeder
{
    public function run()
    {
        // Géneros
        Gender::create(['name' => 'Masculino']);
        Gender::create(['name' => 'Femenino']);
        Gender::create(['name' => 'No binario']);
        Gender::create(['name' => 'Prefiero no decirlo']);

        // Estados Civiles
        CivilStatus::create(['name' => 'Soltero(a)']);
        CivilStatus::create(['name' => 'Casado(a)']);
        CivilStatus::create(['name' => 'Divorciado(a)']);
        CivilStatus::create(['name' => 'Viudo(a)']);
        CivilStatus::create(['name' => 'Unión Libre']);

        // Tipos de Sangre
        BloodType::create(['name' => 'O+']);
        BloodType::create(['name' => 'O-']);
        BloodType::create(['name' => 'A+']);
        BloodType::create(['name' => 'A-']);
        BloodType::create(['name' => 'B+']);
        BloodType::create(['name' => 'B-']);
        BloodType::create(['name' => 'AB+']);
        BloodType::create(['name' => 'AB-']);

        // Razones de Terminación
        TerminationReason::create(['name' => 'Renuncia Voluntaria']);
        TerminationReason::create(['name' => 'Despido']);
        TerminationReason::create(['name' => 'Término de Contrato']);
        TerminationReason::create(['name' => 'Jubilación']);
        TerminationReason::create(['name' => 'Otro']);

        // Cargos
        Position::create(['name' => 'Administrador']);
        Position::create(['name' => 'Gerente General']);
        Position::create(['name' => 'Gerente de Recursos Humanos']);
        Position::create(['name' => 'Gerente Financiero']);
        Position::create(['name' => 'Gerente de Operaciones']);
        Position::create(['name' => 'Gerente de Ventas']);
        Position::create(['name' => 'Supervisor de Producción']);
        Position::create(['name' => 'Supervisor de Calidad']);
        Position::create(['name' => 'Supervisor de Mantenimiento']);
        Position::create(['name' => 'Operario de Producción']);
        Position::create(['name' => 'Operario de Calidad']);
        Position::create(['name' => 'Operario de Mantenimiento']);
        Position::create(['name' => 'Auxiliar Administrativo']);
        Position::create(['name' => 'Auxiliar Contable']);
        Position::create(['name' => 'Auxiliar de Recursos Humanos']);
        Position::create(['name' => 'Recepcionista']);
        Position::create(['name' => 'Mensajero']);
        Position::create(['name' => 'Servicios Generales']);

        // Tipos de Colaborador
        CollaboratorType::create([
            'name' => 'Término Indefinido',
            'description' => 'Contrato a término indefinido'
        ]);
        CollaboratorType::create([
            'name' => 'Término Fijo',
            'description' => 'Contrato a término fijo'
        ]);
        CollaboratorType::create([
            'name' => 'Prestación de Servicios',
            'description' => 'Contrato de prestación de servicios'
        ]);

        // Tipos de Ausencia
        AbsenceType::create([
            'name' => 'Enfermedad',
            'description' => 'Ausencia por enfermedad'
        ]);
        AbsenceType::create([
            'name' => 'Vacaciones',
            'description' => 'Ausencia por vacaciones'
        ]);
        AbsenceType::create([
            'name' => 'Permiso',
            'description' => 'Ausencia por permiso'
        ]);
        AbsenceType::create([
            'name' => 'Otro',
            'description' => 'Otro tipo de ausencia'
        ]);
    }
} 