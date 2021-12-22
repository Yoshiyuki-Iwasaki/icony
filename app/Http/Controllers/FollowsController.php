<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Follow;

class FollowsController extends Controller
{

    public function index()
{
    $follow = Follow::all();
    return $follow->load('following_user_id', 'followed_user_id');
}

    public function store(Request $request)
{
    $follow = Follow::create($request->all());
    return $follow
    ? response()->json($follow,201)
    : response()->json([],500);
}

    public function destroy(Follow $follow)
    {
        return $follow->delete()
        ? response()->json($follow)
        : response()->json([],500) ;
    }
}
