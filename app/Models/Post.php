<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
    */
    protected $fillable = [
        'user_id','category_id','content', 'title'
    ];

    // Category_nameをPos側で取得できるようにする
    public function category(){
        // 投稿は１つのカテゴリーに属する
        return $this->belongsTo(Category::class,'category_id');
    }

    // user_nameをPos側で取得できるようにする
    public function user(){
        // 投稿は１つのカテゴリーに属する
        return $this->belongsTo(User::class,'user_id');
    }


}
