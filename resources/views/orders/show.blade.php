@extends('layouts.app')

@section('content')
<div class="card-header">リクエスト詳細</div>
<div class="card-body">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif

    <div class="card">
        <div class="card-body">
            <p class="card-text">{{$order->content}}</p>
        </div>
    </div>
</div>

@endsection
