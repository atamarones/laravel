<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Gender;
use App\Models\CivilStatus;
use App\Models\Position;
use App\Models\CollaboratorType;
use App\Models\City;
use App\Models\BloodType;
use App\Models\TerminationReason;
use App\Http\Requests\EmployeeRequest;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    protected function setAuditFields($model, $action)
    {
        $model->version = $model->version ? $model->version + 1 : 1;
        $model->{$action . '_by'} = auth()->id();
    }

    public function index()
    {
        $employees = Employee::with([
            'contactInformation',
            'socialSecurity',
            'gender',
            'civilStatus',
            'position',
            'collaboratorType',
            'city',
            'terminationReason',
            'salary',
            'bankAccount',
            'emergencyContact',
            'uniform'
        ])->paginate(10);

        return view('employees.index', compact('employees'));
    }

    public function create()
    {
        $genders = Gender::all();
        $civilStatuses = CivilStatus::all();
        $positions = Position::all();
        $collaboratorTypes = CollaboratorType::all();
        $cities = City::all();
        $bloodTypes = BloodType::all();
        $terminationReasons = TerminationReason::all();

        return view('employees.create', compact(
            'genders',
            'civilStatuses',
            'positions',
            'collaboratorTypes',
            'cities',
            'bloodTypes',
            'terminationReasons'
        ));
    }

    public function store(EmployeeRequest $request)
    {
        DB::transaction(function () use ($request) {
            // Crear el empleado
            $employee = Employee::create($request->only([
                'full_name',
                'identification_number',
                'birth_date',
                'birth_place',
                'gender_id',
                'civil_status_id',
                'height',
                'weight',
                'start_date',
                'end_date',
                'termination_reason_id',
                'position_id',
                'collaborator_type_id',
                'city_id'
            ]));
            $this->setAuditFields($employee, 'created');

            // Crear información de contacto
            $contactInfo = $employee->contactInformation()->create($request->only([
                'address',
                'phone',
                'email'
            ]));
            $this->setAuditFields($contactInfo, 'created');

            // Crear información de seguridad social
            $socialSecurity = $employee->socialSecurity()->create($request->only([
                'eps',
                'pension_fund',
                'arl',
                'compensation_fund',
                'blood_type_id'
            ]));
            $this->setAuditFields($socialSecurity, 'created');

            // Crear salario
            $salary = $employee->salary()->create($request->only([
                'salary',
                'salary_exclusion'
            ]));
            $this->setAuditFields($salary, 'created');

            // Crear cuenta bancaria
            $bankAccount = $employee->bankAccount()->create($request->only([
                'bank',
                'account_type',
                'account_number'
            ]));
            $this->setAuditFields($bankAccount, 'created');

            // Crear contacto de emergencia
            $emergencyContact = $employee->emergencyContact()->create($request->only([
                'contact_name',
                'relationship',
                'contact_phone',
                'contact_address'
            ]));
            $this->setAuditFields($emergencyContact, 'created');

            // Crear uniforme
            $uniform = $employee->uniform()->create($request->only([
                'shirt',
                't_shirt',
                'pants',
                'shoes'
            ]));
            $this->setAuditFields($uniform, 'created');
        });

        return redirect()->route('employees.index')
            ->with('success', 'Empleado creado exitosamente.');
    }

    public function show(Employee $employee)
    {
        $employee->load([
            'contactInformation',
            'socialSecurity',
            'gender',
            'civilStatus',
            'position',
            'collaboratorType',
            'city',
            'terminationReason',
            'salary',
            'bankAccount',
            'emergencyContact',
            'uniform',
            'observations'
        ]);

        return view('employees.show', compact('employee'));
    }

    public function edit(Employee $employee)
    {
        $employee->load([
            'contactInformation',
            'socialSecurity',
            'salary',
            'bankAccount',
            'emergencyContact',
            'uniform'
        ]);

        $genders = Gender::all();
        $civilStatuses = CivilStatus::all();
        $positions = Position::all();
        $collaboratorTypes = CollaboratorType::all();
        $cities = City::all();
        $bloodTypes = BloodType::all();
        $terminationReasons = TerminationReason::all();

        return view('employees.edit', compact(
            'employee',
            'genders',
            'civilStatuses',
            'positions',
            'collaboratorTypes',
            'cities',
            'bloodTypes',
            'terminationReasons'
        ));
    }

    public function update(EmployeeRequest $request, Employee $employee)
    {
        DB::transaction(function () use ($request, $employee) {
            // Actualizar el empleado
            $employee->update($request->only([
                'full_name',
                'identification_number',
                'birth_date',
                'birth_place',
                'gender_id',
                'civil_status_id',
                'height',
                'weight',
                'start_date',
                'end_date',
                'termination_reason_id',
                'position_id',
                'collaborator_type_id',
                'city_id'
            ]));
            $this->setAuditFields($employee, 'updated');

            // Actualizar información de contacto
            $employee->contactInformation()->update($request->only([
                'address',
                'phone',
                'email'
            ]));
            $this->setAuditFields($employee->contactInformation, 'updated');

            // Actualizar información de seguridad social
            $employee->socialSecurity()->update($request->only([
                'eps',
                'pension_fund',
                'arl',
                'compensation_fund',
                'blood_type_id'
            ]));
            $this->setAuditFields($employee->socialSecurity, 'updated');

            // Actualizar salario
            $employee->salary()->update($request->only([
                'salary',
                'salary_exclusion'
            ]));
            $this->setAuditFields($employee->salary, 'updated');

            // Actualizar cuenta bancaria
            $employee->bankAccount()->update($request->only([
                'bank',
                'account_type',
                'account_number'
            ]));
            $this->setAuditFields($employee->bankAccount, 'updated');

            // Actualizar contacto de emergencia
            $employee->emergencyContact()->update($request->only([
                'contact_name',
                'relationship',
                'contact_phone',
                'contact_address'
            ]));
            $this->setAuditFields($employee->emergencyContact, 'updated');

            // Actualizar uniforme
            $employee->uniform()->update($request->only([
                'shirt',
                't_shirt',
                'pants',
                'shoes'
            ]));
            $this->setAuditFields($employee->uniform, 'updated');
        });

        return redirect()->route('employees.index')
            ->with('success', 'Empleado actualizado exitosamente.');
    }

    public function destroy(Employee $employee)
    {
        $this->setAuditFields($employee, 'deleted');
        $employee->delete();

        return redirect()->route('employees.index')
            ->with('success', 'Empleado eliminado exitosamente.');
    }
} 