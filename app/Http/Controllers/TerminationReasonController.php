<?php

namespace App\Http\Controllers;

use App\Models\TerminationReason;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TerminationReasonController extends Controller
{
    public function index(Request $request)
    {
        $query = TerminationReason::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%");
            });
        }

        return Inertia::render('TerminationReasons/Index', [
            'terminationReasons' => $query->paginate(25)
                                        ->withQueryString()
        ]);
    }

    public function create()
    {
        return view('termination-reasons.create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'reason' => 'required|string|max:255|unique:termination_reasons',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        TerminationReason::create($request->all());

        return redirect()->route('termination-reasons.index')
            ->with('success', 'Motivo de terminación creado exitosamente.');
    }

    public function edit(TerminationReason $terminationReason)
    {
        return view('termination-reasons.edit', compact('terminationReason'));
    }

    public function update(Request $request, TerminationReason $terminationReason)
    {
        $validator = Validator::make($request->all(), [
            'reason' => 'required|string|max:255|unique:termination_reasons,reason,' . $terminationReason->id,
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $terminationReason->update($request->all());

        return redirect()->route('termination-reasons.index')
            ->with('success', 'Motivo de terminación actualizado exitosamente.');
    }

    public function destroy(TerminationReason $terminationReason)
    {
        $terminationReason->delete();

        return redirect()->route('termination-reasons.index')
            ->with('success', 'Motivo de terminación eliminado exitosamente.');
    }
} 