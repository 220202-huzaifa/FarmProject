<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MilkProduction extends Model
{
    protected $fillable = [
        'production_date',
        'milk_kg',
        'notes',
    ];

    protected $casts = [
        'production_date' => 'date',
        'milk_kg' => 'decimal:2',
    ];
}
