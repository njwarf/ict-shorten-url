<?php

use App\Http\Controllers\LinkController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Rute Analytics (Tambahan agar menu Analytics tidak 404)
    Route::get('/analytics', function () {
        return Inertia::render('Analytics/Index'); // Sesuaikan dengan halaman analytics Anda
    })->name('analytics.index');

    Route::patch('/links/{id}/toggle-pin', [LinkController::class, 'togglePin'])
        ->name('links.toggle-pin');

    Route::resource('links', LinkController::class);
});

// Grup rute khusus Admin dengan proteksi ketat (Auth & Opsional Role Admin)
Route::middleware(['auth'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    });

require __DIR__.'/auth.php';

// PERHATIKAN: Rute dinamis /{short_code} harus selalu berada di baris paling bawah 
// agar tidak menabrak rute statis seperti /links, /analytics, atau /admin/users
Route::get('/{short_code}', [LinkController::class, 'redirect'])
    ->name('links.redirect');