<?php

namespace Database\Factories;

use App\Models\Url;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Url>
 */
class UrlFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $clickedAt = fake()->optional(0.7)->dateTimeBetween('-30 days');

        return [
            'id' => Str::uuid(),
            'user_id' => User::factory(),
            'title' => fake()->sentence(3),
            'original_url' => fake()->url(),
            'short_code' => Str::lower(Str::random(6)),
            'is_active' => fake()->boolean(85),
            'click_count' => $clickedAt ? fake()->numberBetween(0, 500) : 0,
            'last_clicked_at' => $clickedAt,
            'unique_ip_count' => fn (array $attributes) => $attributes['click_count'] > 0 ? fake()->numberBetween(1, (int) ($attributes['click_count'] / 2)) : 0,
            'top_user_agent' => fake()->optional(0.7)->randomElement([
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126',
                'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5) Safari/605',
                'Mozilla/5.0 (Linux; Android 14; Pixel 8) Chrome/126 Mobile',
            ]),
            'created_at' => fake()->dateTimeBetween('-90 days', '-1 day'),
        ];
    }

    /**
     * Indicate that the link has never been clicked.
     */
    public function unclicked(): static
    {
        return $this->state(fn () => [
            'click_count' => 0,
            'last_clicked_at' => null,
            'unique_ip_count' => 0,
        ]);
    }
}
