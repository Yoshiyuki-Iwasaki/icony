<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTallkTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('talk', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('content');
            $table->bigInteger('talkroom_id')->unsigned()->index();
            $table->foreign('talkroom_id')->references('id')->on('talkroom')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('talk');
    }
}
