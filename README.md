# Notably

### Project setup

1. run `npm install` command in the root directory of the project;
2. create a **database.sqlite** file in **server/database** folder;
3. create a **.env.local** file in client directory and add api route variable: **NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api** ;
4. run `npm run setup` command in the root directory;

After following these steps the project is ready, you can start the project by running `npm run start` in the root directory, the client will be up and running at **localhost:3000** and the server will be up and running at **localhost:8000**.
