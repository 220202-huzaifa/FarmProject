<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PendingPayment extends Model
{
    protected $fillable = [
        'user_id',
        'customer_name',
        'payment_date',
        'quantity',
        'amount',
        'notes',
    ];

    protected $casts = [
        'payment_date' => 'date',
        'quantity' => 'decimal:2',
        'amount' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
