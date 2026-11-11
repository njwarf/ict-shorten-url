<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\SsoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SsoController extends Controller
{
    public function __construct(
        protected SsoService $ssoService
    ) {}

    public function redirect()
    {
        return redirect()->away(
            $this->ssoService->generateLoginUrl()
        );
    }

    public function callback(Request $request)
    {
        try {
            $token = $request->query('token');

            if (!$token) {
                throw new \RuntimeException('SSO token tidak ditemukan.');
            }

            $user = $this->ssoService->authenticate($token);

            Auth::login($user);
            $request->session()->regenerate();

            return redirect()->intended(route('dashboard'));
        } catch (\Throwable $e) {
            return redirect()
                ->route('login')
                ->with('error', 'Login SSO gagal. Silakan coba lagi.');
        }
    }
}
