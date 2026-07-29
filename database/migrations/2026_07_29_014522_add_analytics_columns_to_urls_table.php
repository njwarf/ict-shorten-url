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
        Schema::table('urls', function (Blueprint $table) {
            $table->unsignedBigInteger('total_clicks')->default(0);
            $table->unsignedInteger('unique_ip_count')->default(0);
            $table->string('top_user_agent', 255)->nullable();
            $table->timestamp('last_clicked_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('urls', function (Blueprint $table) {
            $table->dropColumn([
              'total_clicks',
              'unique_ip_count',
              'top_user_agent',
              'last_clicked_at',
            ]);
        });
    }
};
