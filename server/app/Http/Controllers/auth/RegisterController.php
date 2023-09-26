<?php

namespace App\Http\Controllers\auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Validator;


class RegisterController extends Controller
{
    public function register(Request $request)
    {



        $validation = Validator::make($request->all(), [
            'name' => ['required'],
            'email' => ['required', 'email', 'unique'],
            'password' => 'required',
            'image' => 'required'
        ], [
            'name.required' => 'Missing input in the Name',
            'email.required' => 'Missing input in Email',
            'password.required' => "password is required",
            'image.required' => 'image is required',
            'name.unique' => 'name must be unique',
            'email.unique' => 'email must be unique',

        ]);




        $sameName = User::where('name', "LIKE", $request->name . '%')->get();

        $name = '';

        if ($sameName->count() > 0) {
            $name = "{$request->name}{$sameName->count()}";
        } else {
            $name = $request->name;
        }


        $userData = [
            'name' => strtolower($name),
            'email' => $request->email,
            'password' => $request->password,
            'image' => $request->image,
        ];




        // if create user command fails send error back to client
        if (!$user = User::create($userData)) {

            abort(400, 'attempt to create user failed...');
        }


        // if it succeeds send response back to client
        return response()->json(['message' => 'user created successfully', 'user' => UserResource::make($user)], 201);


    }
}