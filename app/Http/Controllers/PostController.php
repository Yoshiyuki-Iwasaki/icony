<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Models\Tag;
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
            $posts->load('category','user','tags');
            // view側で$post変数を使用可能にする。
            return view('posts.index',[
                'posts' => $posts,
                'category_id' => $q['category_id'],
                ]);
        }elseif(isset($q['tag_name'])) {
            //投稿取得
            $posts = Post::latest()->where('content', 'like', "%{$q['tag_name']}%")->paginate(5);
            // Postモデル内のcategoryメソッドとUserモデル内のuserメソッドをloadする
            $posts->load('category','user','tags');
            // view側で$post変数を使用可能にする。
            return view('posts.index',[
                'posts' => $posts,
                'tag_name' => $q['tag_name'],
                ]);
        } else {
            //投稿取得
            $posts = Post::latest()->paginate(5);
            // Postモデル内のcategoryメソッドとUserモデル内のuserメソッドをloadする
            $posts->load('category','user','tags');
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
        if($request->file('image')->isValid()) {
            $post = new Post;
            $post->user_id = $request->user_id;
            $post->category_id = $request->category_id;
            $post->content = $request->content;
            $post->title = $request->title;
            $filename = $request->file('image')->store('public/image');
            $post->image = basename($filename);

            // contentからtagを取り出す
            preg_match_all('/#([a-zA-Z0-9０-９ぁ-んァ-ヶー一-龠]+)/u', $request->content, $match);
            $tags = [];
            foreach($match[1] as $tag) {
                $found = Tag::firstOrCreate(['tag_name' => $tag]);
                array_push($tags, $found);
            }
            $tags_ids =[];
            foreach($tags as $tag) {
                array_push($tags_ids, $tag['id']);
            }
            $post->save();
            $post->tags()->attach($tags_ids);
        }
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
