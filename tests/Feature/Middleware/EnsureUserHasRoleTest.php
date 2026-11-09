<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;

beforeEach(function () {
    Route::middleware(['auth', 'role:admin'])
        ->get('/admin-only-test', fn () => response()->json(['message' => 'OK']));
});

it('allows admin user', function () {
    $user = User::factory()->admin()->create();

    $this->actingAs($user)
        ->get('/admin-only-test')
        ->assertOk();
});

it('forbids regular user', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/admin-only-test')
        ->assertForbidden();
});
