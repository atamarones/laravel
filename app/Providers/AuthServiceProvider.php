<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Spatie\Permission\Models\Role;
use App\Policies\RolePolicy;
use App\Models\Employee;
use App\Policies\EmployeePolicy;
use App\Models\City;
use App\Policies\CityPolicy;
use App\Models\Position;
use App\Policies\PositionPolicy;
use App\Models\CollaboratorType;
use App\Policies\CollaboratorTypePolicy;
use App\Models\BloodType;
use App\Policies\BloodTypePolicy;
use App\Models\Absence;
use App\Policies\AbsencePolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Role::class => RolePolicy::class,
        Employee::class => EmployeePolicy::class,
        City::class => CityPolicy::class,
        Position::class => PositionPolicy::class,
        CollaboratorType::class => CollaboratorTypePolicy::class,
        BloodType::class => BloodTypePolicy::class,
        Absence::class => AbsencePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Implicitly grant "Super Admin" role all permissions
        Gate::before(function ($user, $ability) {
            return $user->hasRole('super-admin') ? true : null;
        });
    }
} 