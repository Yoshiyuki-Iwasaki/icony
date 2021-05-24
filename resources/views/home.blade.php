@extends('layouts.app')

@section('content')
<div>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div>
                <p class="card-header">新着作品</p>
                <order-list
                :orders="{{ json_encode($orders) }}"
                ></order-list>
                {{-- @foreach ($orders as $order)
                    <div class="card">
                        <div class="card-body">
                            <a href="{{route('orders.show',$order->id)}}" class="card-text">{{$order->content}}</a>
                        </div>
                    </div>
                @endforeach --}}
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
                    <v-slick :users="{{ json_encode($users) }}"></v-slick>
                </div>
            </div>
        </div>
    </div>
</div>
<swiper></swiper>
@endsection
