<?php

use App\Enums\Role;
use App\Models\User;

it('identifies admin user', function () {
    $user = new User([
        'role' => Role::ADMIN,
    ]);

    expect($user->isAdmin())->toBeTrue()
        ->and($user->isUser())->toBeFalse();
});

it('identifies regular user', function () {
    $user = new User([
        'role' => Role::USER,
    ]);

    expect($user->isAdmin())->toBeFalse()
        ->and($user->isUser())->toBeTrue();
});

it('checks user role', function () {
    $user = new User([
        'role' => Role::ADMIN,
    ]);

    expect($user->hasRole(Role::ADMIN))->toBeTrue()
        ->and($user->hasRole('admin'))->toBeTrue()
        ->and($user->hasRole(Role::USER))->toBeFalse();
});
