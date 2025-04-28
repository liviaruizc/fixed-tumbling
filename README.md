
# Tumbling

**Tumbling** is a secure web-based blogging platform that allows users to register, edit profiles, and create posts.  
This project focuses on improving cybersecurity measures by addressing common web vulnerabilities.

## Features
- User Registration and Login
- Profile Management
- Post Creation and Display
- Profile Picture Upload
- Secure Session Management
- Strong Input Validation

## Technologies Used
- **HTML5** and **CSS3** for front-end structure and design
- **JavaScript** for interactive functionality and authentication logic
- **LocalStorage API** for temporary session management (secured)
- **Web Crypto API (SubtleCrypto)** for password hashing
- **Chrome DevTools** for vulnerability testing and debugging

## Security Improvements

### 1. LocalStorage Exposure
- Reduced sensitive data stored in localStorage.
- Improved login/logout flow to minimize data exposure.

### 2. Weak Input Validation
- Added validation for all user inputs like posts, bios, and profile information.
- Prevented browser crashes and injection attacks.

### 3. Insecure Login Logic
- Implemented token-based authentication.
- Validated session data on each secure page load.

### 4. No Password Hashing
- Passwords are now hashed using **SHA-256** before being stored.
- No plaintext passwords are saved or compared.

### 5. No Authentication Enforcement
- Secure login validation by checking for both a valid token and username.
- Redirect users if session information is invalid or missing.

### 6. File Upload Risks
- Restricted allowed file types to JPEG and PNG.
- Set maximum file size limits to prevent oversized uploads.

### 7. No Password Requirements
- Enforced strong password rules during registration:
  - Minimum 8 characters
  - Must include uppercase letters
  - Must include lowercase letters
  - Must include numbers
  - Must include special characters

## How to Run

1. Clone or download the repository.
2. Open `index.html` in your preferred web browser.
3. Register a new account with a strong password.
4. Log in to access your profile and create posts.
5. Upload a secure profile picture and manage your posts.

## Future Enhancements
- Implement full server-side authentication and data storage.
- Move session management to HTTP-only secure cookies.
- Add role-based access control (e.g., admin and user roles).
- Develop full backend API integration for improved security.

---
