<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class SocialSecurity extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'employee_id',
        'eps',
        'pension_fund',
        'arl',
        'compensation_fund',
        'blood_type_id',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function bloodType(): BelongsTo
    {
        return $this->belongsTo(BloodType::class);
    }
} 