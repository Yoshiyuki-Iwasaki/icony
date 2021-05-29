@extends('layouts.app')

@section('content')
<div class="card-header">作品詳細</div>
<div class="card-body">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif

    <div class="card">
        <div class="card-body">
            <figure class="user_avatar">
                @if($order->requested_user->image == null)
                    <img src="/storage/image/noimage.png">
                @else
                    <img src="{{ asset('storage/image/'.$order->requested_user->image) }}">
                @endif
            </figure>
            <p class="card-text">依頼者: <a href="{{route('users.show', $order->requesting_user_id)}}">{{$order->requested_user->name}}</a></p>
            <p class="card-title">カテゴリー: <span>{{$order->category->category_name}}</span></p>
            <p class="card-text">Comment: {{$order->content}}</p>
            <form method="GET" action="{{route('orders.edit',$order->id)}}">
                @csrf
                <input class="btn btn-info" type="submit" value="リクエスト編集">
            </form>
            <form method="POST" action="{{route('orders.destroy',$order->id)}}" id="delete_{{$order->id}}">
                @csrf
                <a href="#" class="btn btn-danger" data-id="{{$order->id}}" onclick="deletePost(this);">リクエスト削除</a>
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
