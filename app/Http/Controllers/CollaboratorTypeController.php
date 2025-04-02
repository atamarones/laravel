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
        $query = CollaboratorType::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'LIKE', "%{$search}%");
        }

        return Inertia::render('CollaboratorTypes/Index', [
            'collaboratorTypes' => $query->paginate(25)
                                      ->withQueryString(),
            'can' => [
                'create' => $request->user()->can('create', CollaboratorType::class),
                'edit' => $request->user()->can('update', CollaboratorType::class),
                'delete' => $request->user()->can('delete', CollaboratorType::class),
            ]
        ]);
    }

    public function create()
    {
        $this->authorize('create', CollaboratorType::class);
        return Inertia::render('CollaboratorTypes/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', CollaboratorType::class);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        CollaboratorType::create($request->all());

        return redirect()->route('collaborator-types.index')
            ->with('success', 'Tipo de colaborador creado exitosamente.');
    }

    public function edit(CollaboratorType $collaboratorType)
    {
        $this->authorize('update', $collaboratorType);
        return Inertia::render('CollaboratorTypes/Edit', [
            'collaboratorType' => $collaboratorType
        ]);
    }

    public function update(Request $request, CollaboratorType $collaboratorType)
    {
        $this->authorize('update', $collaboratorType);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
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
        $this->authorize('delete', $collaboratorType);
        
        $collaboratorType->delete();

        return redirect()->route('collaborator-types.index')
            ->with('success', 'Tipo de colaborador eliminado exitosamente.');
    }
} 