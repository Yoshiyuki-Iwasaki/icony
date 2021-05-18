@extends('layouts.app')

@section('content')
<div>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div>
                <div class="card-header">admin画面</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                        <admin-tab
                        :categories="{{ json_encode($categories) }}"
                        :users="{{ json_encode($users) }}"
                        :orders="{{ json_encode($orders) }}"
                        :news="{{ json_encode($news) }}"
                        ></admin-tab>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
