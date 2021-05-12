@extends('layouts.app')

@section('content')
<div class="card-header">Category一覧</div>
<div class="card-body">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif

    @can('isAdmin')
        <a href="{{route('category.create')}}" class="btn btn-primary">Category追加</a>
    @endcan
    @foreach ($allCategory as $category)
    <div>
        <p>{{$category->category_name}}</p>
        @can('isAdmin')
            <form method="POST" action="{{route('category.destroy',$category->id)}}" id="delete_{{$category->id}}">
                @csrf
                <a href="#" class="btn btn-danger" data-id="{{$category->id}}" onclick="deletePost(this);">削除</a>
            </form>
        @endcan
    </div>
    @endforeach
</div>

<script>
    function deletePost(e){
        'use strict';
        if(confirm('本当に削除していいですか？')){
            document.getElementById('delete_' + e.dataset.id).submit();
        }
    }
</script>
@endsection
