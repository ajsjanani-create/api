# Webbook Mizion API (minimal)

This is a minimal REST API for the Webbook Mizion project. It includes:
- User registration and login (JWT token)
- User settings CRUD
- Simple search stub

Requirements:
- Node.js 16+
- npm

Quickstart:
1. Copy `.env.example` to `.env` and set values:
   - JWT_SECRET must be a strong secret.
2. Install deps:
   npm install
3. Start:
   npm start
   or for development with auto-reload:
   npm run dev

API examples:

Register
curl -X POST http://localhost:4000/api/auth/register -H 'Content-Type: application/json' -d '{"name":"Alice","email":"alice@example.com","password":"secret"}'

Login
curl -X POST http://localhost:4000/api/auth/login -H 'Content-Type: application/json' -d '{"email":"alice@example.com","password":"secret"}'

Get settings (use token from login)
curl http://localhost:4000/api/settings -H "Authorization: Bearer <TOKEN>"

Set a setting
curl -X POST http://localhost:4000/api/settings -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"key":"theme","value":"dark"}'

Bulk update
curl -X PUT http://localhost:4000/api/settings -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"theme":"dark","homepage":"https://example.com"}'

Search stub
curl "http://localhost:4000/api/search?q=hello+world"

Notes:
- This is a starting point. Settings are stored per-user as key/value JSON strings.
- There is no email confirmation, rate limiting, or persistent session store — add as needed.
- For production, use a real DB server, HTTPS, stronger secrets, and secure cookie storage if needed.
