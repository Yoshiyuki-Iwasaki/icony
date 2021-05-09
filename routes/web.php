<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController; # don't forgot to add this

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Auth::routes();

Route::get('/', 'PostController@index')->name('posts.index');
Route::get('/posts/search', 'PostController@search')->name('posts.search');
Route::resource('/posts', 'PostController', ['except' => ['index']]);

Route::resource('/users', 'UserController', ['except' => ['edit','destroy','update']]);
Route::post('/users/destroy/{id}', 'UserController@destroy')->name('users.destroy');
Route::post('/users/update/{id}', 'UserController@update')->name('users.update');
Route::get('/users/edit/{id}', 'UserController@edit')->name('users.edit');

Route::resource('/comments', 'CommentController')->middleware('auth');
