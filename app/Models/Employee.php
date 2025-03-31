<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'full_name',
        'identification_number',
        'birth_date',
        'birth_place',
        'gender_id',
        'civil_status_id',
        'height',
        'weight',
        'start_date',
        'end_date',
        'termination_reason_id',
        'position_id',
        'collaborator_type_id',
        'city_id',
        'version',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected $casts = [
        'birth_date' => 'datetime',
        'start_date' => 'datetime',
        'end_date' => 'date',
    ];

    // Relaciones
    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    public function collaboratorType()
    {
        return $this->belongsTo(CollaboratorType::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function terminationReason()
    {
        return $this->belongsTo(TerminationReason::class);
    }

    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }

    public function civilStatus()
    {
        return $this->belongsTo(CivilStatus::class);
    }

    public function salary()
    {
        return $this->hasOne(Salary::class);
    }

    public function bankAccount()
    {
        return $this->hasOne(BankAccount::class);
    }

    public function emergencyContact()
    {
        return $this->hasOne(EmergencyContact::class);
    }

    public function uniform()
    {
        return $this->hasOne(Uniform::class);
    }

    public function observations()
    {
        return $this->hasMany(Observation::class);
    }

    public function contactInformation()
    {
        return $this->hasOne(EmployeeContactInformation::class);
    }

    public function socialSecurity()
    {
        return $this->hasOne(EmployeeSocialSecurity::class);
    }
} 