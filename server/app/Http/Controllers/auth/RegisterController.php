<?php

namespace App\Http\Controllers\auth;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RegisterController extends Controller
{
    public function register(Request $request)
    {

        // Validate request data sent by client
        $userData = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required'],
            'image' => ['required']
        ]);

        // if create user command fails send error back to client
        if (!$user = User::create($userData)) {

            abort(400, 'attempt to create user failed...');
        }


        // if it succeeds send response back to client
        return response()->json(['message' => 'user created successfully', 'user' => UserResource::make($user)], 201);


    }
}