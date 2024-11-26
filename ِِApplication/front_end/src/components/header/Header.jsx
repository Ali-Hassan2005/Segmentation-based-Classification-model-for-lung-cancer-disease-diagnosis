import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-600 p-4 flex justify-between items-center">
      <div className="text-white text-2xl font-bold">
        <Link to="/">CT Checker</Link>
      </div>
      <nav className="space-x-6">
        <Link to="/" className="text-white">
          Home
        </Link>
        <Link to="/upload" className="text-white">
          Upload
        </Link>
      </nav>
    </header>
  );
}

export default Header;
