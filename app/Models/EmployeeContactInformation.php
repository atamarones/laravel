<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmployeeContactInformation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'employee_id',
        'address',
        'phone',
        'email',
        'version',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
} 