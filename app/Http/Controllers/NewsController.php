<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use App\Models\User;

class NewsController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {

        $users = User::latest();
        $allNews = News::latest()->paginate(5);
        return view('news.index',[
            'allNews' => $allNews,
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('news.create');
    }

    public function store(Request $request)
    {
        $news = new News;
        $news->content = $request->content;
        $news->created_at = $request->created_at;
        $news->save();
        return redirect('/news');
    }

    public function destroy($id)
    {
        $news = News::find($id);
        $news->delete();
        return redirect('/news');
    }

}
