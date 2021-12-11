<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Image;
use App\Models\User;
use App\Http\Requests\OrderRequests;
use Illuminate\Support\Facades\Auth; //追加
use App\Models\Category;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return $orders->load('category','requested_user','requesting_user');
    }

    public function create(Request $request)
    {
        $user = $request->user;
        $order_user = User::find($user);
        $categories = Category::all();
        return view('orders.create', compact('order_user','user','categories'));
    }


        /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $order = Order::create($request->all());
        return $order
        ? response()->json($order,201)
        : response()->json([],500) ;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        return $order->load('category','requested_user','requesting_user');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $order = Order::find($id);
        return view('orders.edit', ['order' => $order]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(OrderRequests $request, Order $order, $id)
    {
        $order = new Order;
        $order->requested_user_id = $request->requested_user_id;
        $order->requesting_user_id = $request->requesting_user_id;
        $order->category_id = $request->category_id;
        // $filename = $request->file('image')->store('public/image');
        // $order->image = basename($filename);
        $order->content = $request->content;
        $order->save();
        return redirect("api/orders/".$id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $news = Order::find($id);
        $news->delete();
        return redirect("api/orders/");
    }
}
