## Route Handlers for REST API

METHOD ENDPOINT/ACTION DESCRIPTION

// Route handlers regarding posts
GET - '/parking/list' - List all posts and send them as JSON to the client.
GET - '/parking/:id' - Load single post and send them as JSON to the client.
DELETE - '/parking/:id' - Delete single post
PATCH - '/parking/:id' - Handle post editing form submission, send the edited post as JSON.
POST - '/parking/create' - Handle post creation form submission. Send the created post in JSON response.

// Route handlers regarding authentication
POST - '/authentication/sign-up' - Handle sign up form submission.
POST - '/authentication/sign-in' - Handle sign in form submission.
POST - '/authentication/sign-out' - Handle sign out form submission.
GET - '/authentication/me' - Load an the authenticated user

// Route handlers regarding rental
POST - '/rental' - Handles rental
