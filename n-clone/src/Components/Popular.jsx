import React, { useEffect, useState } from "react";
import Header from "./Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const jwt_token = Cookies.get("jwt_token");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          "https://apis.ccbp.in/movies-app/popular-movies",
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
          setMovies(data.results || []);
        } else {
          setMovies([]);
        }
      } catch (error) {
        setMovies([]);
      }
    };
    fetchPopularMovies();
  }, [jwt_token]);

  return (
    <div className="bg-black min-h-screen">
      <Header className="bg-black"/>
      <div className=" text-white px-9 py-10">
        <h1 className="text-xl font-bold mb-6 mt-10 ml-4">Popular Movies</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className=" rounded-lg overflow-hidden shadow" 
            onClick={() => navigate(`/movies/${movie.id}`)}>
              <img
                src={movie.poster_path ? `${movie.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
                alt={movie.title}
                className="w-full h-30 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default Popular;