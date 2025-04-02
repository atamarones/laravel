<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactInformation extends Model
{
    protected $fillable = [
        'employee_id',
        'address',
        'phone',
        'email',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
} 