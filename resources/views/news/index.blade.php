@extends('layouts.app')

@section('content')
<div class="card-header">News一覧</div>
<div class="card-body">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif

    <a href="{{route('news.create')}}" class="btn btn-primary">お知らせ追加</a>
    @foreach ($allNews as $news)
    <div>
        <p>{{$news->created_at}}</p>
        <p>{{$news->content}}</p>
        <form method="POST" action="{{route('news.destroy',$news->id)}}" id="delete_{{$news->id}}">
            @csrf
            <a href="#" class="btn btn-danger" data-id="{{$news->id}}" onclick="deletePost(this);">削除</a>
        </form>
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
