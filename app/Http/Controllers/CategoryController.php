<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
        /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $allCategory = Category::latest()->paginate(5);
        return view('category.index',[
            'allCategory' => $allCategory,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('category.create');
    }

    public function destroy($id)
    {
        $news = Category::find($id);
        $news->delete();
        return redirect('/category');
    }
}
