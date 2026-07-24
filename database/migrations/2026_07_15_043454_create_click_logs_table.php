<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('click_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('url_id')->nullable();
            $table->string('referrer_slug', 16)->nullable();
            $table->string('user_agent', 255);
            $table->string('ip_address', 45);
            $table->timestamp('clicked_at')->useCurrent();


            $table->foreign('url_id')->references('id')->on('urls');
            $table->foreign('referrer_slug')->references('slug')->on('referrers');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('click_logs');
    }
};
