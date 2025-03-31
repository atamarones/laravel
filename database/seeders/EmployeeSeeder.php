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

        // Crear 10 empleados de ejemplo
        for ($i = 0; $i < 10; $i++) {
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
            ]);

            // Crear información de contacto
            EmployeeContactInformation::create([
                'employee_id' => $employee->id,
                'address' => $faker->address,
                'phone' => $faker->phoneNumber,
                'email' => $faker->unique()->safeEmail,
            ]);

            // Crear información de seguridad social
            EmployeeSocialSecurity::create([
                'employee_id' => $employee->id,
                'eps' => $faker->company,
                'pension_fund' => $faker->company,
                'arl' => $faker->company,
                'compensation_fund' => $faker->company,
                'blood_type_id' => $faker->randomElement($bloodTypeIds),
            ]);

            // Crear salario
            Salary::create([
                'employee_id' => $employee->id,
                'salary' => $faker->randomFloat(2, 1000000, 5000000),
                'salary_exclusion' => $faker->optional()->randomFloat(2, 0, 1000000),
            ]);

            // Crear cuenta bancaria
            BankAccount::create([
                'employee_id' => $employee->id,
                'bank' => $faker->company,
                'account_type' => $faker->randomElement(['Ahorro', 'Corriente']),
                'account_number' => $faker->numerify('##########'),
            ]);

            // Crear contacto de emergencia
            EmergencyContact::create([
                'employee_id' => $employee->id,
                'contact_name' => $faker->name,
                'relationship' => $faker->randomElement(['Padre', 'Madre', 'Hermano', 'Hermana', 'Cónyuge']),
                'contact_phone' => $faker->phoneNumber,
                'contact_address' => $faker->address,
            ]);

            // Crear uniforme
            Uniform::create([
                'employee_id' => $employee->id,
                'shirt' => $faker->randomElement(['S', 'M', 'L', 'XL']),
                't_shirt' => $faker->randomElement(['S', 'M', 'L', 'XL']),
                'pants' => $faker->randomElement(['28', '30', '32', '34', '36', '38']),
                'shoes' => $faker->randomElement(['36', '37', '38', '39', '40', '41', '42', '43']),
            ]);

            // Crear observación
            Observation::create([
                'employee_id' => $employee->id,
                'comment' => $faker->sentence,
            ]);
        }
    }
} 