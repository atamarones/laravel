<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PositionController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $query = Position::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'LIKE', "%{$search}%");
        }

        return Inertia::render('Positions/Index', [
            'positions' => $query->paginate(25)
                               ->withQueryString(),
            'can' => [
                'create' => $request->user()->can('positions.create'),
                'edit' => $request->user()->can('positions.edit'),
                'delete' => $request->user()->can('positions.delete'),
            ]
        ]);
    }

    public function create()
    {
        $this->authorize('positions.create');
        return Inertia::render('Positions/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('positions.create');

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        Position::create($request->all());

        return redirect()->route('positions.index')
            ->with('success', 'Cargo creado exitosamente.');
    }

    public function show(Position $position)
    {
        $this->authorize('positions.view');
        
        return Inertia::render('Positions/Show', [
            'position' => $position
        ]);
    }

    public function edit(Position $position)
    {
        $this->authorize('positions.edit');
        return Inertia::render('Positions/Edit', [
            'position' => $position
        ]);
    }

    public function update(Request $request, Position $position)
    {
        $this->authorize('positions.edit');

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $position->update($request->all());

        return redirect()->route('positions.index')
            ->with('success', 'Cargo actualizado exitosamente.');
    }

    public function destroy(Position $position)
    {
        $this->authorize('positions.delete');
        
        $position->delete();

        return redirect()->route('positions.index')
            ->with('success', 'Cargo eliminado exitosamente.');
    }
} 