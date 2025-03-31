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
        Gender::create(['name' => 'Otro']);

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
        Position::create(['name' => 'Supervisor']);
        Position::create(['name' => 'Operario']);
        Position::create(['name' => 'Auxiliar']);

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