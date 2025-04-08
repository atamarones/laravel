<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Absence extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'employee_id',
        'absence_type_id',
        'eps_id',
        'cie10_id',
        'start_date',
        'end_date',
        'hours',
        'absence_days',
        'absence_value',
        'description'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'hours' => 'float',
        'absence_days' => 'float',
        'absence_value' => 'decimal:2'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function absenceType()
    {
        return $this->belongsTo(AbsenceType::class);
    }

    public function eps()
    {
        return $this->belongsTo(Eps::class);
    }

    public function cie10()
    {
        return $this->belongsTo(Cie10::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($absence) {
            if (empty($absence->absence_days)) {
                $absence->absence_days = $absence->start_date->diffInDays($absence->end_date) + 1;
            }
        });
    }
}
