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
use Spatie\Permission\Middleware\RoleMiddleware;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleOrPermissionMiddleware;

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
    Route::resource('absences', AbsenceController::class)
        ->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'absences.view']));
    Route::resource('accidents', AccidentController::class)
        ->middleware(RoleOrPermissionMiddleware::using(['super-admin', 'accidents.view']));
});

require __DIR__.'/auth.php';
