<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminGalleryController;
use Illuminate\Support\Facades\Route;

// Redirect root of backend to admin
Route::get('/', function () {
    return redirect()->route('admin.gallery.index');
});

// Admin Authentication Routes
Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('admin.login.submit');
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

    // Protected Admin Portal
    Route::middleware('auth')->group(function () {
        Route::get('/', function () {
            return redirect()->route('admin.gallery.index');
        });

        Route::get('/gallery', [AdminGalleryController::class, 'index'])->name('admin.gallery.index');
        Route::post('/gallery', [AdminGalleryController::class, 'store'])->name('admin.gallery.store');
        Route::put('/gallery/{id}', [AdminGalleryController::class, 'update'])->name('admin.gallery.update');
        Route::delete('/gallery/{id}', [AdminGalleryController::class, 'destroy'])->name('admin.gallery.destroy');
        Route::get('/setup-storage', [AdminGalleryController::class, 'setupStorage'])->name('admin.gallery.setup-storage');
    });
});
