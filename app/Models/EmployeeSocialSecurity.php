<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmployeeSocialSecurity extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'employee_social_security';

    protected $fillable = [
        'employee_id',
        'eps',
        'pension_fund',
        'arl',
        'compensation_fund',
        'blood_type_id',
        'version',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function bloodType()
    {
        return $this->belongsTo(BloodType::class);
    }
} 