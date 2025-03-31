@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4 class="mb-0">Crear Nuevo Empleado</h4>
                    <a href="{{ route('employees.index') }}" class="btn btn-secondary">Volver</a>
                </div>

                <div class="card-body">
                    <form action="{{ route('employees.store') }}" method="POST">
                        @csrf

                        @include('employees.form')

                        <div class="text-end">
                            <button type="submit" class="btn btn-primary">Guardar Empleado</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection 