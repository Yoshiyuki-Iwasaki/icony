<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use App\Http\Requests\OrderRequests;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $orders = Order::all();
        $users = User::all();
        $orders->load('category','requested_user','requesting_user');
        return view('home',[
            'orders' => $orders,
            'users' => $users,
        ]);
    }
}
