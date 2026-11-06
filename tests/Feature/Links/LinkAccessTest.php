<?php

use App\Models\Url;
use App\Models\User;

it('allows admin to see all links', function () {
    $admin = User::factory()->admin()->create();
    $user = User::factory()->create();

    Url::factory()->create(['user_id' => $user->id]);

    $this->actingAs($admin)
        ->get(route('links.index'))
        ->assertOk();
});

it('allows user to see only their own links', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    Url::factory()->create(['user_id' => $user->id]);
    Url::factory()->create(['user_id' => $otherUser->id]);

    $response = $this->actingAs($user)
        ->get(route('links.index'));

    $response->assertOk();
});

it('prevents user from editing another users link', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $link = Url::factory()->create([
        'user_id' => $otherUser->id,
    ]);

    $this->actingAs($user)
        ->get(route('links.edit', $link->id))
        ->assertNotFound();
});

it('allows admin to edit another users link', function () {
    $admin = User::factory()->admin()->create();
    $user = User::factory()->create();

    $link = Url::factory()->create([
        'user_id' => $user->id,
    ]);

    $this->actingAs($admin)
        ->get(route('links.edit', $link->id))
        ->assertOk();
});
