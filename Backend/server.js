const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Weather API Route
app.get("/api/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("API Error Details:", error.response?.data || error.message);
    const statusCode = error.response?.status || 500;
    const message = error.response?.data?.message || "Server error";
    res.status(statusCode).json({ message });
  }
});

app.listen(PORT, () => {
  console.log(`Weather server running on port ${PORT}`);
});