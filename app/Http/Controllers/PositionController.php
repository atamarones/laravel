<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PositionController extends Controller
{
    public function index(Request $request)
    {
        $query = Position::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'LIKE', "%{$search}%");
        }

        return Inertia::render('Positions/Index', [
            'positions' => $query->paginate(25)
                               ->withQueryString()
        ]);
    }

    public function create()
    {
        return Inertia::render('Positions/Create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
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
        return Inertia::render('Positions/Edit', [
            'position' => $position
        ]);
    }

    public function update(Request $request, Position $position)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
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
        $position->delete();

        return redirect()->route('positions.index')
            ->with('success', 'Cargo eliminado exitosamente.');
    }
} 