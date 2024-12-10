# Base Auth API

Simple Express based API for authentication.

## Features

- **User Authentication**: Registration and login functionality with JWT.
- **Error Handling**: Custom error responses and centralized error handling middleware.
- **Database**: MySQL database.

## Depencies
- **Express.js**
- **mysql2**
- **jsonwebtoken**
- **bcryptjs**
- **http-status-codes**
- **morgan**
- **helmet**

## API Endpoints

### **Authentication Routes**

- **POST /auth/register**: Register a new user.
  - Body: 
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "securepassword",
      "role": "user"
    }
    ```

- **POST /auth/login**: Login an existing user.
  - Body: 
    ```json
    {
      "email": "john.doe@example.com",
      "password": "securepassword"
    }
    ```
