<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    public function order(){
        // 投稿は１つのカテゴリーに属する
        return $this->belongsToMany(Order::class,'order_id');
    }
}
