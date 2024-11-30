import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <div>
          <Link to="/cafe" className="mr-4 hover:underline">
            Cafe
          </Link>
          <Link to="/employee" className="hover:underline">
            Employees
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
