# Backend API Documentation

## User Registration Endpoint

### POST /user/register

This endpoint is used to register a new user.

#### Request Body

The request body should be a JSON object containing the following fields:

- `fullName`: An object containing the user's first and last name.
  - `firstName`: A string representing the user's first name. It must be at least 3 characters long.
  - `lastName`: A string representing the user's last name. It must be at least 3 characters long.
- `email`: A string representing the user's email. It must be a valid email address.
- `password`: A string representing the user's password. It must be at least 6 characters long.

  **Example:**

  ```json
  {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### Response

- `201 Created`: The user was successfully created.

  - `Body`: A JSON object containing the created user and an authentication token.
- `400 Bad Request`: The request body is invalid or missing required fields.

  - `Body`: A JSON object containing an array of error messages.

  **Example (201 Created):**

  ```json
  {
    "user": {
      "_id": "60c72b2f9b1d8e001c8e4b8b",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

  **Example (400 Bad Request):**

  ```json
  {
    "errors": [
      {
        "msg": "Please enter a valid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullName.firstName",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

## User Login Endpoint

### POST /user/login

This endpoint is used to authenticate an existing user.

#### Request Body

The request body should be a JSON object containing the following fields:

- `email`: A string representing the user's email. It must be a valid email address.
- `password`: A string representing the user's password. It must be at least 6 characters long.

  **Example:**

  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### Response

- `200 OK`: The user was successfully authenticated.

  - `Body`: A JSON object containing the authenticated user and an authentication token.
- `400 Bad Request`: The request body is invalid or missing required fields.

  - `Body`: A JSON object containing an array of error messages.
- `401 Unauthorized`: The credentials provided are invalid.

  - `Body`: A JSON object with a message indicating invalid credentials.

  **Example (200 OK):**

  ```json
  {
    "user": {
      "_id": "60c72b2f9b1d8e001c8e4b8b",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

  **Example (400 Bad Request):**

  ```json
  {
    "errors": [
      {
        "msg": "Please enter a valid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

  **Example (401 Unauthorized):**

  ```json
  {
    "message": "Invalid Credentials"
  }
  ```

## User Profile Endpoint

### GET /users/profile

This endpoint is used to retrieve the authenticated user's profile.

#### Request Headers

- `Authorization`: A string containing the Bearer token for authentication.

#### Response

- `200 OK`: The user's profile was successfully retrieved.

  - `Body`: A JSON object containing the user's profile information.

- `401 Unauthorized`: The user is not authenticated or the token is invalid.

  - `Body`: A JSON object with a message indicating the user is not authorized to access this route.

  **Example (200 OK):**

  ```json
  {
    "user": {
      "_id": "60c72b2f9b1d8e001c8e4b8b",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

  **Example (401 Unauthorized):**

  ```json
  {
    "message": "Not authorized to access this route"
  }
  ```

## User Logout Endpoint

### GET /users/logout

This endpoint is used to log out the authenticated user.

#### Request Headers

- `Authorization`: A string containing the Bearer token for authentication.

#### Response

- `200 OK`: The user was successfully logged out.

  - `Body`: A JSON object with a message indicating the user was logged out successfully.

- `401 Unauthorized`: The user is not authenticated or the token is invalid.

  - `Body`: A JSON object with a message indicating the user is not authorized to access this route.

  **Example (200 OK):**

  ```json
  {
    "message": "Logged out successfully"
  }
  ```

  **Example (401 Unauthorized):**

  ```json
  {
    "message": "Not authorized to access this route"
  }
  ```
