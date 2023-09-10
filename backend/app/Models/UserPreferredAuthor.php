<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreferredAuthor extends Model
{
    use HasFactory;

    function author()
    {
        return $this->belongsTo(Author::class);
    }
}
