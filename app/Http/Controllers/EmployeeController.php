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
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class EmployeeController extends Controller
{
    use AuthorizesRequests;

    protected function setAuditFields($model, $action)
    {
        $model->version = $model->version ? $model->version + 1 : 1;
        $model->{$action . '_by'} = auth()->id();
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', Employee::class);

        $query = Employee::query()
            ->with([
                'gender',
                'civilStatus',
                'position',
                'collaboratorType',
                'city',
                'socialSecurity.bloodType',
            ]);

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('full_name', 'like', "%{$request->search}%")
                    ->orWhere('identification_number', 'like', "%{$request->search}%");
            });
        }

        $employees = $query->paginate(20)
            ->withQueryString()
            ->through(fn ($employee) => [
                'id' => $employee->id,
                'full_name' => $employee->full_name,
                'identification_number' => $employee->identification_number,
                'position' => $employee->position->name,
                'collaborator_type' => $employee->collaboratorType->name,
                'city' => $employee->city->name,
            ]);

        return Inertia::render('Employees/Index', [
            'employees' => $employees,
            'filters' => $request->only(['search']),
            'can' => [
                'create' => $request->user()->can('create', Employee::class),
                'edit' => $request->user()->can('update', Employee::class),
                'delete' => $request->user()->can('delete', Employee::class),
            ],
        ]);
    }

    public function create()
    {
        $this->authorize('create', Employee::class);

        return Inertia::render('Employees/Create', [
            'genders' => Gender::all(),
            'civilStatuses' => CivilStatus::all(),
            'positions' => Position::all(),
            'collaboratorTypes' => CollaboratorType::all(),
            'cities' => City::all(),
            'bloodTypes' => BloodType::all(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Employee::class);

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'identification_number' => 'required|string|max:20|unique:employees',
            'birth_date' => 'required|date',
            'birth_place' => 'required|string|max:255',
            'gender_id' => 'required|exists:genders,id',
            'civil_status_id' => 'required|exists:civil_statuses,id',
            'height' => 'required|numeric|min:0|max:3',
            'weight' => 'required|numeric|min:0|max:300',
            'start_date' => 'required|date',
            'position_id' => 'required|exists:positions,id',
            'collaborator_type_id' => 'required|exists:collaborator_types,id',
            'city_id' => 'required|exists:cities,id',

            // Información de contacto
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',

            // Seguridad social
            'eps' => 'required|string|max:255',
            'pension_fund' => 'required|string|max:255',
            'arl' => 'required|string|max:255',
            'compensation_fund' => 'required|string|max:255',
            'blood_type_id' => 'required|exists:blood_types,id',

            // Salario
            'salary' => 'required|numeric|min:0',
            'salary_exclusion' => 'required|numeric|min:0',

            // Cuenta bancaria
            'bank' => 'required|string|max:255',
            'account_type' => 'required|in:Ahorros,Corriente',
            'account_number' => 'required|string|max:255',

            // Contacto de emergencia
            'contact_name' => 'required|string|max:255',
            'relationship' => 'required|string|max:255',
            'contact_phone' => 'required|string|max:20',
            'contact_address' => 'required|string|max:255',

            // Uniforme
            'shirt' => 'required|string|max:10',
            't_shirt' => 'required|string|max:10',
            'pants' => 'required|numeric|min:28|max:44',
            'shoes' => 'required|numeric|min:35|max:45',
        ]);

        $employee = Employee::create([
            'full_name' => $validated['full_name'],
            'identification_number' => $validated['identification_number'],
            'birth_date' => $validated['birth_date'],
            'birth_place' => $validated['birth_place'],
            'gender_id' => $validated['gender_id'],
            'civil_status_id' => $validated['civil_status_id'],
            'height' => $validated['height'],
            'weight' => $validated['weight'],
            'start_date' => $validated['start_date'],
            'position_id' => $validated['position_id'],
            'collaborator_type_id' => $validated['collaborator_type_id'],
            'city_id' => $validated['city_id'],
        ]);

        $employee->contactInformation()->create([
            'address' => $validated['address'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
        ]);

        $employee->socialSecurity()->create([
            'eps' => $validated['eps'],
            'pension_fund' => $validated['pension_fund'],
            'arl' => $validated['arl'],
            'compensation_fund' => $validated['compensation_fund'],
            'blood_type_id' => $validated['blood_type_id'],
        ]);

        $employee->salary()->create([
            'salary' => $validated['salary'],
            'salary_exclusion' => $validated['salary_exclusion'],
        ]);

        $employee->bankAccount()->create([
            'bank' => $validated['bank'],
            'account_type' => $validated['account_type'],
            'account_number' => $validated['account_number'],
        ]);

        $employee->emergencyContact()->create([
            'contact_name' => $validated['contact_name'],
            'relationship' => $validated['relationship'],
            'contact_phone' => $validated['contact_phone'],
            'contact_address' => $validated['contact_address'],
        ]);

        $employee->uniform()->create([
            'shirt' => $validated['shirt'],
            't_shirt' => $validated['t_shirt'],
            'pants' => $validated['pants'],
            'shoes' => $validated['shoes'],
        ]);

        return redirect()->route('employees.index')
            ->with('success', 'Empleado creado exitosamente.');
    }

    public function show(Employee $employee)
    {
        $this->authorize('view', $employee);

        $employee->load([
            'gender',
            'civilStatus',
            'position',
            'collaboratorType',
            'city',
            'contactInformation',
            'socialSecurity.bloodType',
            'salary',
            'bankAccount',
            'emergencyContact',
            'uniform',
        ]);

        return Inertia::render('Employees/Show', [
            'employee' => $employee,
            'can' => [
                'update' => request()->user()->can('update', $employee),
                'delete' => request()->user()->can('delete', $employee),
            ],
        ]);
    }

    public function edit(Employee $employee)
    {
        $this->authorize('update', $employee);

        $employee = Employee::with([
            'gender',
            'civilStatus',
            'position',
            'collaboratorType',
            'city',
            'contactInformation',
            'socialSecurity.bloodType',
            'salary',
            'bankAccount',
            'emergencyContact',
            'uniform',
        ])->findOrFail($employee->id);

        return Inertia::render('Employees/Edit', [
            'employee' => $employee,
            'genders' => Gender::select('id', 'name')->get(),
            'civilStatuses' => CivilStatus::select('id', 'name')->get(),
            'positions' => Position::select('id', 'name')->get(),
            'collaboratorTypes' => CollaboratorType::select('id', 'name')->get(),
            'cities' => City::select('id', 'name')->get(),
            'bloodTypes' => BloodType::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, Employee $employee)
    {
        $this->authorize('update', $employee);

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'identification_number' => 'required|string|max:20|unique:employees,identification_number,' . $employee->id,
            'birth_date' => 'required|date',
            'birth_place' => 'required|string|max:255',
            'gender_id' => 'required|exists:genders,id',
            'civil_status_id' => 'required|exists:civil_statuses,id',
            'height' => 'required|numeric|min:0|max:3',
            'weight' => 'required|numeric|min:0|max:300',
            'start_date' => 'required|date',
            'position_id' => 'required|exists:positions,id',
            'collaborator_type_id' => 'required|exists:collaborator_types,id',
            'city_id' => 'required|exists:cities,id',

            // Información de contacto
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',

            // Seguridad social
            'eps' => 'required|string|max:255',
            'pension_fund' => 'required|string|max:255',
            'arl' => 'required|string|max:255',
            'compensation_fund' => 'required|string|max:255',
            'blood_type_id' => 'required|exists:blood_types,id',

            // Salario
            'salary' => 'required|numeric|min:0',
            'salary_exclusion' => 'required|numeric|min:0',

            // Cuenta bancaria
            'bank' => 'required|string|max:255',
            'account_type' => 'required|in:Ahorros,Corriente',
            'account_number' => 'required|string|max:255',

            // Contacto de emergencia
            'contact_name' => 'required|string|max:255',
            'relationship' => 'required|string|max:255',
            'contact_phone' => 'required|string|max:20',
            'contact_address' => 'required|string|max:255',

            // Uniforme
            'shirt' => 'required|string|max:10',
            't_shirt' => 'required|string|max:10',
            'pants' => 'required|numeric|min:28|max:44',
            'shoes' => 'required|numeric|min:35|max:45',
        ]);

        $employee->update([
            'full_name' => $validated['full_name'],
            'identification_number' => $validated['identification_number'],
            'birth_date' => $validated['birth_date'],
            'birth_place' => $validated['birth_place'],
            'gender_id' => $validated['gender_id'],
            'civil_status_id' => $validated['civil_status_id'],
            'height' => $validated['height'],
            'weight' => $validated['weight'],
            'start_date' => $validated['start_date'],
            'position_id' => $validated['position_id'],
            'collaborator_type_id' => $validated['collaborator_type_id'],
            'city_id' => $validated['city_id'],
        ]);

        $employee->contactInformation()->update([
            'address' => $validated['address'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
        ]);

        $employee->socialSecurity()->update([
            'eps' => $validated['eps'],
            'pension_fund' => $validated['pension_fund'],
            'arl' => $validated['arl'],
            'compensation_fund' => $validated['compensation_fund'],
            'blood_type_id' => $validated['blood_type_id'],
        ]);

        $employee->salary()->update([
            'salary' => $validated['salary'],
            'salary_exclusion' => $validated['salary_exclusion'],
        ]);

        $employee->bankAccount()->update([
            'bank' => $validated['bank'],
            'account_type' => $validated['account_type'],
            'account_number' => $validated['account_number'],
        ]);

        $employee->emergencyContact()->update([
            'contact_name' => $validated['contact_name'],
            'relationship' => $validated['relationship'],
            'contact_phone' => $validated['contact_phone'],
            'contact_address' => $validated['contact_address'],
        ]);

        $employee->uniform()->update([
            'shirt' => $validated['shirt'],
            't_shirt' => $validated['t_shirt'],
            'pants' => $validated['pants'],
            'shoes' => $validated['shoes'],
        ]);

        return redirect()->route('employees.index')
            ->with('success', 'Empleado actualizado exitosamente.');
    }

    public function destroy(Employee $employee)
    {
        $this->authorize('delete', $employee);

        $employee->delete();

        return redirect()->route('employees.index')
            ->with('success', 'Empleado eliminado exitosamente.');
    }
} 