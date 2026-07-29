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
        Schema::table('click_logs', function (Blueprint $table) {
            $table->index(['url_id', 'user_agent']);
            $table->index(['url_id', 'ip_address']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('click_logs', function (Blueprint $table) {
            $table->dropIndex(['url_id', 'user_agent']);
            $table->dropIndex(['url_id', 'ip_address']);
        });
    }
};
