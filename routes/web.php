<?php

use App\Http\Controllers\AllowanceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Main pages
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/overview', [AllowanceController::class, 'index'])->name('overview');
Route::get('/allowances/add', function () {
    return Inertia::render('AddAllowance');
})->name('allowances.add');

// CRUD operations for allowances
Route::post('/allowances', [AllowanceController::class, 'store'])->name('allowances.store');
Route::put('/allowances/{allowance}', [AllowanceController::class, 'update'])->name('allowances.update');
Route::delete('/allowances/{allowance}', [AllowanceController::class, 'destroy'])->name('allowances.destroy');



