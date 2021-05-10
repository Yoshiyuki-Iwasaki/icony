@extends('layouts.app')

@section('content')
<div class="card-header">{{$user->name}}</div>

<div class="card-body">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif
    <follow-component
    :user-id = "{{ json_encode($user->id) }}"
    :default-Followed = "{{ json_encode($defaultFollowed) }}"
    :default-Count = "{{ json_encode($defaultCount) }}"
    ></follow-component>
    <p>紹介文: {{$user->introduction}}</p>
    <p>メールアドレス: {{$user->email}}</p>
    <form method="GET" action="{{route('users.edit',$user->id)}}">
        @csrf
        <input class="btn btn-info" type="submit" value="アカウント編集">
    </form>
    <form method="POST" action="{{route('users.destroy',['id'=>$user->id])}}" id="delete_{{$user->id}}">
        @csrf
        <a href="#" class="btn btn-danger" data-id="{{$user->id}}" onclick="deletePost(this);">アカウント削除</a>
    </form>

    @foreach ($user->posts as $post)
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{$post->title}}</h5>
                <p class="card-title">
                    カテゴリー:
                    <a href="{{route('posts.index', ['category_id' => $post->category_id])}}">{{$post->category->category_name}}</a>
                </p>
                <p class="card-title">投稿者:
                    <a href="{{route('users.show', $post->user_id)}}">{{$post->user->name}}</a>
                </p>
                <p class="card-text">{{$post->content}}</p>
                <a href="{{route('posts.show',$post->id)}}" class="btn btn-primary">詳細</a>
            </div>
        </div>
    @endforeach
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
