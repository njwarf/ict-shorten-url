<?php

namespace Database\Seeders;

use App\Models\Url;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LinkSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed 150 dummy links.
     */
    public function run(): void
    {
        $user = User::firstWhere('email', 'salwa@gmail.com');

        Url::factory(150)
            ->for($user ?? User::factory())
            ->create();
    }
}
