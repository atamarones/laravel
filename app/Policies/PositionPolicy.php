<?php

namespace App\Policies;

use App\Models\Position;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PositionPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->hasPermissionTo('positions.index');
    }

    public function view(User $user, Position $position)
    {
        return $user->hasPermissionTo('positions.show');
    }

    public function create(User $user)
    {
        return $user->hasPermissionTo('positions.create');
    }

    public function update(User $user, Position $position)
    {
        return $user->hasPermissionTo('positions.edit');
    }

    public function delete(User $user, Position $position)
    {
        return $user->hasPermissionTo('positions.delete');
    }
} 