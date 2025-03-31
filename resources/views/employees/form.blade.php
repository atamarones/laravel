{{-- Información Personal --}}
<div class="card mb-4">
    <div class="card-header">
        <h4 class="mb-0">Información Personal</h4>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="full_name">Nombre Completo</label>
                <input type="text" class="form-control @error('full_name') is-invalid @enderror" id="full_name" name="full_name" value="{{ old('full_name', $employee->full_name ?? '') }}">
                @error('full_name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6 mb-3">
                <label for="identification_number">Número de Identificación</label>
                <input type="text" class="form-control @error('identification_number') is-invalid @enderror" id="identification_number" name="identification_number" value="{{ old('identification_number', $employee->identification_number ?? '') }}">
                @error('identification_number')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="birth_date">Fecha de Nacimiento</label>
                <input type="date" class="form-control @error('birth_date') is-invalid @enderror" id="birth_date" name="birth_date" value="{{ old('birth_date', $employee->birth_date ?? '') }}">
                @error('birth_date')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6 mb-3">
                <label for="birth_place">Lugar de Nacimiento</label>
                <input type="text" class="form-control @error('birth_place') is-invalid @enderror" id="birth_place" name="birth_place" value="{{ old('birth_place', $employee->birth_place ?? '') }}">
                @error('birth_place')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="gender_id">Género</label>
                <select class="form-control @error('gender_id') is-invalid @enderror" id="gender_id" name="gender_id">
                    <option value="">Seleccione...</option>
                    @foreach($genders as $gender)
                        <option value="{{ $gender->id }}" {{ old('gender_id', $employee->gender_id ?? '') == $gender->id ? 'selected' : '' }}>
                            {{ $gender->name }}
                        </option>
                    @endforeach
                </select>
                @error('gender_id')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6 mb-3">
                <label for="civil_status_id">Estado Civil</label>
                <select class="form-control @error('civil_status_id') is-invalid @enderror" id="civil_status_id" name="civil_status_id">
                    <option value="">Seleccione...</option>
                    @foreach($civilStatuses as $civilStatus)
                        <option value="{{ $civilStatus->id }}" {{ old('civil_status_id', $employee->civil_status_id ?? '') == $civilStatus->id ? 'selected' : '' }}>
                            {{ $civilStatus->name }}
                        </option>
                    @endforeach
                </select>
                @error('civil_status_id')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="height">Altura</label>
                <input type="text" class="form-control @error('height') is-invalid @enderror" id="height" name="height" value="{{ old('height', $employee->height ?? '') }}">
                @error('height')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6 mb-3">
                <label for="weight">Peso</label>
                <input type="text" class="form-control @error('weight') is-invalid @enderror" id="weight" name="weight" value="{{ old('weight', $employee->weight ?? '') }}">
                @error('weight')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
    </div>
</div>

{{-- Información de Contacto --}}
<div class="card mb-4">
    <div class="card-header">
        <h4 class="mb-0">Información de Contacto</h4>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-md-12 mb-3">
                <label for="address">Dirección</label>
                <input type="text" class="form-control @error('address') is-invalid @enderror" id="address" name="address" value="{{ old('address', $employee->contactInformation->address ?? '') }}">
                @error('address')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="phone">Teléfono</label>
                <input type="text" class="form-control @error('phone') is-invalid @enderror" id="phone" name="phone" value="{{ old('phone', $employee->contactInformation->phone ?? '') }}">
                @error('phone')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6 mb-3">
                <label for="email">Correo Electrónico</label>
                <input type="email" class="form-control @error('email') is-invalid @enderror" id="email" name="email" value="{{ old('email', $employee->contactInformation->email ?? '') }}">
                @error('email')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
    </div>
</div>

{{-- Información Laboral --}}
<div class="card mb-4">
    <div class="card-header">
        <h4 class="mb-0">Información Laboral</h4>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="position_id">Cargo</label>
                <select class="form-control @error('position_id') is-invalid @enderror" id="position_id" name="position_id">
                    <option value="">Seleccione...</option>
                    @foreach($positions as $position)
                        <option value="{{ $position->id }}" {{ old('position_id', $employee->position_id ?? '') == $position->id ? 'selected' : '' }}>
                            {{ $position->name }}
                        </option>
                    @endforeach
                </select>
                @error('position_id')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6 mb-3">
                <label for="collaborator_type_id">Tipo de Colaborador</label>
                <select class="form-control @error('collaborator_type_id') is-invalid @enderror" id="collaborator_type_id" name="collaborator_type_id">
                    <option value="">Seleccione...</option>
                    @foreach($collaboratorTypes as $type)
                        <option value="{{ $type->id }}" {{ old('collaborator_type_id', $employee->collaborator_type_id ?? '') == $type->id ? 'selected' : '' }}>
                            {{ $type->name }}
                        </option>
                    @endforeach
                </select>
                @error('collaborator_type_id')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="start_date">Fecha de Inicio</label>
                <input type="date" class="form-control @error('start_date') is-invalid @enderror" id="start_date" name="start_date" value="{{ old('start_date', $employee->start_date ?? '') }}">
                @error('start_date')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6 mb-3">
                <label for="end_date">Fecha de Terminación</label>
                <input type="date" class="form-control @error('end_date') is-invalid @enderror" id="end_date" name="end_date" value="{{ old('end_date', $employee->end_date ?? '') }}">
                @error('end_date')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="termination_reason_id">Razón de Terminación</label>
                <select class="form-control @error('termination_reason_id') is-invalid @enderror" id="termination_reason_id" name="termination_reason_id">
                    <option value="">Seleccione...</option>
                    @foreach($terminationReasons as $reason)
                        <option value="{{ $reason->id }}" {{ old('termination_reason_id', $employee->termination_reason_id ?? '') == $reason->id ? 'selected' : '' }}>
                            {{ $reason->name }}
                        </option>
                    @endforeach
                </select>
                @error('termination_reason_id')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6 mb-3">
                <label for="city_id">Ciudad</label>
                <select class="form-control @error('city_id') is-invalid @enderror" id="city_id" name="city_id">
                    <option value="">Seleccione...</option>
                    @foreach($cities as $city)
                        <option value="{{ $city->id }}" {{ old('city_id', $employee->city_id ?? '') == $city->id ? 'selected' : '' }}>
                            {{ $city->name }}
                        </option>
                    @endforeach
                </select>
                @error('city_id')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
    </div>
</div>

{{-- Información de Seguridad Social --}}
<div class="card mb-4">
    <div class="card-header">
        <h4 class="mb-0">Seguridad Social</h4>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="eps">EPS</label>
                <input type="text" class="form-control @error('eps') is-invalid @enderror" id="eps" name="eps" value="{{ old('eps', $employee->socialSecurity->eps ?? '') }}">
                @error('eps')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6 mb-3">
                <label for="pension_fund">Fondo de Pensiones</label>
                <input type="text" class="form-control @error('pension_fund') is-invalid @enderror" id="pension_fund" name="pension_fund" value="{{ old('pension_fund', $employee->socialSecurity->pension_fund ?? '') }}">
                @error('pension_fund')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="arl">ARL</label>
                <input type="text" class="form-control @error('arl') is-invalid @enderror" id="arl" name="arl" value="{{ old('arl', $employee->socialSecurity->arl ?? '') }}">
                @error('arl')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6 mb-3">
                <label for="compensation_fund">Caja de Compensación</label>
                <input type="text" class="form-control @error('compensation_fund') is-invalid @enderror" id="compensation_fund" name="compensation_fund" value="{{ old('compensation_fund', $employee->socialSecurity->compensation_fund ?? '') }}">
                @error('compensation_fund')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="blood_type_id">Tipo de Sangre</label>
                <select class="form-control @error('blood_type_id') is-invalid @enderror" id="blood_type_id" name="blood_type_id">
                    <option value="">Seleccione...</option>
                    @foreach($bloodTypes as $bloodType)
                        <option value="{{ $bloodType->id }}" {{ old('blood_type_id', $employee->socialSecurity->blood_type_id ?? '') == $bloodType->id ? 'selected' : '' }}>
                            {{ $bloodType->name }}
                        </option>
                    @endforeach
                </select>
                @error('blood_type_id')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
    </div>
</div>

{{-- Información Salarial y Bancaria --}}
<div class="card mb-4">
    <div class="card-header">
        <h4 class="mb-0">Información Salarial y Bancaria</h4>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="salary">Salario</label>
                <input type="number" class="form-control @error('salary') is-invalid @enderror" id="salary" name="salary" value="{{ old('salary', $employee->salary->salary ?? '') }}">
                @error('salary')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6 mb-3">
                <label for="salary_exclusion">Exclusión Salarial</label>
                <input type="number" class="form-control @error('salary_exclusion') is-invalid @enderror" id="salary_exclusion" name="salary_exclusion" value="{{ old('salary_exclusion', $employee->salary->salary_exclusion ?? '') }}">
                @error('salary_exclusion')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>

        <div class="row">
            <div class="col-md-4 mb-3">
                <label for="bank">Banco</label>
                <input type="text" class="form-control @error('bank') is-invalid @enderror" id="bank" name="bank" value="{{ old('bank', $employee->bankAccount->bank ?? '') }}">
                @error('bank')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-4 mb-3">
                <label for="account_type">Tipo de Cuenta</label>
                <select class="form-control @error('account_type') is-invalid @enderror" id="account_type" name="account_type">
                    <option value="">Seleccione...</option>
                    <option value="Ahorros" {{ old('account_type', $employee->bankAccount->account_type ?? '') == 'Ahorros' ? 'selected' : '' }}>Ahorros</option>
                    <option value="Corriente" {{ old('account_type', $employee->bankAccount->account_type ?? '') == 'Corriente' ? 'selected' : '' }}>Corriente</option>
                </select>
                @error('account_type')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-4 mb-3">
                <label for="account_number">Número de Cuenta</label>
                <input type="text" class="form-control @error('account_number') is-invalid @enderror" id="account_number" name="account_number" value="{{ old('account_number', $employee->bankAccount->account_number ?? '') }}">
                @error('account_number')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
    </div>
</div>

{{-- Contacto de Emergencia --}}
<div class="card mb-4">
    <div class="card-header">
        <h4 class="mb-0">Contacto de Emergencia</h4>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="contact_name">Nombre del Contacto</label>
                <input type="text" class="form-control @error('contact_name') is-invalid @enderror" id="contact_name" name="contact_name" value="{{ old('contact_name', $employee->emergencyContact->contact_name ?? '') }}">
                @error('contact_name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6 mb-3">
                <label for="relationship">Parentesco</label>
                <input type="text" class="form-control @error('relationship') is-invalid @enderror" id="relationship" name="relationship" value="{{ old('relationship', $employee->emergencyContact->relationship ?? '') }}">
                @error('relationship')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="contact_phone">Teléfono del Contacto</label>
                <input type="text" class="form-control @error('contact_phone') is-invalid @enderror" id="contact_phone" name="contact_phone" value="{{ old('contact_phone', $employee->emergencyContact->contact_phone ?? '') }}">
                @error('contact_phone')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6 mb-3">
                <label for="contact_address">Dirección del Contacto</label>
                <input type="text" class="form-control @error('contact_address') is-invalid @enderror" id="contact_address" name="contact_address" value="{{ old('contact_address', $employee->emergencyContact->contact_address ?? '') }}">
                @error('contact_address')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
    </div>
</div>

{{-- Uniforme --}}
<div class="card mb-4">
    <div class="card-header">
        <h4 class="mb-0">Uniforme</h4>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-md-3 mb-3">
                <label for="shirt">Camisa</label>
                <select class="form-control @error('shirt') is-invalid @enderror" id="shirt" name="shirt">
                    <option value="">Seleccione...</option>
                    @foreach(['S', 'M', 'L', 'XL'] as $size)
                        <option value="{{ $size }}" {{ old('shirt', $employee->uniform->shirt ?? '') == $size ? 'selected' : '' }}>
                            {{ $size }}
                        </option>
                    @endforeach
                </select>
                @error('shirt')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-3 mb-3">
                <label for="t_shirt">Camiseta</label>
                <select class="form-control @error('t_shirt') is-invalid @enderror" id="t_shirt" name="t_shirt">
                    <option value="">Seleccione...</option>
                    @foreach(['S', 'M', 'L', 'XL'] as $size)
                        <option value="{{ $size }}" {{ old('t_shirt', $employee->uniform->t_shirt ?? '') == $size ? 'selected' : '' }}>
                            {{ $size }}
                        </option>
                    @endforeach
                </select>
                @error('t_shirt')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-3 mb-3">
                <label for="pants">Pantalón</label>
                <select class="form-control @error('pants') is-invalid @enderror" id="pants" name="pants">
                    <option value="">Seleccione...</option>
                    @foreach(['28', '30', '32', '34', '36'] as $size)
                        <option value="{{ $size }}" {{ old('pants', $employee->uniform->pants ?? '') == $size ? 'selected' : '' }}>
                            {{ $size }}
                        </option>
                    @endforeach
                </select>
                @error('pants')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-3 mb-3">
                <label for="shoes">Zapatos</label>
                <select class="form-control @error('shoes') is-invalid @enderror" id="shoes" name="shoes">
                    <option value="">Seleccione...</option>
                    @foreach(['36', '38', '40', '42', '44'] as $size)
                        <option value="{{ $size }}" {{ old('shoes', $employee->uniform->shoes ?? '') == $size ? 'selected' : '' }}>
                            {{ $size }}
                        </option>
                    @endforeach
                </select>
                @error('shoes')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
    </div>
</div> 