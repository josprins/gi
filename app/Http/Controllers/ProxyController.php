<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ProxyController extends Controller
{
    public function fetchGDP()
    {
        $response = Http::get('https://api.worldbank.org/v2/country/BR/indicator/NY.GDP.MKTP.CD?format=json&date=2010:2022');
        return response()->json($response->json());
    }
}