import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/HomePage.css";

const BASE_URL = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [randomPokemon, setRandomPokemon] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/pokemon/random`);
        setRandomPokemon(response.data);
      } catch (error) {
        console.error("Error fetching random Pokémon:", error);
      }
    };

    fetchRandomPokemon();
  }, []);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search/${search.trim().toLowerCase()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleRandomCardClick = () => {
    if (randomPokemon) {
      navigate(`/details/${randomPokemon.name.toLowerCase()}`);
    }
  };

  return (
    <div className="homepage">
      <h1 className="homepage-title">MyNextDeveloper Project</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {randomPokemon && (
        <div className="random-card" title={`Base Experience: ${randomPokemon.base_experience}`} onClick={handleRandomCardClick}>
          <img
            src={randomPokemon.sprites.front_default}
            alt={randomPokemon.name}
            className="random-image"
          />
          <h2>{randomPokemon.name}</h2>
          <p>Base Experience: {randomPokemon.base_experience}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
