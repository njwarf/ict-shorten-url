<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{public function index(Request $request)
{
    $search = $request->input('search');
    $role = $request->input('role');

    $users = User::query()
        ->withCount('urls')
        ->when($search, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        })
        ->when($role, function ($query, $role) {
            $query->where('role', $role);
        })
        ->latest()
        ->paginate(10)
        ->withQueryString();

    return Inertia::render('Admin/Users/Index', [
        'users' => $users,
        'filters' => [
            'search' => $search,
            'role' => $role,
        ],
    ]);
}
}
