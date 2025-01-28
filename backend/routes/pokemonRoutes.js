const express = require("express");
const axios = require("axios");
const Pokemon = require("../models/Pokemon");

const router = express.Router();

// Fetch or search Pokemon
router.get("/search/:name", async (req, res) => {
  const { name } = req.params;
  const pokemonName = name.toLowerCase().trim();
  try {
    // Check if Pokemon exists in DB
    let pokemon = await Pokemon.findOne({ name: pokemonName });

    if (!pokemon) {
      // Fetch from PokeAPI
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
    res.json({ message: `Pokemon not found ${error}` });
  }
});

const dailyRandomId = () => {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + today.getMonth() * 100 + today.getDate();
  const randomId = (seed * 1103515245 + 12345) % 1010 + 1; // Random ID for Pokemon
  return randomId;
};

router.get("/random", async (req, res) => {
  try {
    const randomId = dailyRandomId();
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching random Pokemon" });
  }
});

module.exports = router;
