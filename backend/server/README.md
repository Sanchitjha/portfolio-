Modern React Blog API (Node.js + Express + MongoDB)

Endpoints
- Auth
  - POST /api/auth/register { name, email, password } -> { token, user }
  - POST /api/auth/login { email, password } -> { token, user }
- Users
  - GET /api/users/me (Bearer token) -> { user }
  - PATCH /api/users/me (Bearer token) { name?, email?, phone?, image? } -> { user }
- Posts
  - GET /api/posts?query=&tag=&limit=&page= -> { items, total, page, limit }
  - GET /api/posts/:id -> { post }
  - POST /api/posts (Bearer token) { title, content, tags? } -> { post }
  - PATCH /api/posts/:id (Bearer token) { title?, content?, tags? } -> { post }
  - DELETE /api/posts/:id (Bearer token) -> { ok: true }
  - POST /api/posts/:id/like (Bearer token) -> { post }

Quick start
1) Copy .env.example to .env and set MONGO_URI and JWT_SECRET:
   - MONGO_URI=mongodb://127.0.0.1:27017/modern-react-blog
   - JWT_SECRET=super-secret-change-me
   - CORS_ORIGIN=http://localhost:3000
2) Install and run:
   - npm install
   - npm run dev
3) Test health:
   - curl http://localhost:8080/health

Auth usage from your frontend
- Register:
  fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) })
- Login:
  fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) })
  -> Save { token } to localStorage and send "Authorization: Bearer <token>" for subsequent requests.

Replace localStorage demo with real API
- On login: call /api/auth/login, store token, user info in context.
- On profile save: call PATCH /api/users/me with token.
- On create post: POST /api/posts with token.
- On list posts: GET /api/posts (no auth required).
- On delete/update: use respective endpoints with token.

Notes
- Passwords are hashed with bcrypt.
- JWT expires in 7 days. Adjust in routes/auth.js if desired.
- This API intentionally uses URL-based avatar photo; for uploads, consider a file storage service.
