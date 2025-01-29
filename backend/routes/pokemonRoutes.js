const express = require("express");
const axios = require("axios");
const Pokemon = require("../models/Pokemon");
const crypto = require("crypto");

const router = express.Router();

// Fetch or search Pokemon
router.get("/search/:name", async (req, res) => {
  const { name } = req.params;
  const pokemonName = name.toLowerCase().trim();
  try {
    let pokemon = await Pokemon.findOne({ name: pokemonName });

    if (!pokemon) {
      const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
      const response = await axios.get(url);
      const data = response.data;
      pokemon = await Pokemon.create({
        name: data.name.toLowerCase(),
        data: data
    });

    }
    res.json(pokemon);
  } catch (error) {
    res.status(404).json({ message: `Pokemon not found ${error}` });
  }
});


const dailyRandomId = (userIdentifier = "default") => {
  const today = new Date();
  const dateSeed = today.getFullYear() * 10000 + today.getMonth() * 100 + today.getDate();
  const hash = crypto.createHash("md5").update(userIdentifier).digest("hex");
  const userSeed = parseInt(hash.substring(0, 8), 16); 
  const randomId = (dateSeed + userSeed) % 1010 + 1; 
  return randomId;
};

router.get("/random", async (req, res) => {
  try {
    const userIp = req.ip || req.headers["x-forwarded-for"] || "default";
    const randomId = dailyRandomId(userIp); 
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching random Pokemon" });
  }
});

module.exports = router;
