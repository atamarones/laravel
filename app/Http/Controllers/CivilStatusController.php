<?php
namespace App\Http\Controllers;

use App\Models\CivilStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CivilStatusController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $query = CivilStatus::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'LIKE', "%{$search}%");
        }

        return Inertia::render('CivilStatus/Index', [
            'civilStatuses' => $query->paginate(25)->withQueryString(),
            'can' => [
                'create' => $request->user()->can('civil-status.create'),
                'edit' => $request->user()->can('civil-status.edit'),
                'delete' => $request->user()->can('civil-status.delete'),
            ]
        ]);
    }

    public function create()
    {
        $this->authorize('civil-status.create');
        return Inertia::render('CivilStatus/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('civil-status.create');

        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        CivilStatus::create($request->all());

        return redirect()->route('civil-status.index')
            ->with('success', 'Estado civil creado con éxito.');
    }

    public function show(CivilStatus $civilStatus)
    {
        $this->authorize('civil-status.view');
        return Inertia::render('CivilStatus/Show', [
            'civilStatus' => $civilStatus
        ]);
    }

    public function edit(CivilStatus $civilStatus)
    {
        $this->authorize('civil-status.edit');
        return Inertia::render('CivilStatus/Edit', [
            'civilStatus' => $civilStatus
        ]);
    }

    public function update(Request $request, CivilStatus $civilStatus)
    {
        $this->authorize('civil-status.edit');

        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $civilStatus->update($request->all());

        return redirect()->route('civil-status.index')
            ->with('success', 'Estado civil actualizado con éxito.');
    }

    public function destroy(CivilStatus $civilStatus)
    {
        $this->authorize('civil-status.delete');
        
        $civilStatus->delete();

        return redirect()->route('civil-status.index')
            ->with('success', 'Estado civil eliminado con éxito.');
    }
}
