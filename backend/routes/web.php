<?php

use App\Http\Controllers\AdminGalleryController;
use Illuminate\Support\Facades\Route;

// Redirect root to admin dashboard
Route::get('/', function () {
    return redirect()->route('admin.gallery.index');
});

Route::prefix('admin')->group(function () {
    Route::get('/', function () {
        return redirect()->route('admin.gallery.index');
    });

    Route::get('/gallery', [AdminGalleryController::class, 'index'])->name('admin.gallery.index');
    Route::post('/gallery', [AdminGalleryController::class, 'store'])->name('admin.gallery.store');
    Route::put('/gallery/{id}', [AdminGalleryController::class, 'update'])->name('admin.gallery.update');
    Route::delete('/gallery/{id}', [AdminGalleryController::class, 'destroy'])->name('admin.gallery.destroy');
    Route::get('/setup-storage', [AdminGalleryController::class, 'setupStorage'])->name('admin.gallery.setup-storage');
});
