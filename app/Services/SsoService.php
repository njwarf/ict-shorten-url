<?php

namespace App\Services;

use App\Models\User;
use App\Enums\Role;
use Illuminate\Support\Facades\Auth;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class SsoService
{
    public function generateLoginUrl(): string
    {
        $payload = [
            'iss' => config('services.sso.app_issuer'),
            'sub' => config('services.sso.callback_url'),
            'iat' => time(),
            'exp' => time() + 3600,
        ];

        $token = JWT::encode(
            $payload,
            config('services.sso.api_key'),
            'HS256'
        );

        return config('services.sso.url')
            . '?redirect=' . urlencode(config('services.sso.callback_url'))
            . '&token=' . urlencode($token);
    }

    public function authenticate(string $token): User
    {
        $decoded = JWT::decode(
            $token,
            new Key(config('services.sso.api_key'), 'HS256')
        );

        if ($decoded->iss !== config('services.sso.issuer')) {
            throw new \RuntimeException('Invalid SSO issuer.');
        }

        $data = $decoded->sub->data;

        return $this->findOrCreateUser($data);
    }

    protected function findOrCreateUser(object $data): User
    {
        $user = User::where('sso_id', $data->id)
            ->orWhere('username', $data->username)
            ->orWhere('email', $data->email)
            ->first();

        if ($user) {
            $user->update([
                'sso_id' => $data->id,
                'username' => $data->username,
                'name' => $data->full_name,
                'email' => $data->email,
            ]);

            if ($data->isAdmin === true) {
                $user->update([
                    'role' => Role::ADMIN,
                ]);
            }

            return $user;
        }

        return User::create([
            'sso_id' => $data->id,
            'username' => $data->username,
            'name' => $data->full_name,
            'email' => $data->email ?: $data->username . '@umtas.ac.id',
            'password' => null,
            'role' => $data->isAdmin === true
                ? Role::ADMIN
                : Role::USER,
        ]);
    }

    public function login(User $user): void
    {
        Auth::login($user);
    }
}
