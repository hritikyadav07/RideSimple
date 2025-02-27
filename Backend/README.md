# Backend Overview

This backend is built using Node.js and Express. It manages user, captain, ride, and mapping functionalities.

## Setup and Connection Guide

1. Clone the repository.
2. Navigate to the backend directory: cd /d:/Projects/RideSimple/Backend
3. Install dependencies: npm install
4. Configure environment variables: create/edit .env as needed.
5. Start the server: npx nodemon
6. Test endpoints using tools like Postman.

## Socket.io Integration

This backend uses Socket.io for real-time communication. When users or captains connect, their socket ids are stored, enabling:
- User connection and notifications.
- Real-time ride updates for captains.
- Location updates from captains during rides.

# Backend API Documentation

## `/users/register` Endpoint

### Description

Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters).
  - `lastname` (string, optional): User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

## `/users/login` Endpoint

### Description

Authenticates a user using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

## `/users/profile` Endpoint

### Description

Retrieves the profile information of the currently authenticated user.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Example Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).

## `/users/logout` Endpoint

### Description

Logout the current user and blacklist the token provided in cookie or headers

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header or cookie:

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token


## `/captains/register` Endpoint

### Description

Registers a new captain by creating a captain account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): Captain's first name (minimum 3 characters).
  - `lastname` (string, optional): Captain's last name (minimum 3 characters).
- `email` (string, required): Captain's email address (must be a valid email).
- `password` (string, required): Captain's password (minimum 6 characters).
- `vehicle` (object):
  - `color` (string, required): Vehicle color (minimum 3 characters).
  - `plate` (string, required): Vehicle plate number (minimum 3 characters).
  - `capacity` (number, required): Vehicle passenger capacity (minimum 1).
  - `vehicleType` (string, required): Type of vehicle (must be 'car', 'motorcycle', or 'auto').

### Example Response

- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).   
  - `email` (string): Captain's email address (must be a valid email).
  - `password` (string): Captain's password (minimum 6 characters).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.
- `token` (String): JWT Token

## `/captains/login` Endpoint

### Description

Authenticates a captain using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): Captain's email address (must be a valid email).
- `password` (string, required): Captain's password (minimum 6 characters).

### Example Response

- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).   
  - `email` (string): Captain's email address (must be a valid email).
  - `password` (string): Captain's password (minimum 6 characters).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.
- `token` (String): JWT Token


## `/captains/profile` Endpoint

### Description

Retrieves the profile information of the currently authenticated captain.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Example Response

- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).   
  - `email` (string): Captain's email address (must be a valid email).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.

## `/captains/logout` Endpoint

### Description

Logout the current captain and blacklist the token provided in cookie or headers.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header or cookie.

### Example Response

- `message` (string): Logout successfully.

## `/rides/create` Endpoint

### Description
Creates a new ride request. Requires a valid JWT token.

### HTTP Method
`POST`

### Request Body
The request body should be in JSON format and include the following fields:
- `pickup` (string, required): Pickup location (minimum 3 characters).
- `destination` (string, required): Destination location (minimum 3 characters).
- `vehicleType` (string, required): Must be one of [ 'auto', 'car', 'moto' ].

### Example Response
- `ride` (object):
  - `id` (string): Ride identifier.
  - `pickup` (string): Pickup location.
  - `destination` (string): Destination location.
  - `vehicleType` (string): Type of vehicle.
  - `status` (string): Current status of the ride.


## `/rides/get-fare` Endpoint

### Description
Retrieves fare estimate for a given ride based on pickup and destination locations.

### HTTP Method
`GET`

### Query Parameters
- `pickup` (string, required): Pickup location (minimum 3 characters).
- `destination` (string, required): Destination location (minimum 3 characters).

### Authentication
Requires a valid JWT token in the Authorization header.

### Example Response
- `fare` (string): Estimated fare for the ride.



## `/rides/confirm` Endpoint

### Description
Confirms a ride request by the captain.

### HTTP Method
`POST`

### Request Body
The request body should be in JSON format and include:
- `rideId` (string, required): Valid ride identifier (MongoId).

### Authentication
Requires a valid JWT token in the Authorization header for a captain.

### Example Response
- `ride` (object): Updated ride details after confirmation.



## `/rides/start-ride` Endpoint

### Description
Starts the ride after validating the OTP.

### HTTP Method
`GET`

### Query Parameters
- `rideId` (string, required): Valid ride identifier (MongoId).
- `otp` (string, required): One-time password (6 digits).

### Authentication
Requires a valid JWT token in the Authorization header for a captain.

### Example Response
- `ride` (object): Ride details with updated status.



## `/rides/end-ride` Endpoint

### Description
Ends the ongoing ride.

### HTTP Method
`POST`

### Request Body
The request body should be in JSON format and include:
- `rideId` (string, required): Valid ride identifier (MongoId).

### Authentication
Requires a valid JWT token in the Authorization header for a captain.

### Example Response
- `ride` (object): Ride details with final status.



## `/maps/get-coordinates` Endpoint

### Description
Retrieves latitude and longitude coordinates for a given address.

### HTTP Method
`GET`

### Endpoint
`/maps/get-coordinates`

### Query Parameters
- `address` (string, required): Address to search (minimum 3 characters).

### Authentication
Requires a valid JWT token in the Authorization header.

### Example Response
- `coordinates` (object):
  - `lat` (number): Latitude.
  - `lng` (number): Longitude.



## `/maps/get-distance-time` Endpoint

### Description
Calculates distance and estimated travel time between the origin and destination.

### HTTP Method
`GET`


### Query Parameters
- `origin` (string, required): Starting location (minimum 3 characters).
- `destination` (string, required): Destination location (minimum 3 characters).

### Authentication
Requires a valid JWT token in the Authorization header.

### Example Response
- `distance` (string): Distance between the locations.
- `duration` (string): Estimated travel time.



## `/maps/get-suggestions` Endpoint

### Description
Provides autocomplete suggestions for addresses based on partial input.

### HTTP Method
`GET`


### Query Parameters
- `input` (string, required): Partial address input. Must be at least 3 characters.

### Authentication
Requires a valid JWT token in the Authorization header.

### Example Response
{
  "suggestions": [
    "123 Main St, City, Country",
    "124 Main St, City, Country"
  ]
}