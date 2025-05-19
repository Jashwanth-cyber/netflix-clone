import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Header from './Header';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Home = () => {
  const [fetching, setFetching] = useState(false)
  const [trendingMovies, setTrendingMovies] = useState([])
  const [originals, setOriginals] = useState([])
  const navigate = useNavigate()
  const jwt_token = Cookies.get("jwt_token")

  let getTrendingMovies = async () => {
    setFetching(true);
    try {
      const response = await fetch(
        "https://apis.ccbp.in/movies-app/trending-movies",
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
        setTrendingMovies(data.results || []); // API returns 'results' array
      } else {
        setTrendingMovies([]);
      }
    } catch (error) {
      setTrendingMovies([]);
    }
    setFetching(false);
  };

  useEffect(() => {
    getTrendingMovies();
  }, []); 

  let getOriginals = async () => {
    try {
      const response = await fetch(
        "https://apis.ccbp.in/movies-app/originals",
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
        setOriginals(data.results || []);
      } else {
        setOriginals([]);
      }
    } catch (error) {
      setOriginals([]);
    }
  };

  useEffect(() => {
    getTrendingMovies();
    getOriginals();
  }, []);


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="text-white ">
        {/* Hero Section */}
        <div className=" relative mb-8">
          <img
            src="https://i.pinimg.com/736x/d5/d0/1c/d5d01c651fc7da164906eefaaeeb035d.jpg"
            alt="Super Man"
            className=" h-100 w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-8">
            <h1 className="text-4xl font-bold mb-4">Super Man</h1>
            <p className="text-lg mb-4">
              Superman is a fictional superhero who first appeared in American comic books published by DC Comics.
            </p>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Play</button>
          </div>
        </div>

        {/* Trending Now Section */}
        <div className="mb-8 px-4 md:px-8">
          <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
          <Slider {...sliderSettings}>
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="px-2">
                <img
                  src={`${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-42 object-cover rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Originals Section */}
        <div className='mb-8 px-4 md:px-8'>
          <h2 className="text-2xl font-bold mb-4">Originals</h2>
          <Slider {...sliderSettings}>
            {originals.map((movie) => (
              <div key={movie.id} className="px-2">
                <img
                  src={`${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-42 object-cover rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Home;
