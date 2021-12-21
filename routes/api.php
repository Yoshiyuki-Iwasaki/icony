<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('/', 'HomeController');
Route::apiResource('orders','OrderController');
Route::apiResource('users','UserController');
Route::apiResource('comments','CommentsController');
Route::apiResource('likes', 'LikesController');
Route::post('/login', 'UserController@login');
Route::post('/logout', 'UserController@logout');
Route::get('user', function(Request $request){
    return $request->user();
});
