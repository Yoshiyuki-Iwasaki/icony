<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    protected $fillable = ['following_user_id', 'followed_user_id'];

    protected $table = 'follow_users';
}
