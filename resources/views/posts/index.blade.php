@extends('layouts.app')

@section('content')
<div class="card-body">
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <h5 class="card-title">検索フォーム</h5>
                <div id="custom-search-input">
                    <div class="input-group col-md-12">
                        <form action="{{route('posts.search')}}" method="get">
                            {{csrf_field()}}
                            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                            aria-describedby="search-addon" name="search" />
                            <span class="input-group-btn" style="position:relative;top:-37px;left:153px;">
                                <button class="btn btn-info" type="submit">
                                    <i class="fas fa-search"></i>
                                </button>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="card-header">Board</div>

@isset($search_result)
<h5 class="card-title">{{$search_result}}</h5>
@endisset

<div class="card-body">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif

    @foreach ($posts as $post)
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{$post->title}}</h5>
                <p class="card-title">
                    カテゴリー:
                    <a href="{{route('posts.index', ['category_id' => $post->category_id])}}">{{$post->category->category_name}}</a>
                </p>
                <p class="card-title">
                    Tag:
                    @foreach ($post->tags as $tag )
                        <a href="{{route('posts.index', ['tag_name' => $tag->tag_name])}}">#{{$tag->tag_name}}</a>
                    @endforeach
                </p>
                <p class="card-title">投稿者:
                    <a href="{{route('users.show', $post->user_id)}}">{{$post->user->name}}</a>
                </p>
                <p class="card-text">{{$post->content}}</p>
                <a href="{{route('posts.show',$post->id)}}" class="btn btn-primary">詳細</a>
            </div>
        </div>
    @endforeach
    @if(@isset($category_id))
    {{ $posts->appends(['category_id' => $category_id])->links('vendor.pagination.semantic-ui') }}
    @elseif(@isset($tag_name))
    {{ $posts->appends(['tag_name' => $tag_name])->links('vendor.pagination.semantic-ui') }}
    @elseif(@isset($search_query))
    {{ $posts->appends(['search' => $search_query])->links('vendor.pagination.semantic-ui') }}
    @else
    {{ $posts->links('vendor.pagination.semantic-ui') }}
    @endif
</div>
@endsection
