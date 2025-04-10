<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'department';

    protected $fillable = [
        'name'
    ];

    /**
     * Get the cities for the department.
     */
    public function cities(): HasMany
    {
        return $this->hasMany(City::class);
    }
} 