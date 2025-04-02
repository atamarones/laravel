<?php

namespace App\Policies;

use App\Models\CollaboratorType;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CollaboratorTypePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->hasPermissionTo('collaborator-types.index');
    }

    public function view(User $user, CollaboratorType $collaboratorType)
    {
        return $user->hasPermissionTo('collaborator-types.show');
    }

    public function create(User $user)
    {
        return $user->hasPermissionTo('collaborator-types.create');
    }

    public function update(User $user, CollaboratorType $collaboratorType)
    {
        return $user->hasPermissionTo('collaborator-types.edit');
    }

    public function delete(User $user, CollaboratorType $collaboratorType)
    {
        return $user->hasPermissionTo('collaborator-types.delete');
    }
} 