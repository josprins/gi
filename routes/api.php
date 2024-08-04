<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProxyController;

// Ensure the controller is imported and the route is correct
Route::get('/proxy/gdp', [ProxyController::class, 'fetchGDP']);