<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Eps extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'mobility_code',
        'nit',
        'regime',
        'version',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
} 