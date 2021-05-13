@extends('layouts.app')

@section('content')
<div class="card-header">Category新規追加</div>
<div class="card-body">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif

    <form action="{{route('category.store')}}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        <div class="form-group">
            <label for="exampleInputEmail1">category_name</label>
            <input name="category_name" type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter category_name">
        </div>
        <button type="submit" class="btn btn-primary">作成</button>
    </form>
</div>
@endsection
