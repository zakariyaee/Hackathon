<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'team_name',
        'member_count',
        'project_idea',
        'leader_name',
        'email',
        'phone',
        'status',
        'tracking_number',
    ];
}
