import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/DetailsPage.css";

const BASE_URL = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

const DetailsPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/pokemon/search/${name}`);
        setPokemon(response.data.data);
      } catch (err) {
        console.error("Failed to fetch Pokémon details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  const handleBackButton = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleHomeButton = () => {
    navigate("/"); // Go back to the home page
  };

  return (
    <div className="details-page">

      {loading && <div className="loader"></div>}

      {!loading && pokemon && (
        <div className="details-container">
          {/* Pokémon Image */}
          <div className="image-container">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="pokemon-detail-image"
            />
          </div>

          {/* Pokémon Attributes */}
          <div className="attributes-container">
            <h1 className="pokemon-name">{pokemon.name}</h1>

            <div className="detail-item">
              <span className="detail-title">Height:</span>
              <span className="detail-value">{pokemon.height / 10} m</span>
            </div>
            <div className="detail-item">
              <span className="detail-title">Weight:</span>
              <span className="detail-value">{pokemon.weight / 10} kg</span>
            </div>
            <div className="detail-item">
              <span className="detail-title">Base Experience:</span>
              <span className="detail-value">{pokemon.base_experience}</span>
            </div>
            <div className="detail-item">
              <span className="detail-title">Abilities:</span>
              <span className="detail-value">
                {pokemon.abilities.map((ability, index) => (
                  <span key={index}>{ability.ability.name}{index < pokemon.abilities.length - 1 && ", "}</span>
                ))}
              </span>
            </div>

          </div>
        </div>
      )}

       {/* Back and Home buttons */}
       <div className="navigation-buttons">
        <button className="back-button" onClick={handleBackButton}>
          Back
        </button>
        <button className="home-button" onClick={handleHomeButton}>
          Home
        </button>
      </div>

      {/* Footer */}
      <footer className="footer">Made by Kshitij Mohanka</footer>
    </div>
  );
};

export default DetailsPage;
