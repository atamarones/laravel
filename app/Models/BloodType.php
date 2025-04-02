<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BloodType extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    public function employeeSocialSecurities()
    {
        return $this->hasMany(EmployeeSocialSecurity::class);
    }

    public function socialSecurities(): HasMany
    {
        return $this->hasMany(SocialSecurity::class);
    }
} 