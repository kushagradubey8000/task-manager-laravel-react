<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // Mass-assignable fields
    protected $fillable = [
        'title',
        'description',
        'status',      // pending | in_progress | completed
        'priority',    // low | medium | high
        'due_date',
    ];

    protected $casts = [
        'due_date' => 'date',
    ];
}
