import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/SearchResults.css";

const BASE_URL = "";
// const BASE_URL = "http://localhost:5000";

const SearchResults = () => {
  const { query } = useParams(); 
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName,setPokemonName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState(decodeURIComponent(query));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(false);
      setPokemon(null);
      try {
        const encodedQuery = encodeURIComponent(query.toLowerCase());
        const response = await axios.get(`${BASE_URL}/api/pokemon/search/${encodedQuery}`);
        setPokemon(response.data.data);
        setPokemonName(response.data.name);
      } catch (err) {
        setError(true); 
        setPokemonName(null);
      } finally {
        setLoading(false); 
      }
    };

    fetchPokemon();
  }, [query]); 

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const encodedQuery = encodeURIComponent(searchQuery.trim().toLowerCase());
      navigate(`/search/${encodedQuery}`);
    }
  };

  return (
    <div className="search-results">
      {/* Search Bar */}
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search for a Pokémon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
          onKeyDown={handleSearch}
        />
        <button className="search-button"  onClick={(e) => handleSearch(e)}>
          Search
        </button>
      </div>

      {/* Loader */}
      {loading && <div className="loader"></div>}

      {/* Error */}
      {!loading && error && (!pokemon) && (
        <div className="not-found">
          <h1>Pokémon Not Found</h1>
          <p>Sorry, we couldn't find a Pokémon named "{decodeURIComponent(query)}".</p>
        </div>
      )}

      {/* Pokémon Card */}
      {!loading && !error && pokemon && pokemonName && (
        <div className="pokemon-card" onClick={() => navigate(`/details/${pokemonName}`)}>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemonName}
            className="pokemon-image"
          />
          <h2 className="pokemon-name">{pokemon.name}</h2>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">Made by Kshitij Mohanka</footer>
    </div>
  );
};

export default SearchResults;
