<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = [
        'requested_user_id','requesting_user_id','content', 'image_id'
    ];
    // Category_nameをPost側で取得できるようにする
    // public function category(){
    //     // 投稿は１つのカテゴリーに属する
    //     return $this->belongsTo(Category::class,'category_id');
    // }

    // user_nameをPost側で取得できるようにする
    public function user(){
        // 投稿は１つのカテゴリーに属する
        return $this->belongsTo(User::class,'requesting_user_id');
    }
}
