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
        <div class="card">
            <div class="card-body">
                <?php $orders_first = str_replace('[', '', $orders); $orders_second = str_replace('[', '', $orders_first);?>
                {{-- <order-list
                :orders="{{ json_encode($orders->requested_user) }}"
                ></order-list> --}}
                @foreach ($orders->requested_user as $order)
                    <li class="orderList-item">
                        <a class="orderList-link" href="/orders/{{$order->id}}">
                            <figure class="orderList-image">
                                <img src="/storage/image/noimage.png" alt="" />
                            </figure>
                            <p class="orderList-text">{{$order->content}}</p>
                        </a>
                    </li>
                @endforeach
            </div>
        </div>
        <div class="card-header">受信リクエスト</div>
            <div class="card">
                <div class="card-body">
                    {{-- <order-list
                    :orders="{{ json_encode($orders->requested_user) }}"
                    ></order-list> --}}
                </div>
            </div>
    </div>
</div>
@endsection
