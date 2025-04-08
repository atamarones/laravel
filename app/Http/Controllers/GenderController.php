<?php
namespace App\Http\Controllers;

use App\Models\Gender;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class GenderController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $query = Gender::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'LIKE', "%{$search}%");
        }

        return Inertia::render('Genders/Index', [
            'genders' => $query->paginate(25)->withQueryString(),
            'can' => [
                'create' => $request->user()->can('genders.create'),
                'edit' => $request->user()->can('genders.edit'),
                'delete' => $request->user()->can('genders.delete'),
            ]
        ]);
    }

    public function create()
    {
        $this->authorize('genders.create');
        return Inertia::render('Genders/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('genders.create');

        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        Gender::create($request->all());

        return redirect()->route('genders.index')
            ->with('success', 'Género creado con éxito.');
    }

    public function show(Gender $gender)
    {
        $this->authorize('genders.view');
        return Inertia::render('Genders/Show', [
            'gender' => $gender
        ]);
    }

    public function edit(Gender $gender)
    {
        $this->authorize('genders.edit');
        return Inertia::render('Genders/Edit', [
            'gender' => $gender
        ]);
    }

    public function update(Request $request, Gender $gender)
    {
        $this->authorize('genders.edit');

        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $gender->update($request->all());

        return redirect()->route('genders.index')
            ->with('success', 'Género actualizado con éxito.');
    }

    public function destroy(Gender $gender)
    {
        $this->authorize('genders.delete');
        
        $gender->delete();

        return redirect()->route('genders.index')
            ->with('success', 'Género eliminado con éxito.');
    }
}
