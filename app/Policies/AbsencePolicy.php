<?php

namespace App\Policies;

use App\Models\Absence;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AbsencePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->hasRole('super-admin') || $user->hasPermissionTo('absences.view');
    }

    public function view(User $user, Absence $absence): bool
    {
        return $user->hasRole('super-admin') || $user->hasPermissionTo('absences.view');
    }

    public function create(User $user): bool
    {
        return $user->hasRole('super-admin') || $user->hasPermissionTo('absences.create');
    }

    public function update(User $user, Absence $absence): bool
    {
        return $user->hasRole('super-admin') || $user->hasPermissionTo('absences.edit');
    }

    public function delete(User $user, Absence $absence): bool
    {
        return $user->hasRole('super-admin') || $user->hasPermissionTo('absences.delete');
    }
} 