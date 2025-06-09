<?php

use App\Http\Controllers\Api\ArticleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('articles')->group(function () {
    Route::get('/', [ArticleController::class, 'index']);
    Route::post('/sync', [ArticleController::class, 'sync']);
    Route::get('/{slug}', [ArticleController::class, 'show']);
    Route::post('/{slug}/archive', [ArticleController::class, 'archive']);
}); 