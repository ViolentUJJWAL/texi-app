# Authentication API Documentation

This documentation outlines the authentication endpoints for both users and captains in the system.

## Endpoints

### 1. Register User/Captain
**Endpoint:** `POST /auth/register`

#### Request Body
The request body varies based on the role:

**For Users:**
```json
{
    "role": "user",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "password": "password123"
}
```

**For Captains:**
```json
{
    "role": "captain",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "phone": "1234567890",
    "password": "password123",
    "vehicleType": "car",
    "vehicleNumber": "ABC123",
    "vehicleModel": "Toyota Camry",
    "vehicleColor": "black"
}
```

#### Validation Rules
- Name: Required, minimum 3 characters
- Email: Valid email format
- Password: Minimum 6 characters
- Phone: 10-12 digits, numbers only
- Vehicle details (captain only): All fields required

#### Success Response
**For Users:**
```json
{
    "user": {
        "email": "john@example.com",
        "name": "John Doe",
        "phone": "1234567890"
    },
    "token": "jwt_token_here"
}
```

**For Captains:**
```json
{
    "captain": {
        "email": "john.smith@example.com",
        "name": "John Smith",
        "phone": "1234567890",
        "vehicle": {
            "vehicleType": "car",
            "vehicleNumber": "ABC123",
            "vehicleModel": "Toyota Camry",
            "vehicleColor": "black"
        }
    },
    "token": "jwt_token_here"
}
```

#### Error Responses
```json
{
    "error": "Please provide all fields"
}
```
```json
{
    "error": "User already exists"
}
```
```json
{
    "error": "Vehicle number already exists"
}
```

### 2. Login User/Captain
**Endpoint:** `POST /auth/login`

#### Request Body
```json
{
    "role": "user", // or "captain"
    "email": "john@example.com",
    "password": "password123"
}
```

#### Validation Rules
- Email: Valid email format
- Password: Required

#### Success Response
**For Users:**
```json
{
    "user": {
        "email": "john@example.com",
        "name": "John Doe",
        "phone": "1234567890"
    },
    "token": "jwt_token_here"
}
```

**For Captains:**
```json
{
    "captain": {
        "email": "john.smith@example.com",
        "name": "John Smith",
        "phone": "1234567890",
        "vehicle": {
            "vehicleType": "car",
            "vehicleNumber": "ABC123",
            "vehicleModel": "Toyota Camry",
            "vehicleColor": "black"
        }
    },
    "token": "jwt_token_here"
}
```

#### Error Responses
```json
{
    "error": "Please provide all fields"
}
```
```json
{
    "error": "Invalid credentials"
}
```

### 3. Logout
**Endpoint:** `POST /auth/logout`

#### Success Response
```json
{
    "message": "Logged out"
}
```

## Security Features
- Password hashing (implemented in the User/Captain models)
- JWT token generation for authentication
- HTTP-only secure cookies for token storage
- Input validation using express-validator
- Duplicate email and phone number checking
- Duplicate vehicle number checking for captains


##

##


# Profile API Documentation

This documentation outlines the profile management endpoints for both users and captains in the system.

## Endpoints

### 1. Get Profile
**Endpoint:** `GET /profile/me`

Retrieves the profile information for the authenticated user or captain.

#### Headers
```
Authorization: Bearer <token>
```

#### Success Response
**For Users:**
```json
{
    "profile": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890"
    }
}
```

**For Captains:**
```json
{
    "profile": {
        "name": "John Smith",
        "email": "john.smith@example.com",
        "phone": "1234567890",
        "isAvailable": true,
        "isActivate": true,
        "location": {
            "lat": 12.345,
            "long": 67.890
        },
        "vehicle": {
            "vehicleType": "car",
            "vehicleNumber": "TN01AB1234",
            "vehicleModel": "Toyota Camry",
            "vehicleColor": "black"
        }
    }
}
```

#### Error Responses
```json
{
    "error": "user not found"
}
```

### 2. Update User Profile
**Endpoint:** `PUT /profile/user`

Updates the profile information for authenticated users.

#### Headers
```
Authorization: Bearer <token>
```

#### Request Body
All fields are optional:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
}
```

#### Validation Rules
- Name: Minimum 3 characters
- Email: Valid email format
- Phone: 10-12 digits, numbers only

#### Success Response
```json
{
    "profile": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890"
    }
}
```

### 3. Update Captain Profile
**Endpoint:** `PUT /profile/captain`

Updates the profile information for authenticated captains.

#### Headers
```
Authorization: Bearer <token>
```

#### Request Body
All fields are optional:
```json
{
    "name": "John Smith",
    "email": "john.smith@example.com",
    "phone": "1234567890",
    "vehicleType": "car",
    "vehicleNumber": "TN01AB1234",
    "vehicleModel": "Toyota Camry",
    "vehicleColor": "black",
    "isAvailable": true,
    "isActivate": true,
    "location": {
        "lat": 12.345,
        "long": 67.890
    }
}
```

#### Validation Rules
- Name: Minimum 3 characters
- Email: Valid email format
- Phone: 10-12 digits, numbers only
- Vehicle Type: Must be one of: "bike", "car", "auto"
- Vehicle Number: Must match format "TN01AB1234"
- Vehicle Model: Minimum 3 characters
- Vehicle Color: Minimum 3 characters
- isAvailable: Boolean
- isActivate: Boolean
- Location: Latitude and longitude must be valid float numbers

#### Success Response
```json
{
    "profile": {
        "name": "John Smith",
        "email": "john.smith@example.com",
        "phone": "1234567890",
        "isAvailable": true,
        "isActivate": true,
        "location": {
            "lat": 12.345,
            "long": 67.890
        },
        "vehicle": {
            "vehicleType": "car",
            "vehicleNumber": "TN01AB1234",
            "vehicleModel": "Toyota Camry",
            "vehicleColor": "black"
        }
    }
}
```

### 4. Change Password
**Endpoint:** `PUT /profile/change-password`

Changes the password for authenticated users or captains.

#### Headers
```
Authorization: Bearer <token>
```

#### Request Body
```json
{
    "oldPassword": "currentPassword123",
    "newPassword": "newPassword123"
}
```

#### Validation Rules
- Old Password: Required
- New Password: Minimum 6 characters

#### Success Response
```json
{
    "message": "Password changed successfully"
}
```

#### Error Responses
Common error responses for all endpoints:
```json
{
    "error": "Email or phone number already in use"
}
```
```json
{
    "error": "Vehicle number already exists"
}
```
```json
{
    "error": "Invalid old password"
}
```
```json
{
    "error": "Invalid user type"
}
```

## Security Features
- Authentication middleware (authCheck) for all endpoints
- Input validation using express-validator
- Duplicate email and phone number checking
- Duplicate vehicle number checking for captains
- Password verification before password change
- Secure password update mechanism


##
##

