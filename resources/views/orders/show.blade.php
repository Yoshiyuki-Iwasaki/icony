@extends('layouts.app')

@section('content')
<div class="card-header">リクエスト詳細</div>
<div class="card-body">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif

    <div class="card">
        <div class="card-body">
            <p class="card-text">Comment: {{$order->content}}</p>
            <p class="card-title">カテゴリー: <a href="{{route('orders.index', ['category_id' => $order->category_id])}}">{{$order->category->category_name}}</a></p>
            <p class="card-text">依頼者: <a href="{{route('users.show', $order->requesting_user_id)}}">{{$order->user->name}}</a></p>
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
