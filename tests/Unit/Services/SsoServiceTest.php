<?php

namespace Tests\Unit\Services;

use App\Services\SsoService;
use Firebase\JWT\JWT;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SsoServiceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

   config([
    'services.sso.url' => 'https://sso-dev.umtas.ac.id/login',
    'services.sso.api_key' => 'test-secret-key-32-characters-long!',
    'services.sso.callback_url' => 'https://localhost:8000/auth/sso/callback',
    'services.sso.issuer' => 'sso-umtas',
    'services.sso.app_issuer' => 'sh-ict-umtas',
]);
    }

    public function test_generate_login_url_contains_valid_hs256_token(): void
    {
        $service = new SsoService();

        $url = $service->generateLoginUrl();

        $this->assertStringStartsWith(
            'https://sso-dev.umtas.ac.id/login?redirect=',
            $url
        );

        $this->assertStringContainsString('&token=', $url);

        parse_str(parse_url($url, PHP_URL_QUERY), $query);

        $this->assertSame(
            'https://localhost:8000/auth/sso/callback',
            $query['redirect']
        );

        $decoded = JWT::decode(
            $query['token'],
           new \Firebase\JWT\Key(
    'test-secret-key-32-characters-long!',
    'HS256'
)
        );

        $this->assertSame('sh-ict-umtas', $decoded->iss);
        $this->assertSame(
            'https://localhost:8000/auth/sso/callback',
            $decoded->sub
        );
    }

    public function test_expired_token_is_rejected(): void
    {
        $token = JWT::encode(
            [
                'iss' => 'sso-umtas',
                'sub' => [
                    'data' => [
                        'id' => 1234,
                        'username' => '210301001',
                        'email' => 'fulan@umtas.ac.id',
                        'full_name' => 'Fulan Ahmad',
                        'isAdmin' => false,
                    ],
                ],
                'iat' => time() - 7200,
                'exp' => time() - 3600,
            ],
          'test-secret-key-32-characters-long!',
            'HS256'
        );

        $service = new SsoService();

        $this->expectException(\Firebase\JWT\ExpiredException::class);

        $service->authenticate($token);
    }

    public function test_invalid_issuer_is_rejected(): void
    {
        $token = JWT::encode(
            [
                'iss' => 'invalid-issuer',
                'sub' => [
                    'data' => [
                        'id' => 1234,
                        'username' => '210301001',
                        'email' => 'fulan@umtas.ac.id',
                        'full_name' => 'Fulan Ahmad',
                        'isAdmin' => false,
                    ],
                ],
                'iat' => time(),
                'exp' => time() + 3600,
            ],
            'test-secret-key-32-characters-long!',
            'HS256'
        );

        $service = new SsoService();

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Invalid SSO issuer.');

        $service->authenticate($token);
    }

    public function test_tampered_signature_is_rejected(): void
    {
        $token = JWT::encode(
            [
                'iss' => 'sso-umtas',
                'sub' => [
                    'data' => [
                        'id' => 1234,
                        'username' => '210301001',
                        'email' => 'fulan@umtas.ac.id',
                        'full_name' => 'Fulan Ahmad',
                        'isAdmin' => false,
                    ],
                ],
                'iat' => time(),
                'exp' => time() + 3600,
            ],
          'test-secret-key-32-characters-long!',
            'HS256'
        );

        $parts = explode('.', $token);

        $parts[2] = str_repeat('a', strlen($parts[2]));

        $tamperedToken = implode('.', $parts);

        $service = new SsoService();

        $this->expectException(\Firebase\JWT\SignatureInvalidException::class);

        $service->authenticate($tamperedToken);
    }
}
