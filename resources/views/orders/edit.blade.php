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
            <form action="{{route('orders.update', $order)}}" method="POST" enctype="multipart/form-data">
                @method('PUT')
                {{ csrf_field() }}

                <div class="form-group">
                    <label for="comment">Comment:</label>
                    <textarea class="form-control" name="content" id="comment" rows="5"></textarea>
                </div>

                <input type="hidden" name="requested_user_id" value="{{$order->requested_user_id}}">
                <input type="hidden" name="requesting_user_id" value="{{Auth::id()}}">
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>
@endsection
