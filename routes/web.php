<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AllowanceController;

// Routes publiques
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/overview', [AllowanceController::class, 'index'])->name('overview');

// Routes pour les allowances
Route::get('/allowances', [AllowanceController::class, 'index'])->name('allowances.index');
Route::get('/allowances/add', function () {
    return Inertia::render('AddAllowance');
})->name('allowances.add');
Route::post('/allowances', [AllowanceController::class, 'store'])->name('allowances.store');
Route::put('/allowances/{allowance}', [AllowanceController::class, 'update'])->name('allowances.update');
Route::delete('/allowances/{allowance}', [AllowanceController::class, 'destroy'])->name('allowances.destroy');


