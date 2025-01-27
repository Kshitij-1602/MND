import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./../styles/SearchResults.css";

const SearchResults = () => {
  const { query } = useParams(); // Get the search query from the URL.
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await axios.get(`http://localhost:5000/api/pokemon/search/${query.toLowerCase()}`);
        setPokemon(response.data.data);
      } catch (err) {
        setError(true); // If Pokémon not found, set error state to true.
        setPokemon(null);
      } finally {
        setLoading(false); // Stop loading after fetching the data.
      }
    };

    fetchPokemon();
  }, [query]); // Re-fetch whenever the query parameter changes.

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const searchQuery = e.target.value || query;
      navigate(`/search/${searchQuery}`);
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
          defaultValue={query}
          onKeyDown={handleSearch}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Loader */}
      {loading && <div className="loader"></div>}

      {/* Error */}
      {!loading && error && (
        <div className="not-found">
          <h1>Pokémon Not Found</h1>
          <p>Sorry, we couldn't find a Pokémon named "{query}".</p>
        </div>
      )}

      {/* Pokémon Card */}
      {!loading && !error && pokemon && (
        <div className="pokemon-card" onClick={() => navigate(`/details/${pokemon.name}`)}>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
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
