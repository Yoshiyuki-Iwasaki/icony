@extends('layouts.app')

@section('content')
<div class="card-header">Board</div>
<div class="card-body">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif

    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{$post->title}}</h5>
            <p class="card-title">カテゴリー: <a href="{{route('posts.index', ['category_id' => $post->category_id])}}">{{$post->category->category_name}}</a></p>
            <p class="card-title">投稿者: <a href="{{route('users.show', $post->user_id)}}">{{$post->user->name}}</a></p>
            <p class="card-text">{{$post->content}}</p>
            <img src="{{asset('storage/image/'.$post->image)}}" alt="">
            <form method="GET" action="{{route('posts.edit',$post->id)}}">
                @csrf
                <input class="btn btn-info" type="submit" value="投稿編集">
            </form>
            <form method="POST" action="{{route('posts.destroy',$post->id)}}" id="delete_{{$post->id}}">
                @csrf
                <a href="#" class="btn btn-danger" data-id="{{$post->id}}" onclick="deletePost(this);">投稿削除</a>
            </form>
        </div>
    </div>
</div>

<script>
    function deletePost(e){
        'use strict';
        if(confirm('本当に削除していいですか？')){
            document.getElementById('delete_' + e.dataset.id).submit();
        }
    }
</script>

@endsection
