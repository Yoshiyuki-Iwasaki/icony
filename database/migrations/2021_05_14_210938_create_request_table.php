<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('requested_user_id')->index();
            $table->unsignedBigInteger('requesting_user_id')->index();
            $table->foreign('requested_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('requesting_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('content')->nullable();
            $table->string('image_id')->references('id')->on('request_image')->onDelete('cascade');
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
        Schema::dropIfExists('order');
    }
}
