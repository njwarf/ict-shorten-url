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
        Schema::create('url_referrers', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('url_id')
                  ->constrained('urls')
                  ->cascadeOnDelete();

            $table->string('referrer_slug', 16);

            $table->foreign('referrer_slug')
                  ->references('slug')
                  ->on('referrers')
                  ->cascadeOnDelete();

            $table->unsignedBigInteger('click_count')->default(0);
            $table->timestamp('last_clicked_at')->nullable();

            $table->timestamps();

            $table->unique(['url_id', 'referrer_slug']);
            $table->index('url_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('url_referrers');
    }
};
