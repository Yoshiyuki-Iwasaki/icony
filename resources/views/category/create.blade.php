@extends('layouts.app')

@section('content')
<div class="card-header">Category新規追加</div>
<div class="card-body">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif


</div>
@endsection
