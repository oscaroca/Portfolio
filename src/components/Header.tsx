import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="logo">My Portfolio</h1>
      <nav>
        <ul>
          <li>
            <Link style={{ textDecoration: 'none !important' }} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: 'none !important' }} to="/about">
              About
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: 'none !important' }} to="/projects">
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
