<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

// RESTful resource routes -> maps to index/show/store/update/destroy
Route::apiResource('tasks', TaskController::class);
