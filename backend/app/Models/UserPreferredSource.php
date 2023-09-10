<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreferredSource extends Model
{
    use HasFactory;

    function source()
    {
        return $this->belongsTo(Source::class);
    }
}
