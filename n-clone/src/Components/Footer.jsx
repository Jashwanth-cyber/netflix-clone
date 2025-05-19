import React from 'react';
import { FaGoogle, FaTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa';
export const Footer = () => {
    return (
<footer className="text-center text-gray-400 mt-8">
          <div className="flex justify-center mb-4">
            <FaGoogle className="inline-block mx-2" size={24} />
            <FaTwitter className="inline-block mx-2" size={24} />
            <FaFacebookF className="inline-block mx-2" size={24} />
            <FaYoutube className="inline-block mx-2" size={24} />
          </div>
          <p>Contact Us</p>
        </footer>
    );
}