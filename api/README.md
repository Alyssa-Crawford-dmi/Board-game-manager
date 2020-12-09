## API design

### /api/signup/{username}

GET - verifies username avalible
POST - creates a new user with the given info

### /api/login/{username}

GET - Returns the user with the given username. **IMPORTANT:** it is up to the client to verify the user returned matches the user trying to login. This means no clear text passwords are sent to the api

### /games/{listName}/{username}

GET - Returns the games list with listName associated with the current user
PUT - Updates the games list with listName associated with the current user
