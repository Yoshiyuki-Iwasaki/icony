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
            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            <form action="{{route('posts.update', $order)}}" method="POST" enctype="multipart/form-data">
                {{ csrf_field() }}
                <div class="form-group">
                    <label for="exampleInputEmail1">title</label>
                    <input value="{{$post->title}}" name="title" type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter title">
                </div>

                <div class="form-group">
                    <label for="exampleFormControlFile1">Example file input</label>
                    <input value="{{$post->image}}" type="file" class="form-control-file" id="exampleFormControlFile1" name="image">
                </div>

                <div class="form-group">
                    <label for="exampleFormControlSelect1">category</label>
                    <select class="form-control" id="exampleFormControlSelect1" name="category_id">
                        <option value="1" @if($post->age === 1) selected @endif>book</option>
                        <option value="2" @if($post->age === 2) selected @endif>cafe</option>
                        <option value="3" @if($post->age === 3) selected @endif>travel</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="exampleFormControlSelect1">Comment:</label>
                    <textarea class="form-control" name="content" id="comment" rows="5">{{$post->content}}</textarea>
                </div>

                <input type="hidden" name="user_id" value="{{Auth::id()}}">
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>
@endsection
