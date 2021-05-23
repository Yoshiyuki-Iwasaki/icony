@extends('layouts.app')

@section('content')
<div>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div>
                <div class="card-header">新着作品</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    @foreach ($orders as $order)
                        <div class="card">
                            <div class="card-body">
                                <a href="{{route('orders.show',$order->id)}}" class="card-text">{{$order->content}}</a>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>

<div>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div>
                <div class="card-header">登録ユーザー</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    @foreach ($users as $user)
                        <div class="card">
                            <div class="card-body">
                                <a href="{{route('users.show',$user->id)}}" class="card-text">{{$user->name}}</a>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
