<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Uniform extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'employee_id',
        'shirt',
        't_shirt',
        'pants',
        'shoes',
        'version',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected $casts = [
        'pants' => 'integer',
        'shoes' => 'integer',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
} 