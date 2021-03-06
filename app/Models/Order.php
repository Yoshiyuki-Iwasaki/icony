<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = [
        'requested_user_id','requesting_user_id','content','category_id','talkroom_id'
    ];

    // user_nameをPost側で取得できるようにする
    public function requested_user(){
        // 投稿は１つのカテゴリーに属する
        return $this->belongsTo(User::class,'requested_user_id','id');
    }

    public function requesting_user(){
        // 投稿は１つのカテゴリーに属する
        return $this->belongsTo(User::class,'requesting_user_id','id');
    }

        // Category_nameをPost側で取得できるようにする
    public function category(){
        // 投稿は１つのカテゴリーに属する
        return $this->belongsTo(Category::class,'category_id');
    }

    public function comment(){
        return $this->hasMany(Comment::class);
    }

    public function likes(){
        return $this->hasMany(Likes::class);
    }

    public function image(){
        // 投稿は１つのカテゴリーに属する
        return $this->hasMany(Image::class);
    }
}
