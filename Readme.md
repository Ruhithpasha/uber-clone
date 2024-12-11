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

## Captain Registration Endpoint

### POST /captains/register

This endpoint is used to register a new captain.

#### Request Body

The request body should be a JSON object containing the following fields:

- `fullName`: An object containing the captain's first and last name.
  - `firstName`: A string representing the captain's first name. It must be at least 3 characters long.
  - `lastName`: A string representing the captain's last name. It must be at least 3 characters long.
- `email`: A string representing the captain's email. It must be a valid email address.
- `password`: A string representing the captain's password. It must be at least 6 characters long.
- `vehicle`: An object containing the vehicle details.
  - `colour`: A string representing the vehicle's colour. It must be at least 3 characters long.
  - `capacity`: A number representing the vehicle's capacity. It must be at least 1.
  - `plate`: A string representing the vehicle's plate. It must be at least 3 characters long.
  - `vehicleType`: A string representing the vehicle type. It must be one of `car`, `bike`, or `auto`.

  **Example:**

  ```json
  {
    "fullName": {
      "firstName": "Ruhith",
      "lastName": "Pasha"
    },
    "email": "Rp@rp.com",
    "password": "1234587676",
    "vehicle": {
      "colour": "Red",
      "capacity": 1,
      "plate": "Ka293dsv",
      "vehicleType": "auto"
    }
  }
  ```

#### Response

- `201 Created`: The captain was successfully created.

  - `Body`: A JSON object containing the created captain and an authentication token.

  **Example (201 Created):**

  ```json
  {
    "captain": {
      "_id": "60c72b2f9b1d8e001c8e4b8b",
      "fullName": {
        "firstName": "Ruhith",
        "lastName": "Pasha"
      },
      "email": "Rp@rp.com",
      "vehicle": {
        "colour": "Red",
        "capacity": 1,
        "plate": "Ka293dsv",
        "vehicleType": "auto"
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- `400 Bad Request`: The request body is invalid or missing required fields.
 -  `Body`:A JSON object containing an array of error messages.

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
      },
      {
        "msg": "Colour must be at least 3 characters long",
        "param": "vehicle.colour",
        "location": "body"
      },
      {
        "msg": "Capacity must be a number",
        "param": "vehicle.capacity",
        "location": "body"
      },
      {
        "msg": "Plate must be at least 3 characters long",
        "param": "vehicle.plate",
        "location": "body"
      },
      {
        "msg": "Vehicle type must be car or bike or auto",
        "param": "vehicle.vehicleType",
        "location": "body"
      }
    ]
  }
  ```
- `401 Unauthorized`:The credentials provided are invalid.
-  `Body`:A JSON object with a message indicating invalid credentials.

**Example (401 Unauthorized):**
``` json
{
  "message": "Invalid Credentials"
}
```

**Example (401 Unauthorized):**
``` json
{
  "message": "Not authorized to access this route"
}
```
## Captain Login Endpoint

### POST /captains/login

This endpoint is used to authenticate an existing captain.

#### Request Body

The request body should be a JSON object containing the following fields:

- `email`: A string representing the captain's email. It must be a valid email address.
- `password`: A string representing the captain's password. It must be at least 6 characters long.

  **Example:**

  ```json
  {
    "email": "Rp@rp.com",
    "password": "1234587676"
  }
  ```

#### Response

- `200 OK`: The captain was successfully authenticated.

  - `Body`: A JSON object containing the authenticated captain and an authentication token.
- `400 Bad Request`: The request body is invalid or missing required fields.

  - `Body`: A JSON object containing an array of error messages.
- `401 Unauthorized`: The credentials provided are invalid.

  - `Body`: A JSON object with a message indicating invalid credentials.

  **Example (200 OK):**

  ```json
  {
    "captain": {
      "_id": "60c72b2f9b1d8e001c8e4b8b",
      "fullName": {
        "firstName": "Ruhith",
        "lastName": "Pasha"
      },
      "email": "Rp@rp.com",
      "vehicle": {
        "colour": "Red",
        "capacity": 1,
        "plate": "Ka293dsv",
        "vehicleType": "auto"
      }
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

  ## Captain Profile Endpoint

  ### GET /captains/profile

  This endpoint is used to retrieve the authenticated captain's profile.

  #### Request Headers

  - `Authorization`: A string containing the Bearer token for authentication.

  #### Response

  - `200 OK`: The captain's profile was successfully retrieved.

    - `Body`: A JSON object containing the captain's profile information.

  - `401 Unauthorized`: The captain is not authenticated or the token is invalid.

    - `Body`: A JSON object with a message indicating the captain is not authorized to access this route.

    **Example (200 OK):**

    ```json
    {
      "captain": {
        "_id": "60c72b2f9b1d8e001c8e4b8b",
        "fullName": {
          "firstName": "Ruhith",
          "lastName": "Pasha"
        },
        "email": "Rp@rp.com",
        "vehicle": {
          "colour": "Red",
          "capacity": 1,
          "plate": "Ka293dsv",
          "vehicleType": "auto"
        }
      }
    }
    ```

    **Example (401 Unauthorized):**

    ```json
    {
      "message": "Not authorized to access this route"
    }
    ```

    ## Captain Logout Endpoint

    ### GET /captains/logout

    This endpoint is used to log out the authenticated captain.

    #### Request Headers

    - `Authorization`: A string containing the Bearer token for authentication.

    #### Response

    - `200 OK`: The captain was successfully logged out.

      - `Body`: A JSON object with a message indicating the captain was logged out successfully.

    - `401 Unauthorized`: The captain is not authenticated or the token is invalid.

      - `Body`: A JSON object with a message indicating the captain is not authorized to access this route.

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