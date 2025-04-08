<?php

namespace App\Http\Controllers;

use App\Models\CollaboratorType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CollaboratorTypeController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $this->authorize('collaborator-types.view');

        $query = CollaboratorType::query()
            ->select('id', 'name')
            ->orderBy('name');

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'LIKE', "%{$search}%");
        }

        return Inertia::render('CollaboratorTypes/Index', [
            'collaboratorTypes' => $query->paginate(25)
                                       ->withQueryString(),
            'can' => [
                'create' => $request->user()->can('collaborator-types.create'),
                'edit' => $request->user()->can('collaborator-types.edit'),
                'delete' => $request->user()->can('collaborator-types.delete'),
            ]
        ]);
    }

    public function create()
    {
        $this->authorize('collaborator-types.create');
        return Inertia::render('CollaboratorTypes/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('collaborator-types.create');

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:collaborator_types',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        CollaboratorType::create($request->all());

        return redirect()->route('collaborator-types.index')
            ->with('success', 'Tipo de colaborador creado exitosamente.');
    }

    public function show(CollaboratorType $collaboratorType)
    {
        $this->authorize('collaborator-types.view');
        
        return Inertia::render('CollaboratorTypes/Show', [
            'collaboratorType' => $collaboratorType
        ]);
    }

    public function edit(CollaboratorType $collaboratorType)
    {
        $this->authorize('collaborator-types.edit');
        return Inertia::render('CollaboratorTypes/Edit', [
            'collaboratorType' => $collaboratorType
        ]);
    }

    public function update(Request $request, CollaboratorType $collaboratorType)
    {
        $this->authorize('collaborator-types.edit');

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:collaborator_types,name,' . $collaboratorType->id,
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $collaboratorType->update($request->all());

        return redirect()->route('collaborator-types.index')
            ->with('success', 'Tipo de colaborador actualizado exitosamente.');
    }

    public function destroy(CollaboratorType $collaboratorType)
    {
        $this->authorize('collaborator-types.delete');
        
        $collaboratorType->delete();

        return redirect()->route('collaborator-types.index')
            ->with('success', 'Tipo de colaborador eliminado exitosamente.');
    }
} 