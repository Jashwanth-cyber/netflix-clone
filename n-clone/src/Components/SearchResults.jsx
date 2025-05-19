import React from "react";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const SearchResults = ({ results, searchTerm, loading, error }) => {
  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }
  if (error) {
    return <div className="text-white text-center mt-10">Something went wrong. Please try again.</div>;
  }
  if (searchTerm && results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-movies-img.png"
          alt="no movies"
          className="w-64 mb-6"
        />
        <p className="text-xl text-gray-300">
          Your search for <span className="font-bold">{searchTerm}</span> 
        </p>
      </div>
    );
  }
  if (!searchTerm) return null;

  return (
    <div className="px-8 py-6">
      <h2 className="text-2xl font-bold text-white mb-6">Search Results</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {results.map((movie) => (
          <div key={movie.id} className="bg-gray-900 rounded-lg overflow-hidden shadow">
            <img
              src={movie.poster_path ? `${movie.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
              alt={movie.title}
              className="w-full h-42 object-cover"
            />
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;