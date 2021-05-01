<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Models\Post;
use Prophecy\Doubler\Generator\Node\ReturnTypeNode;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $q = \Request::query();
        if(isset($q['category_id'])) {
            //投稿取得
            $posts = Post::latest()->where('category_id', $q['category_id'])->paginate(5);
            // Postモデル内のcategoryメソッドとUserモデル内のuserメソッドをloadする
            $posts->load('category','user');
            // view側で$post変数を使用可能にする。
            return view('posts.index',[
                'posts' => $posts,
                'category_id' => $q['category_id'],
                ]);
        } else {
            //投稿取得
            $posts = Post::latest()->paginate(5);
            // Postモデル内のcategoryメソッドとUserモデル内のuserメソッドをloadする
            $posts->load('category','user');
            // view側で$post変数を使用可能にする。
            return view('posts.index',['posts' => $posts]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('posts.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request)
    {
        $post = new Post;
        // model内で$fillableに指定している項目のみ保存の対象としている。
        $input = $request->only($post->getFillable());
        $post = $post->create($input);
        return redirect('/');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        // Postモデル内のcategoryメソッドとUserモデル内のuserメソッドをloadする
        $post->load('category','user','comments.user');
        // view側で$post変数を使用可能にする。
        return view('posts.show',['post' => $post]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function search(Request $request) {
        $posts = Post::where('title', 'like', "%{$request->search}%")
        ->orWhere('content', 'like', "%{$request->search}%")
        ->paginate(5);

        $search_result = $request->search.'の検索機能'.$posts->total().'件';

        return view('posts.index',[
            'posts' => $posts,
            'search_result' => $search_result,
            'search_query' => $request->search
        ]);
    }
}
