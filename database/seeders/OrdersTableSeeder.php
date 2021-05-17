<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // ←これを追加

class RequestsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('orders')->insert([
            [
                'id' => 4,
                'requested_user_id' => 1,
                'requesting_user_id' => 2,
                'content' => 'testtest',
            ],
            [
                'id' => 5,
                'requested_user_id' => 2,
                'requesting_user_id' => 5,
                'content' => 'testtest',
            ],
            [
                'id' => 6,
                'requested_user_id' => 5,
                'requesting_user_id' => 6,
                'content' => 'testtest',
            ]
        ]);
    }
}
