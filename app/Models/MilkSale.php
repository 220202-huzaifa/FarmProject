<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MilkSale extends Model
{
    protected $fillable = [
        'sale_date',
        'milk_kg',
        'sale_amount',
        'notes',
    ];

    protected $casts = [
        'sale_date' => 'date',
        'milk_kg' => 'decimal:2',
        'sale_amount' => 'decimal:2',
    ];
}
