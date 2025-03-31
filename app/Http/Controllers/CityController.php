<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CityController extends Controller
{
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
                            ->withQueryString()
        ]);
    }

    public function create()
    {
        return Inertia::render('Cities/Create');
    }

    public function store(Request $request)
    {
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
        return Inertia::render('Cities/Edit', [
            'city' => $city
        ]);
    }

    public function update(Request $request, City $city)
    {
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
        $city->delete();

        return redirect()->route('cities.index')
            ->with('success', 'Ciudad eliminada exitosamente.');
    }
} 