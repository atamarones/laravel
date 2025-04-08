<?php

namespace App\Http\Controllers;

use App\Models\BloodType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class BloodTypeController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $query = BloodType::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'LIKE', "%{$search}%");
        }

        return Inertia::render('BloodTypes/Index', [
            'bloodTypes' => $query->paginate(25)
                               ->withQueryString(),
            'can' => [
                'create' => $request->user()->can('blood-types.create'),
                'edit' => $request->user()->can('blood-types.edit'),
                'delete' => $request->user()->can('blood-types.delete'),
            ]
        ]);
    }

    public function create()
    {
        $this->authorize('blood-types.create');
        return Inertia::render('BloodTypes/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('blood-types.create');

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        BloodType::create($request->all());

        return redirect()->route('blood-types.index')
            ->with('success', 'Tipo de sangre creado exitosamente.');
    }

    public function show(BloodType $bloodType)
    {
        $this->authorize('blood-types.view');
        
        return Inertia::render('BloodTypes/Show', [
            'bloodType' => $bloodType
        ]);
    }

    public function edit(BloodType $bloodType)
    {
        $this->authorize('blood-types.edit');
        return Inertia::render('BloodTypes/Edit', [
            'bloodType' => $bloodType
        ]);
    }

    public function update(Request $request, BloodType $bloodType)
    {
        $this->authorize('blood-types.edit');

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $bloodType->update($request->all());

        return redirect()->route('blood-types.index')
            ->with('success', 'Tipo de sangre actualizado exitosamente.');
    }

    public function destroy(BloodType $bloodType)
    {
        $this->authorize('blood-types.delete');
        
        $bloodType->delete();

        return redirect()->route('blood-types.index')
            ->with('success', 'Tipo de sangre eliminado exitosamente.');
    }
} 