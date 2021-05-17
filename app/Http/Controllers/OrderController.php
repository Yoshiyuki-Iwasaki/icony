<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Auth; //追加

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::latest()->paginate(5);
        $orders->load('user');
        return view('orders.index',['orders' => $orders]);
    }

    public function create(Request $request)
    {
        $user = $request->user;
        return view('orders.create', compact('user'));
    }


        /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $order = new Order;
        $order->requested_user_id = $request->requested_user_id;
        $order->requesting_user_id = $request->requesting_user_id;
        // $order->category_id = $request->category_id;
        $order->content = $request->content;
        $order->save();
        return redirect('/orders');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        return view('orders.show',['order' => $order]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $news = Requests::find($id);
        $news->delete();
        return redirect('/request');
    }
}
