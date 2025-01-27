const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const pokemonRoutes = require("./routes/pokemonRoutes");
const path = require("path");

app.use(express.static(path.join(__dirname, "build"))); // put this line of code in app.js

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/pokemon", pokemonRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
