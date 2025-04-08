<?php

namespace App\Http\Controllers;

use App\Models\AbsenceType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class AbsenceTypeController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $query = AbsenceType::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'LIKE', "%{$search}%");
        }

        return Inertia::render('AbsenceTypes/Index', [
            'absenceTypes' => $query->paginate(25)
                               ->withQueryString(),
            'can' => [
                'create' => $request->user()->can('absence-types.create'),
                'edit' => $request->user()->can('absence-types.edit'),
                'delete' => $request->user()->can('absence-types.delete'),
            ]
        ]);
    }

    public function create()
    {
        $this->authorize('absence-types.create');
        return Inertia::render('AbsenceTypes/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('absence-types.create');

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        AbsenceType::create($request->all());

        return redirect()->route('absence-types.index')
            ->with('success', 'Tipo de ausencia creado exitosamente.');
    }

    public function show(AbsenceType $absenceType)
    {
        $this->authorize('absence-types.view');
        
        return Inertia::render('AbsenceTypes/Show', [
            'absenceType' => $absenceType
        ]);
    }

    public function edit(AbsenceType $absenceType)
    {
        $this->authorize('absence-types.edit');
        return Inertia::render('AbsenceTypes/Edit', [
            'absenceType' => $absenceType
        ]);
    }

    public function update(Request $request, AbsenceType $absenceType)
    {
        $this->authorize('absence-types.edit');

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $absenceType->update($request->all());

        return redirect()->route('absence-types.index')
            ->with('success', 'Tipo de ausencia actualizado exitosamente.');
    }

    public function destroy(AbsenceType $absenceType)
    {
        $this->authorize('absence-types.delete');
        
        $absenceType->delete();

        return redirect()->route('absence-types.index')
            ->with('success', 'Tipo de ausencia eliminado exitosamente.');
    }
} 
