<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'total_amount',
        'total_entries',
        'last_payment_date',
        'notes',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'last_payment_date' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function milkEntries(): HasMany
    {
        return $this->hasMany(MilkEntry::class);
    }

    public function updateTotals()
    {
        $this->total_entries = $this->milkEntries()->count();
        $this->total_amount = $this->milkEntries()->sum('amount');
        $this->last_payment_date = $this->milkEntries()->max('entry_date');
        $this->save();
    }
}
