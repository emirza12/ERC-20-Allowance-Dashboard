<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Allowance extends Model
{
    protected $fillable = [
        'contract_address',
        'owner_address',
        'spender_address',
        'allowance_amount'
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::created(function ($allowance) {
            \Log::info('New allowance created:', $allowance->toArray());
        });
        
        static::updated(function ($allowance) {
            \Log::info('Allowance updated:', $allowance->toArray());
        });
    }
} 