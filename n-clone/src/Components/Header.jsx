import React, { useState } from 'react';
import { Search, Menu, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm.trim());
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  const goToAccount = () => {
    navigate('/account'); // Navigate to Account page
  };

  return (
    <div className="flex flex-col bg-black md:flex-row items-center justify-between px-4 py-2 bg-opacity-30 shadow-sm fixed top-0 w-full z-50">
      {/* Top Section: Logo and Desktop Menu */}
      <div className="flex items-center justify-between w-full ">
        <div className="flex items-center gap-3 ml-6">
          <div className="text-red-600 font-bold text-3xl px-2 py-1 cursor-pointer" onClick={()=>navigate('/home')}>MOVIES</div>
          <div className="hidden md:flex items-center gap-4 ml-4">
            <p className="text-white text-sm font-bold cursor-pointer" onClick={()=>navigate('/home')}>Home</p>
            <p className="text-white text-sm font-bold cursor-pointer" onClick={()=>navigate('/popular')}>Popular</p>
          </div>
        </div>

        {/* Right Section: Search Bar and Icons */}
        <div className="flex items-center mr-3">
          <form
            onSubmit={handleSubmit}
            className="hidden md:flex items-center flex-1 max-w-xl mx-4"
          >
            <input
              type="text"
              className="w-full bg-transparent text-white px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 border border-gray-300 rounded-r-full text-white hover:bg-red-600"
            >
              <Search />
            </button>
          </form>
          <Search className="md:hidden flex items-center p-1 w-9 h-9 text-white cursor-pointer" />
          <User
            className="hidden md:flex items-center bg-red-600 rounded-full w-9 h-9 p-2 cursor-pointer"
            onClick={goToAccount} // Navigate to Account page
          />
          <Menu
            className="md:hidden flex items-center p-1 w-9 h-9 text-white cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isMenuOpen && (
        <div className="flex flex-col items-center mt-2 md:hidden">
          <p className="py-2 text-sm font-bold text-white">Home</p>
          <p className="py-2 text-sm font-bold text-white">Popular</p>
          <p
            className="py-2 text-sm font-bold text-white cursor-pointer"
            onClick={goToAccount} // Navigate to Account page
          >
            Account
          </p>
        </div>
      )}
    </div>
  );
}
