@extends('layouts.app')

@section('content')
<div class="card-header">リクエスト作成</div>
<div class="card-body">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif

    <div class="card">
        <figure class="user_avatar">
            @if($order_user->image == null)
            <img src="/storage/image/noimage.png">
            @else
            <img src="{{ asset('storage/image/'.$order_user->image) }}">
            @endif
        </figure>
        <p>名前: {{$order_user->name}}</p>
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
            <form action="{{route('orders.store')}}" method="POST" enctype="multipart/form-data">
                {{ csrf_field() }}
                <div class="form-group">
                    <label for="exampleFormControlSelect1">category</label>
                    <select class="form-control" id="exampleFormControlSelect1" name="category_id">
                        <option selected=""></option>
                            @foreach ($categories as $category)
                                <option value="{{$category->id}}">{{$category->category_name}}</option>
                            @endforeach
                    </select>
                </div>

                <div class="form-group">
                    <label for="exampleFormControlSelect1">Comment:</label>
                    <textarea class="form-control" name="content" id="comment" rows="5"></textarea>
                </div>

                <input type="hidden" name="requested_user_id" value="{{$user}}">
                <input type="hidden" name="requesting_user_id" value="{{Auth::id()}}">
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>
@endsection
