<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Log;

class LogRequest
{
    public function handle(Request $request, Closure $next)
    {
        Log::info('Request Headers:', $request->headers->all());
        return $next($request);
    }
}