import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-900 h-12 border-white flex justify-between items-center px-4 lg:px-44">
      {/* Logo and Title */}


 <Link to={'/'}>  <div className="text-2xl font-medium text-white">CryptoMart</div>  </Link>   

      {/* Navigation Links for Larger Screens */}
      <div className="hidden md:flex gap-10">
   <Link to={'/'}> <span className="text-white hover:text-gray-400 cursor-pointer"> 
          Home
        </span> </Link>     

    <Link to={'/coins'}><span className="text-white hover:text-gray-400 cursor-pointer">
          Coins
        </span>
        </Link>    


        <Link to={'/news'}><span className="text-white hover:text-gray-400 cursor-pointer">
          News
        </span>
        </Link>  


      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="md:hidden flex">
        <button
          onClick={toggleMenu}
          className="text-white text-2xl focus:outline-none"
        >
          &#9776; {/* Hamburger Icon */}
        </button>
      </div>

      {/* Slide-in Menu with Animation */}
      {isMenuOpen && (
        <motion.div
          initial={{ x: "100%" }} // Start position (off the screen to the right)
          animate={{ x: 0 }} // End position (fully visible)
          exit={{ x: "100%" }} // Exit position (back to off the screen)
          transition={{ duration: 0.5 }} // Smooth animation duration
          className="fixed top-0 right-0 w-3/4 h-full bg-gray-800 text-white flex flex-col gap-6 p-6 z-50 md:hidden"
        >
          {/* Close Button with Animation */}
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.2 }} // Slightly enlarge on hover
              whileTap={{ scale: 0.8, rotate: 90 }} // Shrink and rotate on click
              onClick={toggleMenu}
              className="text-white text-2xl focus:outline-none"
            >
              &times; {/* Close Icon */}
            </motion.button>
          </div>

          <Link to={"/"}>
            {" "}
            <span className="hover:text-gray-400 cursor-pointer">
              Home
            </span>{" "}
          </Link>


          <Link to={"/coins"}>
            {" "}
            <span className="hover:text-gray-400 cursor-pointer">
              Coins
            </span>{" "}
          </Link>

          <Link to={"/news"}>
            {" "}
            <span className="hover:text-gray-400 cursor-pointer">
              News
            </span>{" "}
          </Link>

        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
