<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    protected $fillable = ['following_user_id', 'followed_user_id'];

    protected $table = 'follows';

    public function following_user_id(){
        // 投稿は１つのカテゴリーに属する
        return $this->belongsTo(User::class,'following_user_id','id');
    }
    public function followed_user_id(){
        // 投稿は１つのカテゴリーに属する
        return $this->belongsTo(User::class,'followed_user_id','id');
    }
}
