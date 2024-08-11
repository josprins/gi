<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WorldBankController;

// Ensure the controller is imported and the route is correct
Route::get('/data', [WorldBankController::class, 'fetchData']);