<?php

use App\Models\atom;
use Illuminate\Http\Request;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('atoms', function (Request $request) {
    return atom::all();
});
Route::post('atom', function (Request $request) {
    $atom=Atom::create($request->all());
    return response()->json($atom,201);
});