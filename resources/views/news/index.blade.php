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
    </div>
    @endforeach
</div>
@endsection
