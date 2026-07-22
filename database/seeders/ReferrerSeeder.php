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
        DB::table('referrers')->insert([
            [
                'slug' => 'wa',
                'name' => 'Whatsapp',
            ],
            [
                'slug' => 'fb',
                'name' => 'Facebook',
            ],
            [
                'slug' => 'ig',
                'name' => 'Instagram',
            ],
            [
                'slug' => 'yt',
                'name' => 'Youtube'
            ],
            [
                'slug' => 'tt',
                'name' => 'Tiktok',
            ],
        ]);
    }
}
