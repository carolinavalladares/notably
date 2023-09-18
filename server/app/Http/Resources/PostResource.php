<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $author = [
            'id' => $this->user->id,
            'name' => $this->user->name,
            'email' => $this->user->email,
            'image' => $this->user->image
        ];

        return [
            'content' => $this->content,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
            'likes' => $this->likes,
            'author' => $author
        ];
    }
}