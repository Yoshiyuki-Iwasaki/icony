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
    <figure class="user_avatar">
        @if($user->image == null)
            <img src="/storage/image/noimage.png">
        @else
            <img src="{{ asset('storage/image/'.$user->image) }}">
        @endif
    </figure>
    <p>紹介文: {{$user->introduction}}</p>
    <p>メールアドレス: {{$user->email}}</p>
    @if(Auth::id() === $user->id)
        <form method="GET" action="{{route('users.edit',$user->id)}}">
            @csrf
            <input class="btn btn-info" type="submit" value="アカウント編集">
        </form>
        {{-- <form method="POST" action="{{route('users.destroy',['id'=>$user->id])}}" id="delete_{{$user->id}}">
            @csrf
            <a href="#" class="btn btn-danger" data-id="{{$user->id}}" onclick="deletePost(this);">アカウント削除</a>
        </form> --}}
    @else
        <a href="{{route('orders.create',['user'=>$user->id])}}" class="btn btn-info">新規リクエスト</a>
    @endif

    <div class="card p-order">
        <p class="card-header">作品</p>
        <div class="card-body">
            <order-list
            :orders="{{ json_encode($user->orders) }}"
            ></order-list>
        </div>
    </div>

    <div class="card p-order">
        <p class="card-header">送信したリクエスト</p>
        <div class="card-body">
            <order-list
            :orders="{{ json_encode($user->orders_me) }}"
            ></order-list>
        </div>
    </div>
</div>

@endsection
