<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTalkroomIdTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->bigInteger('talkroom_id')->unsigned()->index()->after('category_id');
            // $table->foreign('talkroom_id')->references('id')->on('talkroom')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.∂ç
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('talkroom_id');
        });
    }
}
