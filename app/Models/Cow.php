<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cow extends Model
{
    protected $fillable = [
        'cow_number',
        'breed',
        'birth_date',
        'gender',
        'notes',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];
}
