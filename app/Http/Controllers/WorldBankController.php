<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WorldBankController extends Controller
{
    public function fetchData(Request $request)
    {
        // Retrieve query parameters
        $selectedCountry = $request->query('selectedCountry');
        $selectedIndicator = $request->query('selectedIndicator');
        $startYear = $request->query('startYear');
        $endYear = $request->query('endYear');

        // Construct the URL
        $url = "https://api.worldbank.org/v2/country/{$selectedCountry}/indicator/{$selectedIndicator}?format=json&date={$startYear}:{$endYear}";

        // Make the HTTP request
        try {
            $response = Http::get($url);

            // Check if the response is successful
            if ($response->successful()) {
                return response()->json($response->json());
            } else {
                return response()->json(['error' => 'Failed to fetch data'], $response->status());
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}