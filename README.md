# ML Secured Contact Form

## Table of Contents

- [Setup](#setup)
- [User Manual](#user-manual)
  - [Create User](#create-user)
  - [Login User](#login-user)
  - [Logout User](#logout-user)
  - [Fill Contact Form](#fill-contact-form)
- [Security Related Measurements](#security-related-measurements)

---

## Setup

1. Copy the `.env.sample` file and create a `.env` file at the project root. (Feel free to modify the values in `.env`)
2. Run `docker compose up` or `docker compose up -d`.
3. Visit [http://localhost:3000](http://localhost:3000) to use the web app.

### FYI

- The Express API Server runs at port 8000.
- The MySQL server runs at port 3306.

---

## User Manual

### Create User

1. Go to [http://localhost:3000](http://localhost:3000).
2. Click the `Sign Up` button.
3. Fill in the information and click submit (make sure the consent is ticked).
   - Password must be a minimum of 8 characters long, and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (!@#$%^&\*).

### Login User

1. Go to [http://localhost:3000](http://localhost:3000).
2. Click the `Login` button.
3. Input your email and password.
4. Submit.

### Logout User

- Click the `Logout` button on the user dashboard.

### Fill Contact Form

1. Go to [http://localhost:3000/user](http://localhost:3000/user) after login.
2. Click the `Contact Form` button.
3. Fill in the information and click submit.

---

## Security Related Measurements

- **JWT Token + Http-only SameSite Cookies for Authentication**: Prevent JavaScript from accessing the cookies, reducing the risk of XSS attacks. Mitigate CSRF attacks by ensuring cookies are only sent with requests originating from the same site.
- **Cookie Expiry**: Cookies expire in 15 days to maintain a shorter lifespan, reducing the window for attackers to hijack sessions.
- **Login Attempt Blocking**: Login is blocked for 30 minutes after 3 failed attempts to mitigate bruteforce attack.
- **Password Strength Enforcement**: Password must be strong and meet specified criteria to mitigate bruteforce & dictionary attack.
- **Password Hashing with Bcrypt**: Passwords are securely hashed using bcrypt so that it wont be exposed even when database is compromised.
- **Frontend Validation with Zod**: Ensures data integrity on the client side.
- **Backend Validation with Class-validator**: Ensures data integrity on the server side.
- **Input Sanitation with Validator and Sanitize-html**: Protects against XSS and other injection attacks.
- **SQL Injection Mitigation**: Using ORM to interact with the database securely.
- **Backend Security Headers with Helmet**: Adds security headers to HTTP responses.
- **Backend API Rate Limiting**: Limits the number of requests to the API to prevent DoS and Bruteforce attack.
  - Signup API: 5 requests in 10 minutes.
  - Other APIs: 50 requests in 15 minutes.
- **Backend CORS Configuration**: Configures CORS to allow requests from trusted origins.
- **Backend Error Handling and Logging with Winston and Morgan**: Provides robust error handling and logging.
- **Frontend Route Protection**: Redirects users to login for protected routes.
- **User Consent During Signup**: Shows consent form during signup to store personal data (e.g., NRIC).
