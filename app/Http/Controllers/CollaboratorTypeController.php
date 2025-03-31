<?php

namespace App\Http\Controllers;

use App\Models\CollaboratorType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollaboratorTypeController extends Controller
{
    public function index(Request $request)
    {
        $query = CollaboratorType::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'like', "%{$search}%");
        }

        $collaboratorTypes = $query->paginate(25)
            ->withQueryString()
            ->through(fn ($collaboratorType) => [
                'id' => $collaboratorType->id,
                'name' => $collaboratorType->name,
                'description' => $collaboratorType->description,
            ]);

        return Inertia::render('CollaboratorTypes/Index', [
            'collaboratorTypes' => $collaboratorTypes,
        ]);
    }

    public function create()
    {
        return Inertia::render('CollaboratorTypes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:collaborator_types',
            'description' => 'nullable|string|max:1000',
        ]);

        CollaboratorType::create($validated);

        return redirect()->route('collaborator-types.index')
            ->with('success', 'Tipo de colaborador creado exitosamente.');
    }

    public function edit(CollaboratorType $collaboratorType)
    {
        return Inertia::render('CollaboratorTypes/Edit', [
            'collaboratorType' => [
                'id' => $collaboratorType->id,
                'name' => $collaboratorType->name,
                'description' => $collaboratorType->description,
            ],
        ]);
    }

    public function update(Request $request, CollaboratorType $collaboratorType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:collaborator_types,name,' . $collaboratorType->id,
            'description' => 'nullable|string|max:1000',
        ]);

        $collaboratorType->update($validated);

        return redirect()->route('collaborator-types.index')
            ->with('success', 'Tipo de colaborador actualizado exitosamente.');
    }

    public function destroy(CollaboratorType $collaboratorType)
    {
        $collaboratorType->delete();

        return redirect()->route('collaborator-types.index')
            ->with('success', 'Tipo de colaborador eliminado exitosamente.');
    }
} 