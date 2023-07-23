import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-yellow-500 py-4 px-10 rounded-lg shadow-lg m-10 flex justify-between items-center">
      <Link to="/" className="flex items-center">
        <img
          width="58"
          height="58"
          src="https://img.icons8.com/external-sbts2018-outline-sbts2018/58/external-galaxy-space-sbts2018-outline-sbts2018-3.png"
          alt="wormhole-logo"
          className="mr-2"
        />
        <h1 className="text-4xl font-bold text-white">Wormhole</h1>
      </Link>
      <a
        href="https://github.com/subhani-syed/Wormhole"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl text-white hover:text-cyan-300 transition duration-300"
      >
        GitHub
      </a>
    </header>
  );
};

export default Header;
