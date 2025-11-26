import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming you have a CSS file for styling

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="logo">My Portfolio</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;