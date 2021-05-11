@extends('layouts.app')

@section('content')
<div class="card-header">News一覧</div>
<div class="card-body">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif

    @foreach ($allNews as $news)
    <div>
        {{-- <p>{{$news->created_at}}</p> --}}
        <p>{{$news->content}}</p>
    </div>
    @endforeach
</div>
@endsection
