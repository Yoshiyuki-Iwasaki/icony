<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentsController extends Controller
{
    public function index()
{
    $comment = Comment::all();
    return $comment->load('order_id','user_id');
}

    public function store(Request $request)
{
    $comment = Comment::create($request->all());
    return $comment
    ? response()->json($comment,201)
    : response()->json([],500);
}

    public function destroy(Comment $comment)
    {
        return $comment->delete()
        ? response()->json($comment)
        : response()->json([],500) ;
    }

}
