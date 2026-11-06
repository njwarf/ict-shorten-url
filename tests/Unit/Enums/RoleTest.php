<?php

use App\Enums\Role;

it('has admin and user roles', function (){
  expect(Role::ADMIN->value)->toBe('admin')
    ->and(Role::USER->value)->toBe('user');

});
