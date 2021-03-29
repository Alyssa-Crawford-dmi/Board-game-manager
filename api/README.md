## API design

### /api/signup/{username}

GET - verifies username available
POST - creates a new user with the given info

### /api/login/{username}

GET - Returns the user with the given username. **IMPORTANT:** it is up to the client to verify the user returned matches the user trying to login. This means no clear text passwords are sent to the api

### /games/{listName}/{username}

GET - Returns the games list with listName associated with the current user
PUT - Updates the games list with listName associated with the current user

### /friends/{person1}/{person2}/{invitee}

Person1 should come before person2 in the alphabet

POST - Creates a new pending friend relationship
PUT - Accepts the friend request

### /friends/{currentUser}

GET - Gets all the friends for the current user

## Versions known to work

Running azure functions locally requires core tools, azure functions, and node. Only some version combinations work. Versions used:
Core tools: 3.0.3388
Function runtime version: 3.0.15371.0
Node: 14.16
