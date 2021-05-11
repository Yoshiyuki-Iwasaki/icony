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
    <form action="{{route('news.store')}}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        <div class="form-group">
            <label for="exampleFormControlSelect1">Content</label>
            <textarea class="form-control" name="content" id="content" rows="5"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
@endsection
