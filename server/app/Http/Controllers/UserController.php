<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;


class UserController extends Controller
{


    // list all users
    public function index()
    {
        // get all existing users
        return UserResource::collection(User::all());
    }


    // get one user
    public function show(User $user)
    {
        // get one specific user
        return response()->json(['user' => UserResource::make($user)]);
    }

    public function currentUser()
    {

        // get user that is currently logged in
        return UserResource::make(auth()->user());
    }


    // Edit user
    public function update(Request $request, User $user)
    {

        $values = $request->validate([
            'name' => ['required'],
            "email" => ['required'],
            'image' => ['required'],
            'password' => ['sometimes', 'nullable']
        ]);



        if (auth()->user()->id != $user->id) {
            abort(401, "You do not have permission to edit this account...");
        }


        $user->update($values);

        return response()->json(['message' => 'successfully updated...'], 200);
    }


    // follow user
    public function follow(User $user)
    {

        // if the current user already follows $user return error to client
        if ($user->followers()->find(auth()->user())) {
            abort(400, 'You are already following this user ...');
        }

        // append current user in $user's followers
        $user->followers()->attach(auth()->user());

        return response()->json(['message' => "You are now following $user->name."], 200);
    }

    // unfollow user
    public function unfollow(User $user)
    {


        // if the current user does not follow $user return error to client
        if (!$user->followers()->find(auth()->user())) {
            abort(400, 'You do not follow this user...');
        }

        // remove current user from $user's followers
        $user->followers()->detach(auth()->user());

        return response()->json(['message' => "You are no longer following $user->name."], 200);
    }


    // Get timeline
    public function timeline()
    {

        // get users who have posts in current user's following field, paginate results with 10 items by page
        $usersWithPosts = auth()->user()->following()->with([
            'posts' => function ($query) {
                $query->orderby('created_at', 'desc');
                $query->paginate(10);
            }
        ])->get();


        // get posts from users in $userWithPosts 
        $timeline = PostResource::collection($usersWithPosts->flatmap(function ($value) {
            return $value->posts;
        }));


        // sort posts from newest to oldest
        $sortedTimeline = $timeline->sortByDesc(function ($post) {
            return $post->created_at;
        });


        // return timeline to client

        // this piece of code: *$sortedTimeline->values()* returns object as an array;
        return response()->json(['timeline' => $sortedTimeline->values()]);
    }


    // Get user suggestions to follow
    public function userSuggestions()
    {
        $id = auth()->user()->id;
        $authUser = UserResource::make(auth()->user());


        // get all users that are not in the authenticated user's following array, except the authenticated user
        $users = User::all()->whereNotIn("id", $authUser->following->pluck("id"))->except(["id", "==", $id]);



        if ($users->count() <= 10) {
            return $users;
        } else {
            return $users->random(10);
        }
    }
}