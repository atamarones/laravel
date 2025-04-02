<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class City extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'department',
    ];

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    public function contactInformation(): HasMany
    {
        return $this->hasMany(ContactInformation::class);
    }
} 