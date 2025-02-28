const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  data: { type: Object, required: true },
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
