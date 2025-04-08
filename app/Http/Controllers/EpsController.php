<?php

namespace App\Http\Controllers;

use App\Models\Eps;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class EpsController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $this->authorize('eps.view');

        $query = Eps::query()
            ->select('id', 'name', 'code', 'mobility_code', 'nit', 'regime')
            ->orderBy('name');

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('nit', 'LIKE', "%{$search}%")
                  ->orWhere('code', 'LIKE', "%{$search}%");
            });
        }

        return Inertia::render('Eps/Index', [
            'eps' => $query->paginate(25)
                          ->withQueryString(),
            'can' => [
                'create' => $request->user()->can('eps.create'),
                'edit' => $request->user()->can('eps.edit'),
                'delete' => $request->user()->can('eps.delete'),
            ]
        ]);
    }

    public function create()
    {
        $this->authorize('eps.create');
        return Inertia::render('Eps/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('eps.create');

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:eps',
            'code' => 'required|string|max:255|unique:eps',
            'mobility_code' => 'nullable|string|max:255|unique:eps,mobility_code',
            'nit' => 'required|string|max:255|unique:eps',
            'regime' => 'required|in:CONTRIBUTIVO,SUBSIDIADO,AMBOS REGÍMENES,No Aplica',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        Eps::create($request->all());

        return redirect()->route('eps.index')
            ->with('success', 'EPS creada exitosamente.');
    }

    public function show(Eps $ep)
    {
        $this->authorize('eps.view');
        
        return Inertia::render('Eps/Show', [
            'eps' => $ep
        ]);
    }

    public function edit(Eps $ep)
    {
        $this->authorize('eps.edit');
        return Inertia::render('Eps/Edit', [
            'eps' => $ep
        ]);
    }

    public function update(Request $request, Eps $ep)
    {
        $this->authorize('eps.edit');

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:eps,name,' . $ep->id,
            'code' => 'required|string|max:255|unique:eps,code,' . $ep->id,
            'mobility_code' => 'nullable|string|max:255|unique:eps,mobility_code,' . $ep->id,
            'nit' => 'required|string|max:255|unique:eps,nit,' . $ep->id,
            'regime' => 'required|in:CONTRIBUTIVO,SUBSIDIADO,AMBOS REGÍMENES,No Aplica',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $ep->update($request->all());

        return redirect()->route('eps.index')
            ->with('success', 'EPS actualizada exitosamente.');
    }

    public function destroy(Eps $ep)
    {
        $this->authorize('eps.delete');
        
        $ep->delete();

        return redirect()->route('eps.index')
            ->with('success', 'EPS eliminada exitosamente.');
    }
} 