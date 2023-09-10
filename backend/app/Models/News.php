<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    function categories()
    {
        return $this->hasMany(NewsCategory::class);
    }

    function source()
    {
        return $this->belongsTo(Source::class);
    }

    function author()
    {
        return $this->belongsTo(Author::class);
    }
}
