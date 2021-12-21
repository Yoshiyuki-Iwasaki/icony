<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;

class LikesController extends Controller
{

    public function index()
{
    $like = Like::all();
    return $like->load('order_id','user_id');
}

    public function store(Request $request)
{
    $like = Like::create($request->all());
    return $like
    ? response()->json($like,201)
    : response()->json([],500);
    // return dd($like);
}

    public function destroy(Like $like)
    {
        // return dd($like);
        return $like->delete()
        ? response()->json($like)
        : response()->json([],500);
    }

}
