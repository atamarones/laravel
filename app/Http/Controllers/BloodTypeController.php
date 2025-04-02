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
                'create' => $request->user()->can('create', BloodType::class),
                'edit' => $request->user()->can('update', BloodType::class),
                'delete' => $request->user()->can('delete', BloodType::class),
            ]
        ]);
    }

    public function create()
    {
        $this->authorize('create', BloodType::class);
        return Inertia::render('BloodTypes/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', BloodType::class);

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

    public function edit(BloodType $bloodType)
    {
        $this->authorize('update', $bloodType);
        return Inertia::render('BloodTypes/Edit', [
            'bloodType' => $bloodType
        ]);
    }

    public function update(Request $request, BloodType $bloodType)
    {
        $this->authorize('update', $bloodType);

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
        $this->authorize('delete', $bloodType);
        
        $bloodType->delete();

        return redirect()->route('blood-types.index')
            ->with('success', 'Tipo de sangre eliminado exitosamente.');
    }
} 