<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'id','order_id','user_id','content'
    ];

        // Category_nameをPost側で取得できるようにする
    public function order_id(){
        // 投稿は１つのカテゴリーに属する
        return $this->belongsTo(Order::class,'order_id','id');
    }

    public function user_id(){
        // 投稿は１つのカテゴリーに属する
        return $this->belongsTo(User::class,'user_id','id');
    }
}
