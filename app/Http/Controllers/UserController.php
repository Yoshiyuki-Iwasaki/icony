<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Order;
use Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserRequest;

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
    public function show(User $user)
    {
        return $user->load('orders','orders_me','followUsers','follows');
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
    public function update(UserRequest $request, User $user)
    {
        $user->name = $request->name;
        return $user->update()
        ? response()->json($user)
        : response()->json([],500);
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

    public function register(Request $request) {
        $user = new User;
        $user->name = $request->name;
        $user->introduction = $request->introduction;
        $user->role = $request->role;
        $user->image = $request->image;
        $user->email = $request->email;
        $user->password = Hash::make($request->input('password'));
        $user->save();
        return $user
        ? response()->json($user,201)
        : response()->json([],500);
    }

    public function login(UserRequest $request)
    {
        $credentials = $request->validate([
            'email'=> 'bail|required|max:255|email|string',
            'password' => 'bail|required|string|min:8',
        ]);
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json(Auth::user());
        }
        return response()->json([], 401);
    }


    /**
     * ログアウト
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $result = true;
        $status = 200;
        $message = 'ログアウトしました';
        return response()->json(['result' => $result, 'status' => $status, 'message' => $message]);
    }
}
