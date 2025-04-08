<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Configuration;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/configurations/working-hours-per-day', function () {
    return response()->json([
        'value' => Configuration::getValue('working_hours_per_day', 8)
    ]);
});
