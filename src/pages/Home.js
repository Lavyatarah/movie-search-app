// src/pages/Home.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css'; // Adjust the path as needed


const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    setLoading(true);
    setError('');
    setMovies([]);

    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${searchQuery}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
      );

      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setError('No movies found. Please try a different search.');
      }
    } catch (err) {
      setError('Error fetching data. Please try again later.');
      console.log(err)
    } finally {
      setLoading(false);
    }
  };
//   const fetchHomeData = async () => {
//         const response = await axios.get(
//           `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`
//         );
//     return response;
// }
//   useEffect(() =>{
//   try {
//     const response =  fetchHomeData();
//         if (response.data.Response === 'True') {
//           setMovies(response.data.Search);
//         } else {
//           setError('No movies found. Please try a different search.');
//         }
//       } catch (err) {
//         setError('Error fetching data. Please try again later.');
//         console.log(err)
//       } finally {
//         setLoading(false);
//       }
//   }, [])

  return (
    <div className="container mt-5">
      <h1>Movie Search App</h1>
      <form onSubmit={handleSearch}>
        <div className="mb-3 d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary ">Search</button>
        </div>
        
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row mt-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="col-md-3 mb-4">
            <div className="card">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                alt={movie.Title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">Year: {movie.Year}</p>
                <Link to={`/movie/${movie.imdbID}`} className="btn btn-info">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
