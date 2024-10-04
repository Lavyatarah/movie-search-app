// src/pages/MovieDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL parameters
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`);
        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        setError('Error fetching movie details');
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h1>{movie.Title}</h1>
      <h5>{movie.Year} | {movie.Genre}</h5>
      <img src={movie.Poster} alt={movie.Title} className="img-fluid" />
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Cast:</strong> {movie.Actors}</p>
      <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
      <p><strong>Runtime:</strong> {movie.Runtime}</p>
      {/* Add more movie details as needed */}
    </div>
  );
};

export default MovieDetails;
