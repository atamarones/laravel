<?php

namespace App\Http\Controllers;

use App\Models\Cie10;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class Cie10Controller extends Controller
{
    protected function setAuditFields($model, $action)
    {
        $model->version = $model->version ? $model->version + 1 : 1;
        $model->{$action . '_by'} = auth()->user()->name;
        return $model;
    }

    public function index(Request $request)
    {
        $query = Cie10::query()
            ->select('id', 'code', 'description', 'created_at', 'updated_at')
            ->orderBy('code');

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('code', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%");
            });
        }

        return Inertia::render('Cie10/Index', [
            'cie10' => $query->paginate(25)
                            ->withQueryString()
        ]);
    }

    public function create()
    {
        return Inertia::render('Cie10/Create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string|max:10|unique:cie10',
            'description' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $cie10 = new Cie10($request->all());
        $this->setAuditFields($cie10, 'created');
        $cie10->save();

        return redirect()->route('cie10.index')
            ->with('success', 'Código CIE10 creado exitosamente.');
    }

    public function edit(Cie10 $cie10)
    {
        return Inertia::render('Cie10/Edit', [
            'cie10' => $cie10
        ]);
    }

    public function update(Request $request, Cie10 $cie10)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string|max:10|unique:cie10,code,' . $cie10->code . ',code',
            'description' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $cie10->fill($request->only(['code', 'description']));
        $this->setAuditFields($cie10, 'updated');
        $cie10->save();

        return redirect()->route('cie10.index')
            ->with('success', 'Código CIE10 actualizado exitosamente.');
    }

    public function destroy(Cie10 $cie10)
    {
        $this->setAuditFields($cie10, 'deleted');
        $cie10->save();
        $cie10->delete();

        return redirect()->route('cie10.index')
            ->with('success', 'Código CIE10 eliminado exitosamente.');
    }
} 