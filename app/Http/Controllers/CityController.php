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
                'create' => $request->user()->can('create', City::class),
                'edit' => $request->user()->can('update', City::class),
                'delete' => $request->user()->can('delete', City::class),
            ]
        ]);
    }

    public function create()
    {
        $this->authorize('create', City::class);
        return Inertia::render('Cities/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', City::class);

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

    public function edit(City $city)
    {
        $this->authorize('update', $city);
        return Inertia::render('Cities/Edit', [
            'city' => $city
        ]);
    }

    public function update(Request $request, City $city)
    {
        $this->authorize('update', $city);

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
        $this->authorize('delete', $city);
        
        $city->delete();

        return redirect()->route('cities.index')
            ->with('success', 'Ciudad eliminada exitosamente.');
    }
} 