<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReferrerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('referrers')->updateOrInsert(
                ['slug' => 'wa'],
                ['name' => 'Whatsapp']
            );

        DB::table('referrers')->updateOrInsert(
                ['slug' => 'fb'],
                ['name' => 'Facebook']
            );

        DB::table('referrers')->updateOrInsert(
                ['slug' => 'ig'],
                ['name' => 'Instagram']
            );

        DB::table('referrers')->updateOrInsert(
                ['slug' => 'yt'],
                ['name' => 'Youtube']
            );

        DB::table('referrers')->updateOrInsert(
                ['slug' => 'tt'],
                ['name' => 'Tiktok']
            );
    }
}
