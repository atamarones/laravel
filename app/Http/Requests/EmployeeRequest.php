<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Empleado
            'full_name' => 'required|string|max:255',
            'identification_number' => 'required|string|unique:employees,identification_number,' . $this->employee?->id,
            'birth_date' => 'required|date',
            'birth_place' => 'required|string|max:255',
            'gender_id' => 'required|exists:genders,id',
            'civil_status_id' => 'required|exists:civil_statuses,id',
            'height' => 'required|numeric|min:0|max:3',
            'weight' => 'required|numeric|min:0|max:500',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'termination_reason_id' => 'nullable|required_with:end_date|exists:termination_reasons,id',
            'position_id' => 'required|exists:positions,id',
            'collaborator_type_id' => 'required|exists:collaborator_types,id',
            'city_id' => 'required|exists:cities,id',

            // Información de contacto
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|unique:employee_contact_information,email,' . $this->employee?->contactInformation?->id,

            // Seguridad social
            'eps' => 'required|string|max:255',
            'pension_fund' => 'required|string|max:255',
            'arl' => 'required|string|max:255',
            'compensation_fund' => 'required|string|max:255',
            'blood_type_id' => 'required|exists:blood_types,id',

            // Salario
            'salary' => 'required|numeric|min:0',
            'salary_exclusion' => 'nullable|numeric|min:0',

            // Cuenta bancaria
            'bank' => 'required|string|max:255',
            'account_type' => 'required|in:Ahorros,Corriente',
            'account_number' => 'required|string|max:20',

            // Contacto de emergencia
            'contact_name' => 'required|string|max:255',
            'relationship' => 'required|string|max:255',
            'contact_phone' => 'required|string|max:20',
            'contact_address' => 'nullable|string|max:255',

            // Uniforme
            'shirt' => 'required|string|in:S,M,L,XL',
            't_shirt' => 'required|string|in:S,M,L,XL',
            'pants' => 'required|string|in:28,30,32,34,36',
            'shoes' => 'required|string|in:36,38,40,42,44',
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'string' => 'El campo :attribute debe ser texto.',
            'max' => 'El campo :attribute no debe exceder :max caracteres.',
            'unique' => 'El :attribute ya está registrado.',
            'exists' => 'El :attribute seleccionado no es válido.',
            'date' => 'El campo :attribute debe ser una fecha válida.',
            'after' => 'La :attribute debe ser posterior a la fecha de inicio.',
            'numeric' => 'El campo :attribute debe ser un número.',
            'min' => 'El campo :attribute debe ser al menos :min.',
            'in' => 'El :attribute seleccionado no es válido.',
            'email' => 'El campo :attribute debe ser un correo válido.',
            'required_with' => 'El campo :attribute es obligatorio cuando se especifica la fecha de terminación.',
        ];
    }

    public function attributes(): array
    {
        return [
            'full_name' => 'nombre completo',
            'identification_number' => 'número de identificación',
            'birth_date' => 'fecha de nacimiento',
            'birth_place' => 'lugar de nacimiento',
            'gender_id' => 'género',
            'civil_status_id' => 'estado civil',
            'height' => 'altura',
            'weight' => 'peso',
            'start_date' => 'fecha de inicio',
            'end_date' => 'fecha de terminación',
            'termination_reason_id' => 'razón de terminación',
            'position_id' => 'cargo',
            'collaborator_type_id' => 'tipo de colaborador',
            'city_id' => 'ciudad',
            'address' => 'dirección',
            'phone' => 'teléfono',
            'email' => 'correo electrónico',
            'eps' => 'EPS',
            'pension_fund' => 'fondo de pensiones',
            'arl' => 'ARL',
            'compensation_fund' => 'caja de compensación',
            'blood_type_id' => 'tipo de sangre',
            'salary' => 'salario',
            'salary_exclusion' => 'exclusión salarial',
            'bank' => 'banco',
            'account_type' => 'tipo de cuenta',
            'account_number' => 'número de cuenta',
            'contact_name' => 'nombre del contacto',
            'relationship' => 'parentesco',
            'contact_phone' => 'teléfono del contacto',
            'contact_address' => 'dirección del contacto',
            'shirt' => 'camisa',
            't_shirt' => 'camiseta',
            'pants' => 'pantalón',
            'shoes' => 'zapatos',
        ];
    }
} 