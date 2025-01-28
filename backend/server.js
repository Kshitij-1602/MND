const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const mongoose = require("mongoose");
const pokemonRoutes = require("./routes/pokemonRoutes");
const path = require("path");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/pokemon", pokemonRoutes);

if (process.env.NODE_ENV === "production") {
    // Serve React build files
    app.use(express.static(path.join(__dirname, "../frontend/build")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
    });
  }

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
