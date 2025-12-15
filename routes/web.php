<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Farm Management Routes
Route::middleware('auth')->group(function () {
    Route::get('/milk-production', function () {
        return Inertia::render('MilkProduction');
    })->name('milk-production');
    
    Route::get('/milk-sale', function () {
        return Inertia::render('MilkSale');
    })->name('milk-sale');
    
    Route::get('/expenses', function () {
        return Inertia::render('Expenses');
    })->name('expenses');
    
    Route::get('/cows', function () {
        return Inertia::render('Cows');
    })->name('cows');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
