<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // ←これを追加

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('posts')->insert([
            [
                'user_id' => 1,
                'category_id' => 1,
                'title' => 'hoge01',
                'content' => 'test01'
            ],
            [
                'user_id' => 1,
                'category_id' => 1,
                'title' => 'hoge02',
                'content' => 'test02'
            ],
            [
                'user_id' => 1,
                'category_id' => 1,
                'title' => 'hoge03',
                'content' => 'test03'
            ]
        ]);
    }
}
