<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MilkEntry extends Model
{
    protected $fillable = [
        'user_id',
        'customer_id',
        'entry_date',
        'milk_kg',
        'milk_grams',
        'amount',
        'notes',
    ];

    protected $casts = [
        'entry_date' => 'date',
        'milk_kg' => 'decimal:2',
        'amount' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
