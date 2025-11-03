Famebook backend
===============

Pliki: server.js, routes/, controllers/, models/, config/

1) Skopiuj `.env.example` -> `.env` i ustaw wartości (MONGO_URI, JWT_SECRET).
2) Zainstaluj dependencies:
   npm install

3) Uruchom lokalnie w trybie deweloperskim:
   npm run dev
   (wymaga nodemon)

4) Produkcja (Docker):
   docker build -t famebook-backend .
   docker run -e MONGO_URI="..." -e JWT_SECRET="..." -p 4000:4000 famebook-backend

API (podstawowe):
 - POST /api/auth/register { username, email, password }
 - POST /api/auth/login { email, password } -> { token }
 - GET  /api/posts (auth) -> feed
 - POST /api/posts (auth) { text, mediaUrl, tags }
 - POST /api/posts/:id/like (auth)
 - POST /api/posts/:id/comment (auth) { text }
 - GET  /api/users/:id (auth)
 - POST /api/users/:id/toggle-follow (auth)
