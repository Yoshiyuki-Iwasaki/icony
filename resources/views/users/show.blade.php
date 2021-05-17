@extends('layouts.app')

@section('content')
<div class="card-header">{{$user->name}}</div>

<div class="card-body">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif
    <follow
    :myuser-id="{{ json_encode(Auth::id()) }}"
    :user-id="{{ json_encode($user->id) }}"
    :default-Followed="{{ json_encode($defaultFollowed) }}"
    :default-Count="{{ json_encode($defaultCount) }}"
    ></follow>
    <p>紹介文: {{$user->introduction}}</p>
    <p>メールアドレス: {{$user->email}}</p>
    <a href="{{route('orders.create',['user'=>$user->id])}}" class="btn btn-info">新規リクエスト</a>
    @if(Auth::id() === $user->id)
        <form method="GET" action="{{route('users.edit',$user->id)}}">
            @csrf
            <input class="btn btn-info" type="submit" value="アカウント編集">
        </form>
        <form method="POST" action="{{route('users.destroy',['id'=>$user->id])}}" id="delete_{{$user->id}}">
            @csrf
            <a href="#" class="btn btn-danger" data-id="{{$user->id}}" onclick="deletePost(this);">アカウント削除</a>
        </form>
    @endif

    @foreach ($user->orders as $order)
        <div class="card">
            <div class="card-body">
                <p class="card-title">依頼者:
                    <a href="{{route('users.show', $order->requesting_user_id)}}">{{$order->user->name}}</a>
                </p>
                <p class="card-text">{{$order->content}}</p>
                <a href="{{route('orders.show',$order->requesting_user_id)}}" class="btn btn-primary">詳細</a>
            </div>
        </div>
    @endforeach
</div>

{{-- <script>
    function deletePost(e){
        'use strict';
        if(confirm('本当に削除していいですか？')){
            document.getElementById('delete_' + e.dataset.id).submit();
        }
    }
</script> --}}

@endsection
