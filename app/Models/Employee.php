<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
        'eps_id',
        'version',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'start_date' => 'date',
        'end_date' => 'date',
        'height' => 'decimal:2',
        'weight' => 'decimal:2',
    ];

    // Relaciones
    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class);
    }

    public function collaboratorType(): BelongsTo
    {
        return $this->belongsTo(CollaboratorType::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function terminationReason()
    {
        return $this->belongsTo(TerminationReason::class);
    }

    public function gender(): BelongsTo
    {
        return $this->belongsTo(Gender::class);
    }

    public function civilStatus(): BelongsTo
    {
        return $this->belongsTo(CivilStatus::class);
    }

    public function salary(): HasOne
    {
        return $this->hasOne(Salary::class);
    }

    public function bankAccount(): HasOne
    {
        return $this->hasOne(BankAccount::class);
    }

    public function emergencyContact(): HasOne
    {
        return $this->hasOne(EmergencyContact::class);
    }

    public function uniform(): HasOne
    {
        return $this->hasOne(Uniform::class);
    }

    public function observations()
    {
        return $this->hasMany(Observation::class);
    }

    public function contactInformation(): HasOne
    {
        return $this->hasOne(ContactInformation::class);
    }

    public function socialSecurity(): HasOne
    {
        return $this->hasOne(SocialSecurity::class);
    }

    public function eps(): BelongsTo
    {
        return $this->belongsTo(Eps::class);
    }
} 