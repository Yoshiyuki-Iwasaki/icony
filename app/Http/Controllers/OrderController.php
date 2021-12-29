<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use App\Http\Requests\OrderRequests;
use App\Models\Category;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::orderByDesc('id')->get();
        return $orders->load('category','requested_user','requesting_user');
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
        : response()->json([],500);
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
    public function update(OrderRequests $request, Order $order)
    {
        $order->requested_user_id = $request->requested_user_id;
        $order->requesting_user_id = $request->requesting_user_id;
        $order->category_id = $request->category_id;
        $order->talkroom_id = $request->talkroom_id;
        // $filename = $request->file('image')->store('public/image');
        // $order->image = basename($filename);
        $order->content = $request->content;

        return $order->update()
        ? response()->json($order)
        : response()->json([],500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        return $order->delete()
        ? response()->json($order)
        : response()->json([],500);
    }
}
