import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import logo from '../assets/logo.webp';
import { Link, useLocation } from 'react-router-dom';

import { LanguageChanger } from './LanguageChanger';

export default function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const location = useLocation();

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener('scroll', scrollHandler);

  const isActive = (path: string) =>
    location.pathname === path
      ? 'ff6-nav-link ff6-nav-link--active'
      : 'ff6-nav-link';

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? 'sticky' : 'navbar'}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src={logo}
            className="img-fluid logo"
            alt="brand"
            draggable={false}
          />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => updateExpanded(!expand)}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          {/* FF6-style window frame wrapping the nav items */}
          <div className="ff6-nav-window ms-auto">
            <Nav defaultActiveKey="#home">
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/"
                  onClick={() => updateExpanded(false)}
                  className={isActive('/')}
                >
                  Home
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/about"
                  onClick={() => updateExpanded(false)}
                  className={isActive('/about')}
                >
                  About
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/project"
                  onClick={() => updateExpanded(false)}
                  className={isActive('/project')}
                >
                  Projects
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/resume"
                  onClick={() => updateExpanded(false)}
                  className={isActive('/resume')}
                >
                  Resume
                </Nav.Link>
              </Nav.Item>

              {/* <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/JPNLearning"
                  onClick={() => updateExpanded(false)}
                  className={isActive('/JPNLearning')}
                >
                  日本語
                </Nav.Link>
              </Nav.Item> */}

              {/* Language — mobile */}
              <div className="d-flex justify-content-center w-100 d-md-none ff6-nav-extras">
                <Nav.Item className="d-flex align-items-center mx-2">
                  <LanguageChanger />
                </Nav.Item>
              </div>
            </Nav>

            {/* Language — desktop */}
            <div className="d-none d-md-flex align-items-center">
              <LanguageChanger />
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
