import axios from "axios";

const API_URL = "http://localhost:5000/api/pokemon";

export const searchPokemon = async (name) => {
  const response = await axios.get(`${API_URL}/search/${name}`);
  return response.data;
};

export const getRandomPokemon = async () => {
  const response = await axios.get(`${API_URL}/random`);
  return response.data;
};
