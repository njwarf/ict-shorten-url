<?php

namespace App\Http\Middleware;

use App\Enums\Role;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(
        Request $request,
        Closure $next,
        Role|string ...$roles
    ): Response {
      if (! $request->user()?->hasRole(...$roles)) {
        abort(403);
      }

      return $next($request);
}
}
