<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'name',
        'introduction',
        'image',
        'email',
        'password',
    ];

       /**
     * The attributes that are gureded
     * @var array
     */
    protected $guarded = [
        'role'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function orders(){
        return $this->hasMany(\App\Models\Order::class,'requested_user_id','id');
    }

    public function orders_me(){
        return $this->hasMany(\App\Models\Order::class,'requesting_user_id','id');
    }

     // フォロワー→フォロー
    public function followUsers()
    {
        return $this->belongsToMany('App\Models\User', 'follows', 'followed_user_id', 'following_user_id');
    }

    // フォロー→フォロワー
    public function follows()
    {
        return $this->belongsToMany('App\Models\User', 'follows', 'following_user_id', 'followed_user_id');
    }
}
