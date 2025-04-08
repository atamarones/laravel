import { useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';
import { Button } from '@material-tailwind/react';

export default function EmployeeForm({ 
    employee = null,
    genders = [],
    civilStatuses = [],
    positions = [],
    collaboratorTypes = [],
    cities = [],
    bloodTypes = [],
    epsList = [],
    className = '' 
}) {
    // Transformar las opciones al formato correcto para el componente Select
    const genderOptions = genders.map(gender => ({ value: gender.id, label: gender.name }));
    const civilStatusOptions = civilStatuses.map(status => ({ value: status.id, label: status.name }));
    const positionOptions = positions.map(position => ({ value: position.id, label: position.name }));
    const collaboratorTypeOptions = collaboratorTypes.map(type => ({ value: type.id, label: type.name }));
    const cityOptions = cities.map(city => ({ value: city.id, label: city.name }));
    const bloodTypeOptions = bloodTypes.map(type => ({ value: type.id, label: type.name }));
    const epsOptions = epsList.map(eps => ({ value: eps.id, label: eps.name }));

    // Opciones para los otros selectores
    const bankOptions = [
        'Bancolombia', 'Davivienda', 'BBVA', 'Banco de Bogotá', 'Banco de Occidente'
    ].map(bank => ({ value: bank, label: bank }));

    const accountTypeOptions = [
        { value: 'Ahorros', label: 'Ahorros' },
        { value: 'Corriente', label: 'Corriente' }
    ];

    const relationshipOptions = [
        'Padre', 'Madre', 'Hermano/a', 'Esposo/a', 'Hijo/a'
    ].map(rel => ({ value: rel, label: rel }));

    const shirtSizeOptions = [
        'XS', 'S', 'M', 'L', 'XL', 'XXL'
    ].map(size => ({ value: size, label: size }));

    const { data, setData, post, put, processing, errors, reset } = useForm({
        full_name: employee?.full_name || '',
        identification_number: employee?.identification_number || '',
        birth_date: employee?.birth_date ? new Date(employee.birth_date).toISOString().split('T')[0] : '',
        birth_place: employee?.birth_place || '',
        gender_id: employee?.gender?.id || '',
        civil_status_id: employee?.civil_status?.id || '',
        height: employee?.height || '',
        weight: employee?.weight || '',
        start_date: employee?.start_date ? new Date(employee.start_date).toISOString().split('T')[0] : '',
        position_id: employee?.position?.id || '',
        collaborator_type_id: employee?.collaborator_type?.id || '',
        city_id: employee?.city?.id || '',
        eps_id: employee?.eps?.id || '',
        
        // Información de contacto
        address: employee?.contact_information?.address || '',
        phone: employee?.contact_information?.phone || '',
        email: employee?.contact_information?.email || '',

        // Seguridad social
        pension_fund: employee?.social_security?.pension_fund || '',
        arl: employee?.social_security?.arl || '',
        compensation_fund: employee?.social_security?.compensation_fund || '',
        blood_type_id: employee?.social_security?.blood_type?.id || '',

        // Salario
        salary: employee?.salary?.salary || '',
        salary_exclusion: employee?.salary?.salary_exclusion || '',

        // Cuenta bancaria
        bank: employee?.bank_account?.bank || '',
        account_type: employee?.bank_account?.account_type || '',
        account_number: employee?.bank_account?.account_number || '',

        // Contacto de emergencia
        contact_name: employee?.emergency_contact?.contact_name || '',
        relationship: employee?.emergency_contact?.relationship || '',
        contact_phone: employee?.emergency_contact?.contact_phone || '',
        contact_address: employee?.emergency_contact?.contact_address || '',

        // Uniforme
        shirt: employee?.uniform?.shirt || '',
        t_shirt: employee?.uniform?.t_shirt || '',
        pants: employee?.uniform?.pants || '',
        shoes: employee?.uniform?.shoes || '',
    });

    useEffect(() => {
        if (employee) {
            setData({
                full_name: employee.full_name || '',
                identification_number: employee.identification_number || '',
                birth_date: employee.birth_date ? new Date(employee.birth_date).toISOString().split('T')[0] : '',
                birth_place: employee.birth_place || '',
                gender_id: employee.gender?.id || '',
                civil_status_id: employee.civil_status?.id || '',
                height: employee.height || '',
                weight: employee.weight || '',
                start_date: employee.start_date ? new Date(employee.start_date).toISOString().split('T')[0] : '',
                position_id: employee.position?.id || '',
                collaborator_type_id: employee.collaborator_type?.id || '',
                city_id: employee.city?.id || '',
                eps_id: employee.eps?.id || '',
                
                // Información de contacto
                address: employee.contact_information?.address || '',
                phone: employee.contact_information?.phone || '',
                email: employee.contact_information?.email || '',

                // Seguridad social
                pension_fund: employee.social_security?.pension_fund || '',
                arl: employee.social_security?.arl || '',
                compensation_fund: employee.social_security?.compensation_fund || '',
                blood_type_id: employee.social_security?.blood_type?.id || '',

                // Salario
                salary: employee.salary?.salary || '',
                salary_exclusion: employee.salary?.salary_exclusion || '',

                // Cuenta bancaria
                bank: employee.bank_account?.bank || '',
                account_type: employee.bank_account?.account_type || '',
                account_number: employee.bank_account?.account_number || '',

                // Contacto de emergencia
                contact_name: employee.emergency_contact?.contact_name || '',
                relationship: employee.emergency_contact?.relationship || '',
                contact_phone: employee.emergency_contact?.contact_phone || '',
                contact_address: employee.emergency_contact?.contact_address || '',

                // Uniforme
                shirt: employee.uniform?.shirt || '',
                t_shirt: employee.uniform?.t_shirt || '',
                pants: employee.uniform?.pants || '',
                shoes: employee.uniform?.shoes || '',
            });
            console.log('Employee data:', employee);
        }
    }, [employee]);

    const submit = (e) => {
        e.preventDefault();

        if (employee) {
            put(route('employees.update', employee.id));
        } else {
            post(route('employees.store'));
        }
    };

    return (
        <form onSubmit={submit} className={className}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Información básica */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información Básica</h3>
                    
                    <div className="mb-4">
                        <InputLabel htmlFor="full_name" value="Nombre Completo" />
                        <TextInput
                            id="full_name"
                            type="text"
                            name="full_name"
                            value={data.full_name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            onChange={(e) => setData('full_name', e.target.value)}
                        />
                        <InputError message={errors.full_name} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="identification_number" value="Número de Identificación" />
                        <TextInput
                            id="identification_number"
                            type="text"
                            name="identification_number"
                            value={data.identification_number}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            onChange={(e) => setData('identification_number', e.target.value)}
                        />
                        <InputError message={errors.identification_number} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="birth_date" value="Fecha de Nacimiento" />
                        <TextInput
                            id="birth_date"
                            type="date"
                            name="birth_date"
                            value={data.birth_date}
                            className="mt-1 block w-full"
                            autoComplete="bday"
                            onChange={(e) => setData('birth_date', e.target.value)}
                        />
                        <InputError message={errors.birth_date} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="birth_place" value="Lugar de Nacimiento" />
                        <TextInput
                            id="birth_place"
                            type="text"
                            name="birth_place"
                            value={data.birth_place}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            onChange={(e) => setData('birth_place', e.target.value)}
                        />
                        <InputError message={errors.birth_place} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="gender_id" value="Género" />
                        <Select
                            id="gender_id"
                            name="gender_id"
                            value={data.gender_id}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('gender_id', e.target.value)}
                            options={genderOptions}
                            placeholder="Seleccione un género"
                        />
                        <InputError message={errors.gender_id} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="civil_status_id" value="Estado Civil" />
                        <Select
                            id="civil_status_id"
                            name="civil_status_id"
                            value={data.civil_status_id}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('civil_status_id', e.target.value)}
                            options={civilStatusOptions}
                            placeholder="Seleccione un estado civil"
                        />
                        <InputError message={errors.civil_status_id} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <InputLabel htmlFor="height" value="Altura (m)" />
                            <TextInput
                                id="height"
                                type="number"
                                name="height"
                                value={data.height}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('height', e.target.value)}
                                step="0.01"
                            />
                            <InputError message={errors.height} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="weight" value="Peso (kg)" />
                            <TextInput
                                id="weight"
                                type="number"
                                name="weight"
                                value={data.weight}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('weight', e.target.value)}
                                step="0.01"
                            />
                            <InputError message={errors.weight} className="mt-2" />
                        </div>
                    </div>
                </div>

                {/* Información laboral */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información Laboral</h3>

                    <div className="mb-4">
                        <InputLabel htmlFor="start_date" value="Fecha de Inicio" />
                        <TextInput
                            id="start_date"
                            type="date"
                            name="start_date"
                            value={data.start_date}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('start_date', e.target.value)}
                        />
                        <InputError message={errors.start_date} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="position_id" value="Cargo" />
                        <Select
                            id="position_id"
                            name="position_id"
                            value={data.position_id}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('position_id', e.target.value)}
                            options={positionOptions}
                            placeholder="Seleccione un cargo"
                        />
                        <InputError message={errors.position_id} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="collaborator_type_id" value="Tipo de Colaborador" />
                        <Select
                            id="collaborator_type_id"
                            name="collaborator_type_id"
                            value={data.collaborator_type_id}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('collaborator_type_id', e.target.value)}
                            options={collaboratorTypeOptions}
                            placeholder="Seleccione un tipo de colaborador"
                        />
                        <InputError message={errors.collaborator_type_id} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="city_id" value="Ciudad" />
                        <Select
                            id="city_id"
                            name="city_id"
                            value={data.city_id}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('city_id', e.target.value)}
                            options={cityOptions}
                            placeholder="Seleccione una ciudad"
                        />
                        <InputError message={errors.city_id} className="mt-2" />
                    </div>
                </div>

                {/* Información de contacto */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información de Contacto</h3>

                    <div className="mb-4">
                        <InputLabel htmlFor="address" value="Dirección" />
                        <TextInput
                            id="address"
                            type="text"
                            name="address"
                            value={data.address}
                            className="mt-1 block w-full"
                            autoComplete="street-address"
                            onChange={(e) => setData('address', e.target.value)}
                        />
                        <InputError message={errors.address} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="phone" value="Teléfono" />
                        <TextInput
                            id="phone"
                            type="tel"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            autoComplete="tel"
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="email" value="Correo Electrónico" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                </div>

                {/* Seguridad social */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Seguridad Social</h3>

                    <div className="mb-4">
                        <InputLabel htmlFor="eps_id" value="EPS" required />
                        <Select
                            id="eps_id"
                            name="eps_id"
                            value={data.eps_id}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('eps_id', e.target.value)}
                            options={epsOptions}
                            placeholder="Seleccione una EPS"
                            required
                        />
                        <InputError message={errors.eps_id} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="pension_fund" value="Fondo de Pensiones" required />
                        <TextInput
                            id="pension_fund"
                            type="text"
                            name="pension_fund"
                            value={data.pension_fund}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('pension_fund', e.target.value)}
                            required
                        />
                        <InputError message={errors.pension_fund} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="arl" value="ARL" />
                        <TextInput
                            id="arl"
                            type="text"
                            name="arl"
                            value={data.arl}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('arl', e.target.value)}
                        />
                        <InputError message={errors.arl} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="compensation_fund" value="Caja de Compensación" />
                        <TextInput
                            id="compensation_fund"
                            type="text"
                            name="compensation_fund"
                            value={data.compensation_fund}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('compensation_fund', e.target.value)}
                        />
                        <InputError message={errors.compensation_fund} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="blood_type_id" value="Tipo de Sangre" />
                        <Select
                            id="blood_type_id"
                            name="blood_type_id"
                            value={data.blood_type_id}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('blood_type_id', e.target.value)}
                            options={bloodTypeOptions}
                            placeholder="Seleccione un tipo de sangre"
                        />
                        <InputError message={errors.blood_type_id} className="mt-2" />
                    </div>
                </div>

                {/* Información bancaria y salarial */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información Bancaria y Salarial</h3>

                    <div className="mb-4">
                        <InputLabel htmlFor="salary" value="Salario" />
                        <TextInput
                            id="salary"
                            type="number"
                            name="salary"
                            value={data.salary}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('salary', e.target.value)}
                            step="0.01"
                        />
                        <InputError message={errors.salary} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="salary_exclusion" value="Exclusión Salarial" />
                        <TextInput
                            id="salary_exclusion"
                            type="number"
                            name="salary_exclusion"
                            value={data.salary_exclusion}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('salary_exclusion', e.target.value)}
                            step="0.01"
                        />
                        <InputError message={errors.salary_exclusion} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="bank" value="Banco" />
                        <Select
                            id="bank"
                            name="bank"
                            value={data.bank}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('bank', e.target.value)}
                            options={bankOptions}
                            placeholder="Seleccione un banco"
                        />
                        <InputError message={errors.bank} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="account_type" value="Tipo de Cuenta" />
                        <Select
                            id="account_type"
                            name="account_type"
                            value={data.account_type}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('account_type', e.target.value)}
                            options={accountTypeOptions}
                            placeholder="Seleccione un tipo de cuenta"
                        />
                        <InputError message={errors.account_type} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="account_number" value="Número de Cuenta" />
                        <TextInput
                            id="account_number"
                            type="text"
                            name="account_number"
                            value={data.account_number}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('account_number', e.target.value)}
                        />
                        <InputError message={errors.account_number} className="mt-2" />
                    </div>
                </div>

                {/* Contacto de emergencia */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Contacto de Emergencia</h3>

                    <div className="mb-4">
                        <InputLabel htmlFor="contact_name" value="Nombre del Contacto" />
                        <TextInput
                            id="contact_name"
                            type="text"
                            name="contact_name"
                            value={data.contact_name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('contact_name', e.target.value)}
                        />
                        <InputError message={errors.contact_name} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="relationship" value="Parentesco" />
                        <Select
                            id="relationship"
                            name="relationship"
                            value={data.relationship}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('relationship', e.target.value)}
                            options={relationshipOptions}
                            placeholder="Seleccione un parentesco"
                        />
                        <InputError message={errors.relationship} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="contact_phone" value="Teléfono del Contacto" />
                        <TextInput
                            id="contact_phone"
                            type="text"
                            name="contact_phone"
                            value={data.contact_phone}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('contact_phone', e.target.value)}
                        />
                        <InputError message={errors.contact_phone} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="contact_address" value="Dirección del Contacto" />
                        <TextInput
                            id="contact_address"
                            type="text"
                            name="contact_address"
                            value={data.contact_address}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('contact_address', e.target.value)}
                        />
                        <InputError message={errors.contact_address} className="mt-2" />
                    </div>
                </div>

                {/* Uniforme */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Uniforme</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <InputLabel htmlFor="shirt" value="Talla de Camisa" />
                            <Select
                                id="shirt"
                                name="shirt"
                                value={data.shirt}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('shirt', e.target.value)}
                                options={shirtSizeOptions}
                                placeholder="Seleccione una talla"
                            />
                            <InputError message={errors.shirt} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="t_shirt" value="Talla de Camiseta" />
                            <Select
                                id="t_shirt"
                                name="t_shirt"
                                value={data.t_shirt}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('t_shirt', e.target.value)}
                                options={shirtSizeOptions}
                                placeholder="Seleccione una talla"
                            />
                            <InputError message={errors.t_shirt} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <InputLabel htmlFor="pants" value="Talla de Pantalón" />
                            <TextInput
                                id="pants"
                                type="number"
                                name="pants"
                                value={data.pants}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('pants', e.target.value)}
                                min="28"
                                max="44"
                            />
                            <InputError message={errors.pants} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="shoes" value="Talla de Zapatos" />
                            <TextInput
                                id="shoes"
                                type="number"
                                name="shoes"
                                value={data.shoes}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('shoes', e.target.value)}
                                min="35"
                                max="45"
                            />
                            <InputError message={errors.shoes} className="mt-2" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
                <Button
                    type="submit"
                    disabled={processing}
                    className="bg-primary-600 hover:bg-primary-700"
                >
                    {employee ? 'Actualizar' : 'Crear'} Empleado
                </Button>

                <Link href={route('employees.index')}>
                    <Button
                        type="button"
                        variant="outlined"
                        color="gray"
                        className="border-gray-300 text-gray-700 hover:border-gray-400"
                    >
                        Cancelar
                    </Button>
                </Link>
            </div>
        </form>
    );
} 