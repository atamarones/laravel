<?php

namespace App\Http\Controllers;

use App\Models\Absence;
use App\Models\Employee;
use App\Models\AbsenceType;
use App\Models\Eps;
use App\Models\Cie10;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Cache;

class AbsenceController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Absence::class);

        $absences = Absence::with(['employee', 'absenceType'])
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('Absences/Index', [
            'absences' => $absences,
            'can' => [
                'create' => Auth::user()->can('create', Absence::class),
                'edit' => Auth::user()->can('update', Absence::class),
                'delete' => Auth::user()->can('delete', Absence::class),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Absence::class);

        return Inertia::render('Absences/Create', [
            'absenceTypes' => AbsenceType::all(),
            'epsList' => Eps::all(),
            'cie10List' => Cie10::all(),
            'can' => [
                'create' => Auth::user()->can('create', Absence::class),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Absence::class);

        try {
            $validated = $request->validate([
                'employee_id' => 'required|exists:employees,id',
                'absence_type_id' => 'required|exists:absence_types,id',
                'eps_id' => 'required|exists:eps,id',
                'cie10_id' => 'required|exists:cie10,id',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
                'hours' => 'required|numeric|min:0',
                'absence_days' => 'required|numeric|min:0',
                'absence_value' => 'required|numeric|min:0',
                'description' => 'required|string|max:500',
            ]);

            \Log::info('Datos validados:', $validated);

            // Asegurarse de que solo se guarden los campos permitidos
            $absence = Absence::create([
                'employee_id' => $validated['employee_id'],
                'absence_type_id' => $validated['absence_type_id'],
                'eps_id' => $validated['eps_id'],
                'cie10_id' => $validated['cie10_id'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'hours' => $validated['hours'],
                'absence_days' => $validated['absence_days'],
                'absence_value' => $validated['absence_value'],
                'description' => $validated['description'],
            ]);

            \Log::info('Incapacidad creada:', ['id' => $absence->id]);

            return redirect()->route('absences.index')
                ->with('success', 'Incapacidad registrada exitosamente.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Error de validación:', $e->errors());
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            \Log::error('Error general al crear incapacidad:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return back()
                ->with('error', 'Error al registrar la incapacidad: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Absence $absence)
    {
        $this->authorize('view', $absence);

        $absence->load(['employee', 'absenceType', 'eps', 'cie10']);

        return Inertia::render('Absences/Show', [
            'absence' => $absence
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Absence $absence)
    {
        $this->authorize('update', $absence);

        $absence->load(['employee', 'absenceType', 'eps', 'cie10']);

        return Inertia::render('Absences/Edit', [
            'absence' => $absence,
            'absenceTypes' => AbsenceType::all(),
            'epsList' => Eps::all(),
            'cie10List' => Cie10::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Absence $absence)
    {
        $this->authorize('update', $absence);

        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'absence_type_id' => 'required|exists:absence_types,id',
            'eps_id' => 'required|exists:eps,id',
            'cie10_id' => 'required|exists:cie10,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'hours' => 'nullable|numeric|min:0',
            'absence_days' => 'nullable|numeric|min:0',
            'absence_value' => 'nullable|numeric|min:0',
            'description' => 'required|string|max:500',
            'validation_observations' => 'nullable|string|max:500',
        ]);

        $absence->update($validated);

        return redirect()->route('absences.index')
            ->with('success', 'Incapacidad actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Absence $absence)
    {
        $this->authorize('delete', $absence);

        $absence->delete();

        return redirect()->route('absences.index')
            ->with('success', 'Incapacidad eliminada exitosamente.');
    }

    public function searchEmployees(Request $request)
    {
        $query = trim($request->input('query'));
        if (strlen($query) < 3) {
            return response()->json([]);
        }

        // Intentar obtener resultados del caché
        $cacheKey = "employee_search_{$query}";
        if (Cache::has($cacheKey)) {
            return response()->json(Cache::get($cacheKey));
        }

        try {
            // Primero buscar coincidencia exacta por número de identificación
            // usando el índice único
            $exactMatches = Employee::where('identification_number', $query)
                ->with([
                    'gender',
                    'collaboratorType',
                    'position',
                    'eps',
                    'salary' => fn($q) => $q->latest()->first()
                ])
                ->get();

            if ($exactMatches->isNotEmpty()) {
                Cache::put($cacheKey, $exactMatches, now()->addHours(24));
                return response()->json($exactMatches);
            }

            // Si no hay coincidencia exacta, usar búsqueda fulltext para el nombre
            // y búsqueda por prefijo para la identificación
            $results = DB::select("
                SELECT e.*, 
                       MATCH(e.full_name) AGAINST(? IN BOOLEAN MODE) as name_relevance
                FROM employees e
                WHERE e.deleted_at IS NULL
                AND (
                    e.identification_number LIKE ?
                    OR MATCH(e.full_name) AGAINST(? IN BOOLEAN MODE)
                )
                ORDER BY 
                    CASE 
                        WHEN e.identification_number LIKE ? THEN 1
                        WHEN e.full_name LIKE ? THEN 2
                        ELSE 3
                    END,
                    name_relevance DESC
                LIMIT 10
            ", [
                $query,
                $query . '%',
                $query . '*',
                $query . '%',
                $query . '%'
            ]);

            if (empty($results)) {
                return response()->json([]);
            }

            // Obtener los IDs de los empleados encontrados
            $employeeIds = array_column($results, 'id');

            // Cargar los empleados con sus relaciones
            $employees = Employee::whereIn('id', $employeeIds)
                ->with([
                    'gender',
                    'collaboratorType',
                    'position',
                    'eps',
                    'salary' => fn($q) => $q->latest()->first()
                ])
                ->get()
                ->sortBy(function($employee) use ($results) {
                    // Mantener el orden original de los resultados
                    return array_search($employee->id, array_column($results, 'id'));
                })
                ->values();

            // Guardar en caché por 24 horas
            if ($employees->isNotEmpty()) {
                Cache::put($cacheKey, $employees, now()->addHours(24));
            }

            return response()->json($employees);

        } catch (\Exception $e) {
            \Log::error('Error en búsqueda de empleados: ' . $e->getMessage());
            return response()->json(['error' => 'Error en la búsqueda'], 500);
        }
    }

    public function getEmployeeDetails($id)
    {
        try {
            $employee = Employee::with([
                'gender',
                'collaboratorType',
                'position',
                'eps',
                'salary' => function($q) {
                    $q->latest()->limit(1);
                }
            ])
            ->findOrFail($id);

            return response()->json($employee);
        } catch (\Exception $e) {
            \Log::error('Error al obtener detalles del empleado: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener detalles'], 500);
        }
    }

    public function getCie10Details($id)
    {
        $this->authorize('create', Absence::class);

        $cie10 = Cie10::findOrFail($id);
        
        return response()->json([
            'description' => $cie10->description,
            'group' => $cie10->group,
            'segment' => $cie10->segment
        ]);
    }

    public function searchCie10(Request $request)
    {
        $query = trim(strtoupper($request->input('query')));
        if (strlen($query) < 2) {
            return response()->json([]);
        }

        // Intentar obtener resultados del caché
        $cacheKey = "cie10_search_{$query}";
        if (Cache::has($cacheKey)) {
            return response()->json(Cache::get($cacheKey));
        }

        try {
            // Primero buscar coincidencia exacta por código
            $exactMatches = Cie10::where('code', $query)
                ->select('id', 'code', 'description', 'group', 'segment')
                ->get();

            if ($exactMatches->isNotEmpty()) {
                Cache::put($cacheKey, $exactMatches, now()->addHours(24));
                return response()->json($exactMatches);
            }

            // Luego buscar por prefijo de código
            $results = Cie10::where('code', 'like', $query . '%')
                ->select('id', 'code', 'description', 'group', 'segment')
                ->limit(10)
                ->get();

            // Si no hay resultados por código, buscar en la descripción usando fulltext
            if ($results->isEmpty()) {
                $results = DB::select("
                    SELECT id, code, description, `group`, segment,
                           MATCH(description) AGAINST(? IN BOOLEAN MODE) as relevance
                    FROM cie10
                    WHERE MATCH(description) AGAINST(? IN BOOLEAN MODE)
                    ORDER BY relevance DESC
                    LIMIT 10
                ", [$query . '*', $query . '*']);

                $results = collect($results)->map(function($item) {
                    return [
                        'id' => $item->id,
                        'code' => $item->code,
                        'description' => $item->description,
                        'group' => $item->group,
                        'segment' => $item->segment
                    ];
                });
            }

            // Guardar en caché por 24 horas
            if ($results->isNotEmpty()) {
                Cache::put($cacheKey, $results, now()->addHours(24));
            }

            return response()->json($results);

        } catch (\Exception $e) {
            \Log::error('Error en búsqueda CIE-10: ' . $e->getMessage());
            return response()->json(['error' => 'Error en la búsqueda'], 500);
        }
    }
}
