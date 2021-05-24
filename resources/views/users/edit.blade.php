@extends('layouts.app')

@section('content')
<div>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">{{$user->name}}の投稿</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form method="POST" action="{{route('users.update',$user->id)}}" enctype="multipart/form-data">
                        @csrf
                        氏名
                        <input type="text" name="name" value="{{$user->name}}">
                        <br>
                        <div class="form-group">
                            <label for="exampleFormControlFile1">プロフィール画像</label>
                            <input type="file" class="form-control-file" id="exampleFormControlFile1" name="image">
                        </div>
                        紹介文
                        <input type="text" name="introduction" value="{{$user->introduction}}">
                        <br>
                        メールアドレス
                        <input type="email" name="email" value="{{$user->email}}">
                        <br>
                        <input class="btn btn-info" type="submit" value="更新する">
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
