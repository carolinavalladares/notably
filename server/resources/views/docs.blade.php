<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    {{-- Tailwind --}}
    <script src="https://cdn.tailwindcss.com"></script>

    <title>Notably API | Docs</title>
</head>
<body class="bg-gray-100">


    <header class="py-4 px-4 bg-white shadow-md">
        <div class="max-w-5xl m-auto flex items-center justify-center">
            <h1 class="font-semibold text-xl">Notably API Docs</h1>
        </div>
    </header>

    <main class="max-w-5xl m-auto p-4">
        <h2 class="font-semibold text-lg text-center">API Routes</h2>


        <section>
            <h3 class="font-semibold text-lg mb-2">Auth Routes</h3>

            <div>
                <x-route-card requestData="{'name': string,'email':string,'password': string,'image':string}" 
                title="Register" method='POST' url='auth/register' description='Create a new user.' />
                <x-route-card requestData="{'email':string, 'password': string}"
                 title="Login" method='POST' url='auth/login' description='Log in to existing account.' />
                <x-route-card requestData="" title="Logout" method='GET' url='auth/logout' description='Log out.' />
            </div>
        </section>

        <section>
            <h3 class="font-semibold text-lg mb-2">Protected Routes</h3>
            <p>To access there routes you are required to be authenticated.</p>

            <div class="my-2">
                <x-route-card requestData="" title="Current user" method='GET' url='user' description='Get user currently logged in.' />
                <x-route-card requestData="" title="Get users" method='GET' url='users' description='Get a list of all users.' />
                <x-route-card requestData="" title="Get one user" method='GET' url='users/{user_id}' description='Get one specific user.' />
                <x-route-card requestData="" title="Get user suggestions" method='GET' url='suggestions' description="Get a list of ten users that the current user doen't follow yet." />
                <x-route-card requestData="" title="Get timeline" method='GET' url='timeline' description='Get posts from the accounts that the current user follows. This request returns 10 posts per page.' />
                <x-route-card requestData="{'name':string, 'image':string,'email':string, 'password'?:string}" title="Edit user" method='PATCH' url='users/edit/{user_id}' description='Edit a user.' />
                <x-route-card requestData="" title="Follow User" method='GET' url='users/follow/{user_id}' description='Follow a user.' />
                <x-route-card requestData="" title="Unfollow User" method='GET' url='users/unfollow/{user_id}' description='Unfollow a user.' />
                <x-route-card requestData="" title="Get user's posts" method='GET' url='users/{user_id}/posts' description='Get all posts from one specific user.' />
                <x-route-card requestData="" title="Get all posts" method='GET' url='posts' description='Get all existing posts.' />
                <x-route-card requestData="" title="Get one post" method='GET' url='posts/{post_id}' description='Get one specific post.' />
                <x-route-card requestData="" title="Like post" method='GET' url='posts/like/{post_id}' description='Like a post.' />
                <x-route-card requestData="" title="Unlike post" method='GET' url='posts/unlike/{post_id}' description='Unlike a post.' />
                <x-route-card requestData="{'content': string}" title="Create post" method='POST' url='posts/create' description='Create a post.' />
                <x-route-card requestData="" title="Delete post" method='DELETE' url='posts/delete/{post_id}' description='Delete a post.' />
                <x-route-card requestData="{'content':string}" title="Edit post" method='PUT' url='posts/update/{post_id}' description='Edit a post.' />
            </div>
        </section>
      
    </main>
    
    
</body>
</html>