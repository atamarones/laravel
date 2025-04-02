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
                'create' => $request->user()->can('create', Position::class),
                'edit' => $request->user()->can('update', Position::class),
                'delete' => $request->user()->can('delete', Position::class),
            ]
        ]);
    }

    public function create()
    {
        $this->authorize('create', Position::class);
        return Inertia::render('Positions/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', Position::class);

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

    public function edit(Position $position)
    {
        $this->authorize('update', $position);
        return Inertia::render('Positions/Edit', [
            'position' => $position
        ]);
    }

    public function update(Request $request, Position $position)
    {
        $this->authorize('update', $position);

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
        $this->authorize('delete', $position);
        
        $position->delete();

        return redirect()->route('positions.index')
            ->with('success', 'Cargo eliminado exitosamente.');
    }
} 