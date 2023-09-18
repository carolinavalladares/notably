<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // validate data from the request
        $loginData = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        // if login fails send error back to client
        if (!auth()->attempt($loginData)) {

            abort(401, 'user login failed... Unauthorized.');

        }

        // if login is successful generate a token
        $token = auth()->user()->createToken('auth_token')->plainTextToken;


        // send token back to client
        return response()->json(['message' => 'user successfully logged in.', 'token' => $token], 200);
    }

    public function logout()
    {
        // get current token being used and delete it
        auth()->user()->currentAccessToken()->delete();

        // send response back to client
        return response()->json(['message' => 'user successfully logged out...'], 200);
    }
}