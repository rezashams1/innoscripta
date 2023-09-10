<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('/v1')->middleware('snakeCase')->group(function () {
    // auth
    Route::prefix('/auth')->group(function () {
        Route::get('/', [\App\Http\Controllers\API\AuthController::class, 'auth']);
        Route::post('/login', [\App\Http\Controllers\API\AuthController::class, 'login']);
        Route::post('/register', [\App\Http\Controllers\API\AuthController::class, 'register']);
    });

    // user
    Route::prefix('/user')->middleware('prevent.user.if.not.authed')->group(function () {
        Route::post('/preference', [\App\Http\Controllers\API\UserController::class, 'saveOrDeletePreferences']);
    });

    // news
    Route::prefix('/news')->middleware('prevent.user.if.not.authed')->group(function () {
        Route::get('/', [\App\Http\Controllers\API\NewsController::class, 'findAll']);
    });
});
