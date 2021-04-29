<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
    */
    protected $fillable = [
        'user_id','post_id','comment'
    ];

    // user_nameをPost側で取得できるようにする
    public function user(){
        // 投稿は１つのカテゴリーに属する
        return $this->belongsTo(User::class,'user_id');
    }
}
