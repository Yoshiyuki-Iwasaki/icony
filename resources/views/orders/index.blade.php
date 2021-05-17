@extends('layouts.app')

@section('content')
<div class="card-header">リクエスト一覧</div>

<div class="card-body">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif

    <div class="card">
        <div class="card-header">送信リクエスト</div>
        @foreach ($orders as $order)
            @if(Auth::id() == $order->requesting_user_id)
                <div class="card">
                    <div class="card-body">
                        <p class="card-text">{{$order->content}}</p>
                        <a href="{{route('orders.show',$order->id)}}" class="btn btn-primary">詳細</a>
                    </div>
                </div>
            @endif
        @endforeach
        <div class="card-header">受信リクエスト</div>
        @foreach ($orders as $order)
            @if(Auth::id() == $order->requested_user_id)
                <div class="card">
                    <div class="card-body">
                        <p class="card-text">{{$order->content}}</p>
                        <a href="{{route('orders.show',$order->id)}}" class="btn btn-primary">詳細</a>
                    </div>
                </div>
            @endif
        @endforeach
    </div>
</div>
@endsection
