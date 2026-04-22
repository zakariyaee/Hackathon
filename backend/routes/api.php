<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\TeamController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Registration ouvert au public avec sécurité (20 par minute globales)
Route::post('/register', [TeamController::class, 'store'])->middleware('throttle:20,1');
Route::get('/track/{tracking_number}', [TeamController::class, 'track']);

// Routes protégées par l'authentification admin
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/teams', [TeamController::class, 'index']);
    Route::get('/stats', [TeamController::class, 'stats']);
    Route::get('/export', [TeamController::class, 'export']);
    Route::put('/teams/{team}/status', [TeamController::class, 'updateStatus']);
});
