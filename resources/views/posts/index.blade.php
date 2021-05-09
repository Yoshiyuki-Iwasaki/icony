@extends('layouts.app')

@section('content')
<div class="card-header">Board</div>

@isset($search_result)
<h5 class="card-title">{{$search_result}}</h5>
@endisset

@isset($category_result)
    <?php $counter = 0;?>
    @foreach ($posts as $post)
        @if ($counter == 0)
            <h5 class="card-title">{{$post->category->category_name}}の検索機能{{$posts->total()}}件</h5>
        @endif
        <?php $counter++; ?>
    @endforeach
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
