<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EpsController;
use App\Http\Controllers\BloodTypeController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\TerminationReasonController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\CollaboratorTypeController;
use App\Http\Controllers\Cie10Controller;
use App\Http\Controllers\AbsenceController;
use App\Http\Controllers\AccidentController;
use App\Http\Controllers\EmployeeController;
use Spatie\Permission\Middleware\RoleMiddleware;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleOrPermissionMiddleware;
use App\Http\Controllers\GenderController;
use App\Http\Controllers\CivilStatusController;
use App\Http\Controllers\AbsenceTypeController;
use App\Http\Controllers\ConfigurationController;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Roles y Usuarios
    Route::resource('roles', RoleController::class)->middleware(RoleMiddleware::using('super-admin'));
    Route::resource('users', UserController::class)->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'users.view']));

    // EPS routes
    Route::resource('eps', EpsController::class)->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'eps.view']));

    // Blood Types routes
    Route::resource('blood-types', BloodTypeController::class)->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'blood-types.view']));

    // Genders routes
    Route::resource('genders', GenderController::class)->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'genders.view']));
   
    // Civil Status routes
    Route::resource('civil-status', CivilStatusController::class)->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'civil-status.view']));
   
    // Absence Types routes
    Route::resource('absence-types', AbsenceTypeController::class)->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'absence-types.view']));

    // Cities routes
    Route::resource('cities', CityController::class)->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'cities.view']));

    // Termination Reasons routes
    Route::resource('termination-reasons', TerminationReasonController::class)->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'termination-reasons.view']));

    // Positions routes
    Route::resource('positions', PositionController::class)->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'positions.view']));

    // Collaborator Types routes
    Route::resource('collaborator-types', CollaboratorTypeController::class)->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'collaborator-types.view']));

    // CIE-10 routes
    Route::resource('cie10', Cie10Controller::class)->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'cie10.view']));

    // Ausentismo y Accidentalidad routes
    Route::get('absences/search-employees', [AbsenceController::class, 'searchEmployees'])
        ->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'absences.create']))
        ->name('absences.searchEmployees');
    Route::get('absences/employee-details/{employee}', [AbsenceController::class, 'getEmployeeDetails'])
        ->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'absences.create']))
        ->name('absences.employeeDetails');
    Route::get('absences/search-cie10', [AbsenceController::class, 'searchCie10'])
        ->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'absences.create']))
        ->name('absences.searchCie10');
    Route::resource('absences', AbsenceController::class)
        ->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'absences.view']));
    Route::resource('accidents', AccidentController::class)
        ->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'accidents.view']));

    Route::resource('employees', EmployeeController::class);

    Route::get('configurations/{key}', [ConfigurationController::class, 'getValue'])
        ->name('configurations.get')
        ->middleware('auth');

});

Route::get('/documentation', function () {
    return Inertia::render('Documentation');
})->name('documentation');

require __DIR__.'/auth.php';
