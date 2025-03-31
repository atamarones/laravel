<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BankAccount extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'employee_id',
        'bank',
        'account_type',
        'account_number'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
} 