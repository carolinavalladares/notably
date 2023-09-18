<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;

class PostController extends Controller
{

    public function index()
    {
        // get all posts
        return PostResource::collection(Post::all());
    }

    public function show(Post $post)
    {
        // get one specific post
        return response()->json(['post' => PostResource::make($post)]);
    }

    public function getUserPosts(User $user)
    {
        // get every post that have the user as its author
        $posts = Post::where('user_id', $user->id)->get();

        return response()->json(['posts' => PostResource::collection($posts)]);
    }

    public function create(Request $request)
    {
        // validate data sent
        $postData = $request->validate([
            'content' => ['required']
        ]);

        // create post
        $post = Post::create(['content' => $postData['content'], 'user_id' => auth()->user()->id]);

        return response()->json(['message' => 'post created successfully.', 'post' => $post], 201);
    }

    public function delete(Post $post)
    {
        // if user is not the author of the post they can't delete it
        if ($post['user_id'] != auth()->user()->id) {
            abort(401, "You don't have permission to delete this post...");
        }

        $post->delete();

        return response()->json(['message' => 'successfully deleted post']);
    }

    public function update(Request $request, Post $post)
    {
        // validate data sent 
        $values = $request->validate([
            'content' => ['required']
        ]);

        // if user is not the author of the post they can't edit it
        if ($post['user_id'] != auth()->user()->id) {
            abort(401, "You don't have permission to edit this post...");
        }

        $post->update($values);


        return response()->json(['message' => 'post updated successfully...'], 200);
    }


    public function like(Post $post)
    {

        // if user already liked post return error to client
        if ($post->likes()->find(auth()->user())) {
            abort(400, 'You already liked this post...');
        }

        // like a post
        $post->likes()->attach(auth()->user());

        return response()->json(['message' => 'successfully liked post.'], 200);
    }


    public function unlike(Post $post)
    {

        // if user did not like post return error to client
        if (!$post->likes()->find(auth()->user())) {
            abort(400, 'You did not like this post...');
        }
        // unlike a post
        $post->likes()->detach(auth()->user());

        return response()->json(['message' => 'successfully unliked post.'], 200);
    }
}