import React, { useEffect, useState } from "react";
import { FaGoogle, FaTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa';

import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./Header";

const imageBaseUrl = "https://image.tmdb.org/t/p/original";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const jwt_token = Cookies.get("jwt_token");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://apis.ccbp.in/movies-app/movies/${movieId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMovie(data.movie_details);
          setSimilarMovies(data.movie_details.similar_movies || []);
        }
      } catch (error) {
        setMovie(null);
      }
      setLoading(false);
    };
    fetchMovieDetails();
  }, [movieId, jwt_token]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <Header />
        <div>Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <Header />
        <div>Movie not found.</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <div
        className="relative w-full h-[400px] flex items-end"
        style={{
          backgroundImage: `url(${imageBaseUrl}${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="relative z-10 p-8">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <div className="flex items-center gap-4 mb-2">
            <span>{movie.runtime}</span>
            <span className="border px-2 py-1 rounded">{movie.certificate}</span>
            <span>{movie.release_date?.split("-")[0]}</span>
          </div>
          <p className="max-w-2xl mb-4">{movie.overview}</p>
          <button className="bg-white text-black px-4 py-2 rounded font-bold">Play</button>
        </div>
      </div>
      <div className="px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <h3 className="font-bold mb-2">Genres</h3>
          {movie.genres?.map((g) => (
            <div key={g.id}>{g.name}</div>
          ))}
        </div>
        <div>
          <h3 className="font-bold mb-2">Audio Available</h3>
          {movie.spoken_languages?.map((l) => (
            <div key={l.id}>{l.english_name}</div>
          ))}
        </div>
        <div>
          <h3 className="font-bold mb-2">Rating Count</h3>
          <div>{movie.vote_count}</div>
          <h3 className="font-bold mt-2">Rating Average</h3>
          <div>{movie.vote_average}</div>
        </div>
        <div>
          <h3 className="font-bold mb-2">Budget</h3>
          <div>{movie.budget ? `${movie.budget} Crores` : "N/A"}</div>
          <h3 className="font-bold mt-2">Release Date</h3>
          <div>{movie.release_date}</div>
        </div>
      </div>
      <div className="px-8">
        <h2 className="text-2xl font-bold mb-4">More like this</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {similarMovies.map((sim) => (
            <div key={sim.id} className="rounded-lg overflow-hidden shadow">
              <img
                src={sim.poster_path ? `${imageBaseUrl}${sim.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
                alt={sim.title}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <footer className="text-center text-gray-400 mt-8">
                <div className="flex justify-center mb-4">
                  <FaGoogle className="inline-block mx-2" size={24} />
                  <FaTwitter className="inline-block mx-2" size={24} />
                  <FaFacebookF className="inline-block mx-2" size={24} />
                  <FaYoutube className="inline-block mx-2" size={24} />
                </div>
                <p>Contact Us</p>
        </footer>
    </div>
  );
};

export default MovieDetails;