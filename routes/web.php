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

// posts
Route::resource('/posts', 'PostController', ['except' => ['index','edit','destroy','update','search']]);
Route::get('/', 'PostController@index')->name('posts.index');
Route::post('/posts/destroy/{id}', 'PostController@destroy')->name('posts.destroy');
Route::post('/posts/update/{id}', 'PostController@update')->name('posts.update');
Route::get('/posts/edit/{id}', 'PostController@edit')->name('posts.edit');
Route::get('/posts/search', 'PostController@search')->name('posts.search');

// users
Route::resource('/users', 'UserController', ['except' => ['edit','destroy','update']]);
Route::post('/users/destroy/{id}', 'UserController@destroy')->name('users.destroy');
Route::post('/users/update/{id}', 'UserController@update')->name('users.update');
Route::get('/users/edit/{id}', 'UserController@edit')->name('users.edit');
Route::post('/users/{id}/follow', 'FollowUserController@follow');
Route::post('/users/{id}/unfollow', 'FollowUserController@unfollow');

// admin
Route::get('/admin', 'AdminController@index')->name('admin');

// news
Route::get('/news', 'NewsController@index')->name('news.index');
Route::resource('/news', 'NewsController', ['except' => ['index','edit','destroy','update']]);
Route::post('/news/destroy/{id}', 'NewsController@destroy')->name('news.destroy');

// category
Route::get('/category', 'CategoryController@index')->name('category.index');
Route::resource('/category', 'CategoryController', ['except' => ['index','edit','destroy','update']]);
Route::post('/category/destroy/{id}', 'CategoryController@destroy')->name('category.destroy');
