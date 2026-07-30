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
        Schema::create('urls', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->unsignedBigInteger('user_id');
            $table->string('title', 100);
            $table->text('original_url');
            $table->string('short_code', 20)->unique()->index();
            $table->boolean('is_active')->default(true);

            $table->unsignedBigInteger('click_count')->default(0);
            $table->timestamp('last_clicked_at')->nullable();
            $table->unsignedBigInteger('unique_ip_count')->default(0);
            $table->string('top_user_agent', 255)->nullable();

            $table->timestamp('created_at')->useCurrent();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('urls');
    }
};
