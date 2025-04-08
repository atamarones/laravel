<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CityController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $query = City::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('department', 'LIKE', "%{$search}%");
            });
        }

        return Inertia::render('Cities/Index', [
            'cities' => $query->paginate(25)
                            ->withQueryString(),
            'can' => [
                'create' => $request->user()->can('cities.create'),
                'edit' => $request->user()->can('cities.edit'),
                'delete' => $request->user()->can('cities.delete'),
            ]
        ]);
    }

    public function create()
    {
        $this->authorize('cities.create');
        return Inertia::render('Cities/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('cities.create');

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'department' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        City::create($request->all());

        return redirect()->route('cities.index')
            ->with('success', 'Ciudad creada exitosamente.');
    }

    public function show(City $city)
    {
        $this->authorize('cities.view');
        
        return Inertia::render('Cities/Show', [
            'city' => $city
        ]);
    }

    public function edit(City $city)
    {
        $this->authorize('cities.edit');
        return Inertia::render('Cities/Edit', [
            'city' => $city
        ]);
    }

    public function update(Request $request, City $city)
    {
        $this->authorize('cities.edit');

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'department' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $city->update($request->all());

        return redirect()->route('cities.index')
            ->with('success', 'Ciudad actualizada exitosamente.');
    }

    public function destroy(City $city)
    {
        $this->authorize('cities.delete');
        
        $city->delete();

        return redirect()->route('cities.index')
            ->with('success', 'Ciudad eliminada exitosamente.');
    }
} 