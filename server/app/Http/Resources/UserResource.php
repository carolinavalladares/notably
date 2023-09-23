<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $posts = PostResource::collection($this->posts->sortByDesc(function ($post) {
            return $post->created_at;
        }));


        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'image' => $this->image,
            'created_at' => $this->created_at,
            'posts' => $posts,
            'followers' => $this->followers,
            'following' => $this->following,
            'likes' => $this->likes
        ];
    }
}