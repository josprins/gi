<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProxyController extends Controller
{
    public function fetchGDP()
    {
        try {
            $response = Http::get('https://api.worldbank.org/v2/');

            // Check if the response is successful
            if ($response->successful()) {
                return response()->json($response->json());
            } else {
                // Log the error response
                Log::error('Failed to fetch GDP data', ['status' => $response->status(), 'body' => $response->body()]);
                return response()->json(['error' => 'Failed to fetch GDP data'], $response->status());
            }
        } catch (\Exception $e) {
            // Log exception message
            Log::error('Exception occurred while fetching GDP data', ['message' => $e->getMessage()]);
            return response()->json(['error' => 'An error occurred while fetching GDP data'], 500);
        }
    }
}