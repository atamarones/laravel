<?php

namespace App\Policies;

use App\Models\City;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CityPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->hasPermissionTo('cities.index');
    }

    public function view(User $user, City $city)
    {
        return $user->hasPermissionTo('cities.show');
    }

    public function create(User $user)
    {
        return $user->hasPermissionTo('cities.create');
    }

    public function update(User $user, City $city)
    {
        return $user->hasPermissionTo('cities.edit');
    }

    public function delete(User $user, City $city)
    {
        return $user->hasPermissionTo('cities.delete');
    }
} 