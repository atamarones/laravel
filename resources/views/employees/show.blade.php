@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4 class="mb-0">Detalles del Empleado: {{ $employee->full_name }}</h4>
                    <div>
                        <a href="{{ route('employees.edit', $employee) }}" class="btn btn-warning">Editar</a>
                        <a href="{{ route('employees.index') }}" class="btn btn-secondary">Volver</a>
                    </div>
                </div>

                <div class="card-body">
                    {{-- Información Personal --}}
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="mb-0">Información Personal</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <p><strong>Nombre:</strong> {{ $employee->full_name }}</p>
                                    <p><strong>Identificación:</strong> {{ $employee->identification_number }}</p>
                                    <p><strong>Fecha de Nacimiento:</strong> {{ $employee->birth_date->format('d/m/Y') }}</p>
                                    <p><strong>Lugar de Nacimiento:</strong> {{ $employee->birth_place }}</p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong>Género:</strong> {{ $employee->gender->name }}</p>
                                    <p><strong>Estado Civil:</strong> {{ $employee->civilStatus->name }}</p>
                                    <p><strong>Altura:</strong> {{ $employee->height }}</p>
                                    <p><strong>Peso:</strong> {{ $employee->weight }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- Información de Contacto --}}
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="mb-0">Información de Contacto</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <p><strong>Dirección:</strong> {{ $employee->contactInformation->address }}</p>
                                    <p><strong>Teléfono:</strong> {{ $employee->contactInformation->phone }}</p>
                                    <p><strong>Email:</strong> {{ $employee->contactInformation->email }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- Información Laboral --}}
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="mb-0">Información Laboral</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <p><strong>Cargo:</strong> {{ $employee->position->name }}</p>
                                    <p><strong>Tipo de Colaborador:</strong> {{ $employee->collaboratorType->name }}</p>
                                    <p><strong>Ciudad:</strong> {{ $employee->city->name }}</p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong>Fecha de Inicio:</strong> {{ $employee->start_date->format('d/m/Y') }}</p>
                                    @if($employee->end_date)
                                        <p><strong>Fecha de Terminación:</strong> {{ $employee->end_date->format('d/m/Y') }}</p>
                                        <p><strong>Razón de Terminación:</strong> {{ $employee->terminationReason->name }}</p>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- Información de Seguridad Social --}}
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="mb-0">Seguridad Social</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <p><strong>EPS:</strong> {{ $employee->socialSecurity->eps }}</p>
                                    <p><strong>Fondo de Pensiones:</strong> {{ $employee->socialSecurity->pension_fund }}</p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong>ARL:</strong> {{ $employee->socialSecurity->arl }}</p>
                                    <p><strong>Caja de Compensación:</strong> {{ $employee->socialSecurity->compensation_fund }}</p>
                                    <p><strong>Tipo de Sangre:</strong> {{ $employee->socialSecurity->bloodType->name }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- Información Salarial y Bancaria --}}
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="mb-0">Información Salarial y Bancaria</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <p><strong>Salario:</strong> ${{ number_format($employee->salary->salary, 0, ',', '.') }}</p>
                                    @if($employee->salary->salary_exclusion)
                                        <p><strong>Exclusión Salarial:</strong> ${{ number_format($employee->salary->salary_exclusion, 0, ',', '.') }}</p>
                                    @endif
                                </div>
                                <div class="col-md-6">
                                    <p><strong>Banco:</strong> {{ $employee->bankAccount->bank }}</p>
                                    <p><strong>Tipo de Cuenta:</strong> {{ $employee->bankAccount->account_type }}</p>
                                    <p><strong>Número de Cuenta:</strong> {{ $employee->bankAccount->account_number }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- Contacto de Emergencia --}}
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="mb-0">Contacto de Emergencia</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <p><strong>Nombre:</strong> {{ $employee->emergencyContact->contact_name }}</p>
                                    <p><strong>Parentesco:</strong> {{ $employee->emergencyContact->relationship }}</p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong>Teléfono:</strong> {{ $employee->emergencyContact->contact_phone }}</p>
                                    @if($employee->emergencyContact->contact_address)
                                        <p><strong>Dirección:</strong> {{ $employee->emergencyContact->contact_address }}</p>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- Uniforme --}}
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="mb-0">Uniforme</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-3">
                                    <p><strong>Camisa:</strong> {{ $employee->uniform->shirt }}</p>
                                </div>
                                <div class="col-md-3">
                                    <p><strong>Camiseta:</strong> {{ $employee->uniform->t_shirt }}</p>
                                </div>
                                <div class="col-md-3">
                                    <p><strong>Pantalón:</strong> {{ $employee->uniform->pants }}</p>
                                </div>
                                <div class="col-md-3">
                                    <p><strong>Zapatos:</strong> {{ $employee->uniform->shoes }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- Observaciones --}}
                    @if($employee->observations->count() > 0)
                        <div class="card mb-4">
                            <div class="card-header">
                                <h5 class="mb-0">Observaciones</h5>
                            </div>
                            <div class="card-body">
                                <div class="list-group">
                                    @foreach($employee->observations as $observation)
                                        <div class="list-group-item">
                                            <div class="d-flex w-100 justify-content-between">
                                                <p class="mb-1">{{ $observation->comment }}</p>
                                                <small>{{ $observation->created_at->format('d/m/Y H:i') }}</small>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection 