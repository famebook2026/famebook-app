// backend/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Prosty testowy endpoint
app.get("/", (req, res) => {
  res.send("✅ Famebook backend działa!");
});

// Połączenie z MongoDB
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/famebook";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("🟢 Połączono z MongoDB");
    app.listen(PORT, () => console.log(`🚀 Serwer działa na porcie ${PORT}`));
  })
  .catch((err) => console.error("🔴 Błąd połączenia z MongoDB:", err));
