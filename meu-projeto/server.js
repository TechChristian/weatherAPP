require("dotenv").config();
const express = require("express");
const path = require("path");

// Import correto do fetch para Node.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 50938;

// Servir frontend
app.use(express.static(path.join(__dirname, "public")));

// Rota backend para clima
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=pt&appid=${apiKey}`
    );

    if (!response.ok) throw new Error("Cidade não encontrada");

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err); // loga o erro no terminal
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
