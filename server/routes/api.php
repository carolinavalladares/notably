<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\auth\LoginController;
use App\Http\Controllers\auth\RegisterController;

// API Routes

// auth api routes
Route::prefix("/auth")->group(function () {

    // register a new user
    Route::post("/register", [RegisterController::class, 'register']);

    // log in to an existing account
    Route::post("/login", [LoginController::class, 'login']);

    // log out
    Route::get("/logout", [LoginController::class, 'logout'])->middleware("auth:sanctum");
});

// Protected routes
Route::middleware("auth:sanctum")->group(function () {

    // get the user that is currently logged in
    Route::get("/user", [UserController::class, 'currentUser']);

    // get a list of all users
    Route::get("/users", [UserController::class, 'index']);

    // get one specific user
    Route::get("/users/{user}", [UserController::class, 'show']);

    // follow a user 
    Route::get("/users/follow/{user}", [UserController::class, 'follow']);

    // unfollow a user
    Route::get('/users/unfollow/{user}', [UserController::class, 'unfollow']);

    // get posts from one specific user
    Route::get('/users/{user}/posts', [PostController::class, 'getUserPosts']);


    // get all posts
    Route::get("/posts", [PostController::class, 'index']);

    // get one specific post
    Route::get("/posts/{post}", [PostController::class, 'show']);

    // like post
    Route::get("/posts/like/{post}", [PostController::class, 'like']);

    // unlike post
    Route::get("/posts/unlike/{post}", [PostController::class, 'unlike']);

    // create a new post
    Route::post("/posts/create", [PostController::class, 'create']);

    // delete post
    Route::delete("/posts/delete/{post}", [PostController::class, 'delete']);

    // update post
    Route::put("/posts/update/{post}", [PostController::class, 'update']);


    // get user timeline
    Route::get("/timeline", [UserController::class, 'timeline']);

});


Route::get("/", function () {
    return response()->json(['message' => 'Hello, world!']);
});