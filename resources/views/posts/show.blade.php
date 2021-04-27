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
            <p class="card-title">カテゴリー: {{$post->category->category_name}}</p>
            <p class="card-title">投稿者: {{$post->user->name}}</p>
            <p class="card-text">{{$post->content}}</p>
        </div>
    </div>
</div>
@endsection
