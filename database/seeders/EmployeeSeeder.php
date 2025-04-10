<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Salary;
use App\Models\BankAccount;
use App\Models\EmergencyContact;
use App\Models\Uniform;
use App\Models\Observation;
use App\Models\EmployeeContactInformation;
use App\Models\EmployeeSocialSecurity;
use App\Models\City;
use App\Models\Gender;
use App\Models\CivilStatus;
use App\Models\Position;
use App\Models\CollaboratorType;
use App\Models\BloodType;
use App\Models\Eps;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('es_CO');
        
        // Obtener IDs válidos de todas las tablas relacionadas
        $cityIds = City::pluck('id')->toArray();
        $genderIds = Gender::pluck('id')->toArray();
        $civilStatusIds = CivilStatus::pluck('id')->toArray();
        $positionIds = Position::pluck('id')->toArray();
        $collaboratorTypeIds = CollaboratorType::pluck('id')->toArray();
        $bloodTypeIds = BloodType::pluck('id')->toArray();
        $epsIds = Eps::pluck('id')->toArray();

        // Crear 10 empleados de ejemplo
        for ($i = 0; $i < 25; $i++) {
            $employee = Employee::create([
                'full_name' => $faker->name,
                'identification_number' => $faker->unique()->numerify('##########'),
                'birth_date' => $faker->dateTimeBetween('-50 years', '-20 years'),
                'birth_place' => $faker->city,
                'gender_id' => $faker->randomElement($genderIds),
                'civil_status_id' => $faker->randomElement($civilStatusIds),
                'height' => $faker->randomFloat(2, 1.50, 2.00),
                'weight' => $faker->randomFloat(2, 50, 100),
                'start_date' => $faker->dateTimeBetween('-5 years', 'now'),
                'position_id' => $faker->randomElement($positionIds),
                'collaborator_type_id' => $faker->randomElement($collaboratorTypeIds),
                'city_id' => $faker->randomElement($cityIds),
                'eps_id' => $faker->randomElement($epsIds),
                'blood_type_id' => $faker->randomElement($bloodTypeIds),
                'version' => 1,
                'created_by' => 1,
            ]);

            // Crear información de contacto
            EmployeeContactInformation::create([
                'employee_id' => $employee->id,
                'address' => $faker->address,
                'phone' => $faker->phoneNumber,
                'email' => $faker->unique()->safeEmail,
                'version' => 1,
                'created_by' => 1,
            ]);

            // Crear información de seguridad social
            EmployeeSocialSecurity::create([
                'employee_id' => $employee->id,
                'pension_fund' => $faker->company,
                'arl' => $faker->company,
                'compensation_fund' => $faker->company,
                'version' => 1,
                'created_by' => 1,
            ]);

            // Crear salario
            Salary::create([
                'employee_id' => $employee->id,
                'salary' => $faker->numberBetween(1160000, 5000000), // Salario entre 1.160.000 y 5.000.000
                'salary_exclusion' => $faker->optional(0.3)->numberBetween(100000, 500000), // 30% de probabilidad de tener exclusión
                'version' => 1,
                'created_by' => 1,
            ]);

            // Crear cuenta bancaria
            BankAccount::create([
                'employee_id' => $employee->id,
                'bank' => $faker->randomElement(['Bancolombia', 'Davivienda', 'BBVA', 'Banco de Bogotá', 'Banco de Occidente']),
                'account_type' => $faker->randomElement(['Ahorros', 'Corriente']),
                'account_number' => $faker->unique()->numerify('###########'),
                'version' => 1,
                'created_by' => 1,
            ]);

            // Crear contacto de emergencia
            EmergencyContact::create([
                'employee_id' => $employee->id,
                'contact_name' => $faker->name,
                'relationship' => $faker->randomElement(['Padre', 'Madre', 'Hermano/a', 'Esposo/a', 'Hijo/a']),
                'contact_phone' => $faker->phoneNumber,
                'contact_address' => $faker->address,
                'version' => 1,
                'created_by' => 1,
            ]);

            // Crear uniforme
            Uniform::create([
                'employee_id' => $employee->id,
                'shirt' => $faker->randomElement(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
                't_shirt' => $faker->randomElement(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
                'pants' => $faker->numberBetween(28, 44),
                'shoes' => $faker->numberBetween(35, 45),
                'version' => 1,
                'created_by' => 1,
            ]);

            // Crear observaciones (1-3 por empleado)
            $numObservations = $faker->numberBetween(1, 3);
            for ($j = 0; $j < $numObservations; $j++) {
                Observation::create([
                    'employee_id' => $employee->id,
                    'comment' => $faker->paragraph,
                    'version' => 1,
                    'created_by' => 1,
                ]);
            }
        }
    }
} 