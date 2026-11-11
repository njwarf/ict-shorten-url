<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guest cannot access users page', function () {
    $this->get('/admin/users')
        ->assertRedirect('/login');
});

test('regular user cannot access users page', function () {
    $user = User::factory()->create([
        'role' => 'user',
    ]);

    $this->actingAs($user)
        ->get('/admin/users')
        ->assertForbidden();
});

test('admin can access users page', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $this->actingAs($admin)
        ->get('/admin/users')
        ->assertSuccessful();
});

test('admin can search users', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    User::factory()->create([
        'name' => 'Silvi Clarisa',
        'email' => 'silvi@example.com',
        'role' => 'user',
    ]);

    User::factory()->create([
        'name' => 'Budi',
        'email' => 'budi@example.com',
        'role' => 'user',
    ]);

    $response = $this->actingAs($admin)
        ->get('/admin/users?search=Silvi');

    $response->assertSuccessful();

    $response->assertInertia(fn ($page) =>
        $page
            ->component('Admin/Users/Index')
            ->where('filters.search', 'Silvi')
            ->has('users.data', 1)
            ->where('users.data.0.name', 'Silvi Clarisa')
    );
});

test('admin users page supports pagination', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    User::factory()->count(15)->create([
        'role' => 'user',
    ]);

    $response = $this->actingAs($admin)
        ->get('/admin/users?page=2');

    $response->assertSuccessful();

    $response->assertInertia(fn ($page) =>
        $page
            ->component('Admin/Users/Index')
            ->where('users.current_page', 2)
            ->where('users.last_page', 2)
    );
});
