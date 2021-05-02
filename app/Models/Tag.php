<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'tag_name'
    ];

    public function posts(){
        // 投稿は１つのカテゴリーに属する
        return $this->belongsToMany(Post::class);
    }
}
