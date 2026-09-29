<?php

namespace Database\Seeders;

use App\Models\Url;
use App\Models\UrlReferrer;
use App\Models\ClickLog;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DashboardDummySeeder extends Seeder
{
    public function run(): void
    {
      // Create a test user
      $user = User::updateOrCreate(
        ['email' => 'test@example.com'],
        [
          'name' => 'Test User',
          'password' => Hash::make('password'),
          'email_verified_at' => now(),
        ]
      );

      // Create multiple URLs with varying click counts
      $urls = [
        ['title' => 'Q2 Financial Report', 'original_url' => 'https://example.com/reports/q2', 'clicks' => 12400],
        ['title' => 'Summer Promo', 'original_url' => 'https://example.com/promo/summer', 'clicks' => 8200],
        ['title' => 'App Download', 'original_url' => 'https://example.com/download', 'clicks' => 5100],
        ['title' => 'Blog Post 42', 'original_url' => 'https://example.com/blog/42', 'clicks' => 3800],
        ['title' => 'Contact Page', 'original_url' => 'https://example.com/contact', 'clicks' => 150],
        ['title' => 'Inactive Link', 'original_url' => 'https://example.com/old', 'clicks' => 0],
      ];

       foreach ($urls as $data) {
         $url = Url::updateOrCreate(
           ['title' => $data['title'], 'user_id' => $user->id],
           [
             'original_url' => $data['original_url'],
             'short_code' => Str::random(6),
             'click_count' => $data['clicks'],
             'is_active' => $data['clicks'] > 0,
             'created_at' => now()->subDays(rand(1, 30)),
           ]
         );

         // Generate click logs for the chart
         if ($data['clicks'] > 0) {
           // Bersihkan log lama untuk URL ini agar tidak duplikat saat re-seed
           ClickLog::where('url_id', $url->id)->delete();
           
           for ($i = 0; $i < 30; $i++) {
             // Generate random number of clicks for each day
             $dailyClicks = rand(1, 20); 
             for ($j = 0; $j < $dailyClicks; $j++) {
               ClickLog::create([
                 'url_id' => $url->id,
                 'clicked_at' => now()->subDays($i)->startOfDay()->addMinutes(rand(0, 1439)),
                 'ip_address' => '127.0.0.1',
                 'user_agent' => 'Mozilla/5.0',
               ]);
             }
           }
         }

         // Create dummy referrers for the top source
         if ($data['clicks'] > 5000) {
           UrlReferrer::updateOrCreate(
             ['url_id' => $url->id, 'referrer_slug' => 'yt'],
             ['click_count' => (int) ($data['clicks'] * 0.6)]
           );
           UrlReferrer::updateOrCreate(
             ['url_id' => $url->id, 'referrer_slug' => 'fb'],
             ['click_count' => (int) ($data['clicks'] * 0.3)]
           );
         }
      }

       // Create a specific top referrer to ensure the 'topSource' logic is tested
       $topUrl = Url::where('user_id', $user->id)->first();
       if ($topUrl) {
         UrlReferrer::updateOrCreate(
           ['url_id' => $topUrl->id, 'referrer_slug' => 'yt'],
           ['click_count' => 20000]
         );
       }
    }
}
