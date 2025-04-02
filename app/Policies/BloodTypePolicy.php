<?php

namespace App\Policies;

use App\Models\BloodType;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BloodTypePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->hasPermissionTo('view-blood-types');
    }

    public function view(User $user, BloodType $bloodType)
    {
        return $user->hasPermissionTo('view-blood-types');
    }

    public function create(User $user)
    {
        return $user->hasPermissionTo('create-blood-types');
    }

    public function update(User $user, BloodType $bloodType)
    {
        return $user->hasPermissionTo('edit-blood-types');
    }

    public function delete(User $user, BloodType $bloodType)
    {
        return $user->hasPermissionTo('delete-blood-types');
    }
} 