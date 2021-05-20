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

Auth::routes();

Route::resource('/', 'HomeController');

// users
Route::resource('/users', 'UserController', ['except' => ['edit','destroy','update']]);
Route::post('/users/destroy/{id}', 'UserController@destroy')->name('users.destroy');
Route::post('/users/update/{id}', 'UserController@update')->name('users.update');
Route::get('/users/edit/{id}', 'UserController@edit')->name('users.edit');
Route::post('/users/{id}/follow', 'FollowUserController@follow');
Route::post('/users/{id}/unfollow', 'FollowUserController@unfollow');

// admin
Route::group(['middleware' => ['auth', 'can:isAdmin']], function () {
    Route::get('/admin', 'AdminController@index')->name('admin.index');
    Route::get('/admin/news/create/', 'NewsController@create')->name('news.create');
    Route::get('/admin/category/create/', 'CategoryController@create')->name('category.create');

});
// news
Route::get('/news', 'NewsController@index')->name('news.index');
Route::resource('/news', 'NewsController', ['except' => ['index','create','edit','destroy','update']]);
Route::post('/news/destroy/{id}', 'NewsController@destroy')->name('news.destroy');

// category
Route::resource('/category', 'CategoryController', ['except' => ['index','create','edit','destroy','update']]);
Route::post('/category/destroy/{id}', 'CategoryController@destroy')->name('category.destroy');

// order
Route::resource('/orders', 'OrderController', ['except' => ['index','show','edit','update','destroy']]);
Route::get('/orders', 'OrderController@index')->name('orders.index');
Route::post('/orders/destroy/{order}', 'OrderController@destroy')->name('orders.destroy');
Route::get('/orders/edit/{order}', 'OrderController@edit')->name('orders.edit');
Route::post('/orders/update/{order}', 'OrderController@update')->name('orders.update');
Route::get('/orders/{order}', 'OrderController@show')->name('orders.show');
