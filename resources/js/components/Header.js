import React from "react";
import ReactDOM from "react-dom";

function Header() {
    return (
        <header class="navbar navbar-expand navbar-light bg-white shadow-sm">
            <a class="navbar-brand" href="{{ url('/') }}">
            </a>
            <nav>
                <div>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <!-- Left Side Of Navbar -->
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <a href="{{route('news.index')}}" class="btn btn-primary">お知らせ</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{route('orders.index')}}" class="btn btn-primary">リクエスト</a>
                            </li>
                        </ul>

                        <!-- Right Side Of Navbar -->
                        <ul class="navbar-nav ml-auto">
                            <!-- Authentication Links -->
                            @guest
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                                </li>
                                @if (Route::has('register'))
                                    <li class="nav-item">
                                        <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                    </li>
                                @endif
                            @else
                                <li class="nav-item dropdown">
                                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                        {{ Auth::user()->name }}
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        @can('isAdmin')
                                            <a href="{{route('admin.index')}}" class="dropdown-item">admin画面</a>
                                        @endcan
                                        <a href="http://127.0.0.1:8000/users/{{Auth::id()}}" class="dropdown-item">マイページ</a>
                                        <a class="dropdown-item" href="{{ route('logout') }}"
                                        onclick="event.preventDefault();
                                                        document.getElementById('logout-form').submit();">
                                            {{ __('Logout') }}
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                            @csrf
                                        </form>
                                    </div>
                                </li>
                            @endguest
                        </ul>
                    </div>
                </div>
            </nav>
    </header>
    );
}

export default Header;

if (document.getElementById("header")) {
    ReactDOM.render(<Header />, document.getElementById("header"));
}
