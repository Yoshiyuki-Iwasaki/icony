<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Order;
use Auth;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
            $filename = $request->file('image')->store('public/image');
            $order->image = basename($filename);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user, Order $order)
    {
        $userAuth = Auth::id();
        $user->load('orders','orders_me','followUsers','follows');
        $defaultCount = count($user->followUsers);
        $defaultFollowed = $user->followUsers->where('id', $userAuth)->first();
        if($defaultFollowed) {
            $defaultFollowed == true;
        } else {
            $defaultFollowed == false;
        }
        return view('users.show',[
            'user' => $user,
            'order' => $order,
            'defaultFollowed' => $defaultFollowed,
            'defaultCount' => $defaultCount,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::find($id);
        return view('users.edit', ['user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if($request->file('image')->isValid()) {
            $user = User::find($id);
            $user->name = $request->input('name');
            $user->introduction	 = $request->input('introduction');
            $user->email = $request->input('email');
            $filename = $request->file('image')->store('public/image');
            $user->image = basename($filename);
            $user->save();
        }
        return redirect('/');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contact = User::find($id);
        $contact->delete();
        return redirect('/');
    }


    public function image(Request $request, User $user) {
        // バリデーション省略
        $originalImg = $request->image;
        if($originalImg->isValid()) {
            $filePath = $originalImg->store('public');
            $user->image = str_replace('public/', '', $filePath);
            $user->save();
            return redirect("/users/{$user->id}")->with('user', $user);

        }
    }
}
