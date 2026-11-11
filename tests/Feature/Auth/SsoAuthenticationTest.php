<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Services\SsoService;
use Firebase\JWT\JWT;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SsoAuthenticationTest extends TestCase
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

    public function test_guest_can_redirect_to_sso(): void
    {
        $response = $this->get(route('sso.redirect'));

        $response->assertRedirect();
        $this->assertStringStartsWith(
            'https://sso-dev.umtas.ac.id/login?redirect=',
            $response->headers->get('Location')
        );
    }

    public function test_sso_callback_logs_in_existing_user_by_sso_id(): void
    {
        $user = User::factory()->create([
            'sso_id' => 1234,
            'username' => '210301001',
            'email' => 'old@example.com',
            'name' => 'Old Name',
        ]);

        $token = $this->createSsoToken([
            'id' => 1234,
            'username' => '210301001',
            'email' => 'fulan@umtas.ac.id',
            'full_name' => 'Fulan Ahmad',
            'isAdmin' => false,
        ]);

        $response = $this->get(route('sso.callback', [
            'token' => $token,
        ]));

        $response->assertRedirect(route('dashboard'));

        $this->assertAuthenticatedAs($user);

        $user->refresh();

        $this->assertSame('210301001', $user->username);
        $this->assertSame('fulan@umtas.ac.id', $user->email);
        $this->assertSame('Fulan Ahmad', $user->name);
    }

    public function test_sso_callback_creates_new_user(): void
    {
        $token = $this->createSsoToken([
            'id' => 5678,
            'username' => '210301002',
            'email' => 'mahasiswa@umtas.ac.id',
            'full_name' => 'Mahasiswa UMTAS',
            'isAdmin' => false,
        ]);

        $response = $this->get(route('sso.callback', [
            'token' => $token,
        ]));

        $response->assertRedirect(route('dashboard'));

        $this->assertAuthenticated();

        $this->assertDatabaseHas('users', [
            'sso_id' => 5678,
            'username' => '210301002',
            'email' => 'mahasiswa@umtas.ac.id',
            'name' => 'Mahasiswa UMTAS',
        ]);
    }

    public function test_sso_callback_rejects_missing_token(): void
    {
        $response = $this->get(route('sso.callback'));

        $response->assertRedirect(route('login'));

        $response->assertSessionHas(
            'error',
            'Login SSO gagal. Silakan coba lagi.'
        );

        $this->assertGuest();
    }

    private function createSsoToken(array $data): string
    {
        return JWT::encode(
            [
                'iss' => 'sso-umtas',
                'sub' => [
                    'data' => $data,
                ],
                'iat' => time(),
                'exp' => time() + 3600,
            ],
            'test-secret-key-32-characters-long!',
            'HS256'
        );
    }
}
