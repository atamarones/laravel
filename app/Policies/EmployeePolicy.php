namespace App\Policies;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class EmployeePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('employees.view');
    }

    public function view(User $user, Employee $employee): bool
    {
        return $user->hasPermissionTo('employees.view');
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('employees.create');
    }

    public function update(User $user, Employee $employee): bool
    {
        return $user->hasPermissionTo('employees.edit');
    }

    public function delete(User $user, Employee $employee): bool
    {
        return $user->hasPermissionTo('employees.delete');
    }
} 