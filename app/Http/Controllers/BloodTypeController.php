<?php

namespace App\Http\Controllers;

use App\Models\BloodType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BloodTypeController extends Controller
{
    public function index(Request $request)
    {
        $query = BloodType::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'LIKE', "%{$search}%");
        }

        return Inertia::render('BloodTypes/Index', [
            'bloodTypes' => $query->paginate(25)
                                ->withQueryString()
        ]);
    }

    public function create()
    {
        return view('blood-types.create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|string|max:3|unique:blood_types',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        BloodType::create($request->all());

        return redirect()->route('blood-types.index')
            ->with('success', 'Tipo de sangre creado exitosamente.');
    }

    public function edit(BloodType $bloodType)
    {
        return view('blood-types.edit', compact('bloodType'));
    }

    public function update(Request $request, BloodType $bloodType)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|string|max:3|unique:blood_types,type,' . $bloodType->id,
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $bloodType->update($request->all());

        return redirect()->route('blood-types.index')
            ->with('success', 'Tipo de sangre actualizado exitosamente.');
    }

    public function destroy(BloodType $bloodType)
    {
        $bloodType->delete();

        return redirect()->route('blood-types.index')
            ->with('success', 'Tipo de sangre eliminado exitosamente.');
    }
} 