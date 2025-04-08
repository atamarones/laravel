import { useState, useEffect, useCallback } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';
import debounce from 'lodash/debounce';

export default function AbsenceForm({ absenceTypes, epsList, cie10List, className = '' }) {
    console.log('Tipos de ausencia recibidos:', absenceTypes);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [cie10SearchQuery, setCie10SearchQuery] = useState('');
    const [cie10SearchResults, setCie10SearchResults] = useState([]);
    const [selectedCie10Description, setSelectedCie10Description] = useState('');
    const [selectedCie10Group, setSelectedCie10Group] = useState('');
    const [selectedCie10Segment, setSelectedCie10Segment] = useState('');
    const [isLoadingCie10, setIsLoadingCie10] = useState(false);
    const [showNoResults, setShowNoResults] = useState(false);
    const [isLoadingEmployee, setIsLoadingEmployee] = useState(false);
    const [showNoEmployeeResults, setShowNoEmployeeResults] = useState(false);
    const [calculationMessage, setCalculationMessage] = useState('');
    const [workingHoursPerDay, setWorkingHoursPerDay] = useState(8);
    const [daysPerMonth, setDaysPerMonth] = useState(30);

    const { data, setData, post, processing, errors } = useForm({
        employee_id: '',
        absence_type_id: '',
        eps_id: '',
        cie10_id: '',
        start_date: '',
        end_date: '',
        hours: '',
        absence_days: '',
        absence_value: '',
        description: '',
    });

    const debouncedEmployeeSearch = useCallback(
        debounce(async (value) => {
            if (value.length < 3) {
                setSearchResults([]);
                setShowNoEmployeeResults(false);
                return;
            }

            try {
                setIsLoadingEmployee(true);
                setShowNoEmployeeResults(false);
                setSearchResults([]); // Limpiar resultados anteriores
                
                const response = await axios.get('/absences/search-employees', {
                    params: { query: value }
                });
                
                const results = response.data;
                if (results.length === 0) {
                    setShowNoEmployeeResults(true);
                } else {
                    setSearchResults(results);
                }
            } catch (error) {
                console.error('Error searching employees:', error);
                setSearchResults([]);
            } finally {
                setIsLoadingEmployee(false);
            }
        }, 300),
        []
    );

    const debouncedCie10Search = useCallback(
        debounce(async (value) => {
            if (value.length < 2) {
                setCie10SearchResults([]);
                setShowNoResults(false);
                return;
            }

            try {
                setIsLoadingCie10(true);
                setShowNoResults(false);
                setCie10SearchResults([]); // Limpiar resultados anteriores

                const response = await axios.get('/absences/search-cie10', {
                    params: { query: value }
                });
                
                const results = response.data;
                if (results.length === 0) {
                    setShowNoResults(true);
                } else {
                    setCie10SearchResults(results);
                }
            } catch (error) {
                console.error('Error searching CIE-10:', error);
                setCie10SearchResults([]);
            } finally {
                setIsLoadingCie10(false);
            }
        }, 300),
        []
    );

    const handleEmployeeSelect = async (employee) => {
        try {
            // Obtener los detalles completos del empleado
            const response = await axios.get(`/absences/employee-details/${employee.id}`);
            const employeeData = response.data;
            
            setSelectedEmployee(employeeData);
            setData(prevData => ({
                ...prevData,
                employee_id: employeeData.id,
                eps_id: employeeData.eps?.id || ''
            }));
            setSearchQuery(employeeData.full_name);
            setSearchResults([]);

            // Calcular valor inicial si ya hay días establecidos
            if (data.absence_days && employeeData.salary?.salary) {
                const baseSalary = parseFloat(employeeData.salary.salary);
                const days = parseFloat(data.absence_days);
                const absenceValue = (days * baseSalary) / daysPerMonth;
                setData('absence_value', absenceValue.toFixed(2));
            }
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };

    const handleCie10Select = (cie10) => {
        setData('cie10_id', cie10.id);
        setCie10SearchQuery(cie10.code);
        setSelectedCie10Description(cie10.description);
        setSelectedCie10Group(cie10.group);
        setSelectedCie10Segment(cie10.segment);
        setCie10SearchResults([]);
    };

    useEffect(() => {
        // Cargar la configuración de horas laborales por día
        const fetchWorkingHours = async () => {
            try {
                const response = await axios.get('/api/configurations/working-hours-per-day');
                setWorkingHoursPerDay(parseInt(response.data.value));
            } catch (error) {
                console.error('Error loading working hours configuration:', error);
            }
        };
        fetchWorkingHours();
    }, []);

    // Efecto para obtener la configuración de días por mes
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await axios.get(route('configurations.get', { key: 'days_per_month' }));
                if (response.data && response.data.value) {
                    setDaysPerMonth(parseFloat(response.data.value));
                }
            } catch (error) {
                console.error('Error fetching days per month config:', error);
            }
        };
        fetchConfig();
    }, []);

    // Efecto para calcular días cuando cambian las fechas o las horas
    useEffect(() => {
        if (data.start_date) {
            // Verificar si la fecha de inicio está completa
            const startDate = new Date(data.start_date);
            if (isNaN(startDate.getTime())) {
                // Si la fecha no es válida, limpiar campos relacionados
                setData(prevData => ({
                    ...prevData,
                    end_date: '',
                    hours: '',
                    absence_days: '',
                    absence_value: ''
                }));
                setCalculationMessage('');
                return;
            }

            if (data.hours) {
                const daysFromHours = calculateDaysFromHours(data.hours);
                setData(prevData => ({
                    ...prevData,
                    absence_days: daysFromHours,
                    end_date: adjustEndDate(data.start_date, daysFromHours)
                }));
                setCalculationMessage('Cálculo basado en horas. Verificar fechas.');
            } else if (data.end_date) {
                const daysFromDates = calculateDaysFromDates(data.start_date, data.end_date);
                setData(prevData => ({
                    ...prevData,
                    absence_days: daysFromDates.toString()
                }));
                setCalculationMessage('');
            }
        } else {
            // Si no hay fecha de inicio, limpiar campos relacionados
            setData(prevData => ({
                ...prevData,
                end_date: '',
                hours: '',
                absence_days: '',
                absence_value: ''
            }));
            setCalculationMessage('');
        }
    }, [data.start_date, data.end_date, data.hours]);

    // Efecto para calcular el valor por ausentismo
    useEffect(() => {
        if (selectedEmployee?.salary?.salary && data.absence_days) {
            const baseSalary = parseFloat(selectedEmployee.salary.salary);
            const days = parseFloat(data.absence_days);
            const absenceValue = (days * baseSalary) / daysPerMonth;
            setData(prevData => ({
                ...prevData,
                absence_value: absenceValue.toFixed(2)
            }));
        }
    }, [data.absence_days, selectedEmployee?.salary?.salary, daysPerMonth]);

    // Función para calcular días basado en fechas
    const calculateDaysFromDates = (startDate, endDate) => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    // Función para calcular días basado en horas
    const calculateDaysFromHours = (hours) => {
        return hours ? (hours / workingHoursPerDay).toFixed(1) : 0;
    };

    // Función para ajustar la fecha de fin basada en días
    const adjustEndDate = (startDate, days) => {
        if (!startDate || !days) return '';
        const start = new Date(startDate);
        const end = new Date(start);
        // Convertir días decimales a días enteros y horas
        const wholeDays = Math.floor(days);
        const fractionalDays = days % 1;
        const extraHours = fractionalDays * workingHoursPerDay;
        
        // Ajustar la fecha fin según los días enteros
        end.setDate(start.getDate() + (wholeDays > 0 ? wholeDays - 1 : 0));
        
        return end.toISOString().split('T')[0];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Asegurarse de que los campos numéricos sean números y limpiar el formato de moneda
        const formData = {
            ...data,
            hours: parseFloat(data.hours) || 0,
            absence_days: parseFloat(data.absence_days) || 0,
            absence_value: parseFloat(data.absence_value?.toString().replace(/[^0-9.-]+/g, '')) || 0,
        };

        console.log('Enviando datos:', formData);

        post(route('absences.store'), formData, {
            onSuccess: () => {
                console.log('Incapacidad creada exitosamente');
            },
            onError: (errors) => {
                console.error('Errores al crear incapacidad:', errors);
            },
            preserveScroll: true
        });
    };

    return (
        <div className={`bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 ${className}`}>
            {/* Búsqueda de empleado */}
            <div className="mb-6 relative">
                <InputLabel htmlFor="employee_search" value="Buscar empleado" required />
                <div className="relative">
                    <TextInput
                        id="employee_search"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchQuery(value);
                            debouncedEmployeeSearch(value);
                        }}
                        className="mt-1 block w-full"
                        placeholder="Buscar por nombre o identificación..."
                        required
                    />
                    {isLoadingEmployee && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    )}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                    Ingresa al menos 3 caracteres para buscar
                </div>
                {showNoEmployeeResults && !isLoadingEmployee && searchQuery.length >= 3 && (
                    <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg p-4 text-center text-gray-500">
                        No se encontraron empleados para "{searchQuery}"
                    </div>
                )}
                {searchResults.length > 0 && !isLoadingEmployee && (
                    <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {searchResults.map((employee) => (
                            <div
                                key={employee.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                                onClick={() => handleEmployeeSelect(employee)}
                            >
                                <div className="flex items-start">
                                    <span className="font-medium text-indigo-600 min-w-[120px]">
                                        {employee.identification_number}
                                    </span>
                                    <span className="text-gray-900 ml-2 flex-1">
                                        {employee.full_name}
                                    </span>
                                </div>
                                <div className="mt-1 text-sm text-gray-500">
                                    {employee.position?.name || 'Sin cargo'} - {employee.eps?.name || 'Sin EPS'}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Card del empleado */}
            {selectedEmployee && (
                <div className="mb-6 p-6 bg-white rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Empleado</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
                            <p className="text-base text-gray-900">{selectedEmployee.full_name}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Identificación</p>
                            <p className="text-base text-gray-900">{selectedEmployee.identification_number}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Género</p>
                            <p className="text-base text-gray-900">{selectedEmployee.gender?.name || 'No especificado'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Tipo de Personal</p>
                            <p className="text-base text-gray-900">{selectedEmployee.collaborator_type?.name || 'No especificado'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Cargo</p>
                            <p className="text-base text-gray-900">{selectedEmployee.position?.name || 'No especificado'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">EPS</p>
                            <p className="text-base text-gray-900">
                                {selectedEmployee.eps?.name || 'No especificado'}
                            </p>
                        </div>
                        <div className="space-y-1 col-span-full">
                            <p className="text-sm font-medium text-gray-500">Salario Base</p>
                            <p className="text-base text-gray-900 font-medium">
                                {selectedEmployee.salary?.salary 
                                    ? new Intl.NumberFormat('es-CO', { 
                                        style: 'currency', 
                                        currency: 'COP',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(selectedEmployee.salary.salary) 
                                    : 'No especificado'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="absence_type_id" value="Tipo de Ausencia" required />
                        <select
                            id="absence_type_id"
                            name="absence_type_id"
                            value={data.absence_type_id}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            onChange={(e) => setData('absence_type_id', e.target.value)}
                            required
                        >
                            <option value="">Seleccionar tipo de ausencia...</option>
                            {Array.isArray(absenceTypes) && absenceTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.absence_type_id} className="mt-2" />
                    </div>

                    {/* Búsqueda de CIE-10 */}
                    <div className="relative">
                        <InputLabel htmlFor="cie10_search" value="Buscar Código CIE-10" required />
                        <div className="relative">
                            <TextInput
                                id="cie10_search"
                                type="text"
                                value={cie10SearchQuery}
                                onChange={(e) => {
                                    const value = e.target.value.toUpperCase();
                                    setCie10SearchQuery(value);
                                    debouncedCie10Search(value);
                                }}
                                className="mt-1 block w-full"
                                placeholder="Escribe el código o descripción CIE-10..."
                                required
                            />
                            {isLoadingCie10 && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            )}
                            {showNoResults && !isLoadingCie10 && cie10SearchQuery.length >= 2 && (
                                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg p-4 text-center text-gray-500">
                                    No se encontraron resultados para "{cie10SearchQuery}"
                                </div>
                            )}
                            {cie10SearchResults.length > 0 && !isLoadingCie10 && (
                                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
                                    {cie10SearchResults.map((cie10) => (
                                        <div
                                            key={cie10.id}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                                            onClick={() => handleCie10Select(cie10)}
                                        >
                                            <div className="flex items-start">
                                                <span className="font-medium min-w-[100px] text-indigo-600">{cie10.code}</span>
                                                <span className="text-sm text-gray-600 ml-2 flex-1">{cie10.description}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                            Ingresa al menos 2 caracteres para buscar por código o descripción
                        </div>
                        <input type="hidden" name="cie10_id" value={data.cie10_id} />
                        <InputError message={errors.cie10_id} className="mt-2" />
                    </div>

                    {/* Campo de descripción CIE-10 */}
                    {selectedCie10Description && (
                        <div className="col-span-2 mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <div className="text-sm font-medium text-gray-500 mb-1">Descripción</div>
                                    <div className="text-gray-900">{selectedCie10Description}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-500 mb-1">Grupo</div>
                                    <div className="text-gray-900">{selectedCie10Group || 'No especificado'}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-500 mb-1">Segmento</div>
                                    <div className="text-gray-900">{selectedCie10Segment || 'No especificado'}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Fechas y cálculos */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="start_date" value="Fecha de Inicio" required />
                            <TextInput
                                id="start_date"
                                type="date"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.start_date} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="end_date" value="Fecha de Fin" required />
                            <TextInput
                                id="end_date"
                                type="date"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                                className={`mt-1 block w-full ${!data.start_date ? 'bg-gray-100' : ''}`}
                                disabled={!data.start_date}
                                required
                            />
                            <InputError message={errors.end_date} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="absence_days" value="Días de Incapacidad" />
                            <TextInput
                                id="absence_days"
                                type="text"
                                value={data.absence_days}
                                className="mt-1 block w-full bg-gray-100"
                                readOnly
                            />
                            {calculationMessage && (
                                <p className="mt-2 text-sm text-blue-600">
                                    {calculationMessage}
                                </p>
                            )}
                            <InputError message={errors.absence_days} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="absence_value" value="Valor por ausentismo" />
                            <TextInput
                                id="absence_value"
                                type="text"
                                value={data.absence_value ? new Intl.NumberFormat('es-CO', {
                                    style: 'currency',
                                    currency: 'COP',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(data.absence_value) : ''}
                                className="mt-1 block w-full bg-gray-100"
                                readOnly
                            />
                            <InputError message={errors.absence_value} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="hours" value="Horas" required />
                        <TextInput
                            id="hours"
                            type="number"
                            step="0.5"
                            value={data.hours}
                            onChange={(e) => {
                                const hours = e.target.value;
                                // Validar que sea un número y no sea negativo
                                if (hours >= 0) {
                                    setData(prevData => ({
                                        ...prevData,
                                        hours: hours,
                                        end_date: data.start_date ? adjustEndDate(data.start_date, calculateDaysFromHours(hours)) : '',
                                        absence_days: calculateDaysFromHours(hours)
                                    }));
                                }
                            }}
                            className={`mt-1 block w-full ${!data.start_date ? 'bg-gray-100' : ''}`}
                            min="0"
                            disabled={!data.start_date}
                            required
                        />
                        <div className="mt-1 text-xs text-gray-500">
                            Ingrese las horas en incrementos de 0.5 (media hora)
                        </div>
                        <InputError message={errors.hours} className="mt-2" />
                    </div>

                    <div className="col-span-2">
                        <InputLabel htmlFor="description" value="Descripción" required />
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            rows="3"
                            required
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                </div>

                <div className="col-span-2 flex justify-end">
                    <PrimaryButton type="submit" disabled={processing}>
                        {processing ? 'Guardando...' : 'Guardar'}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
} 