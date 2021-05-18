<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\User;
use App\Models\News;
use App\Models\Order;

class AdminController extends Controller
{
    public function __construct()
    {
        # 追加したmiddlewareを追加。
        $this->middleware('admin');
    }

     public function index(){
        $categories = Category::all();
        $users = User::all();
        $orders = Order::all();
        $news = News::all();
        return view('admin.index',[
            'categories' => $categories,
            'users' => $users,
            'orders' => $orders,
            'news' => $news,
        ]);
    }
}
