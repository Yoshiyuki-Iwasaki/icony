<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\FollowUser;
use Illuminate\Support\Facades\Auth; //追加

class FollowUserController extends Controller
{

    private $user;

    public function follow(User $user, Request $request) {
        $follow = FollowUser::create([
            'following_user_id' => Auth::id(),
            'followed_user_id' => $request->id,
        ]);
        $followCount = count(FollowUser::where('followed_user_id', $request->id)->get());
        return response()->json(['followCount' => $followCount]);
    }

    public function unfollow(User $user, Request $request) {
        $follow = FollowUser::where('following_user_id', Auth::id())->where('followed_user_id', $request->id)->first();
        $follow->delete();
        $followCount = count(FollowUser::where('followed_user_id', $request->id)->get());

        return response()->json(['followCount' => $followCount]);
    }
}
