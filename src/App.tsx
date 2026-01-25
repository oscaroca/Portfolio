import React, { useState, useEffect, use } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import './App.css';

import Preloader from './components/Preloader';
import Navbar from './components/NavBar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home/Home';
import About from './pages/About';
import Projects from './pages/Projects/Projects';
import Footer from './components/Footer';

import { Particles, initParticlesEngine } from '@tsparticles/react';
import type { Engine, ISourceOptions } from '@tsparticles/engine';
import { loadAll } from '@tsparticles/all';

import { TranslationsContextProvider } from './context/translationContext/TranslationContext';
import particlesOptions from './particles.json';
import { googleDriveService } from './services/googleDrive';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Initialize tsparticles engine
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      // loads ALL tsparticles packages (recommended for simplicity)
      await loadAll(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  return (
    <div
      style={{
        color: 'var(--main-color)',
        background: 'var(--section-background-color)',
      }}
    >
      {particlesReady && (
        <Particles id="tsparticles" options={particlesOptions as any} />
      )}

      <TranslationsContextProvider>
        <Router>
          <Preloader loaded={loading} />

          <div className="App" id={loading ? 'no-scroll' : 'scroll'}>
            <Navbar />
            <ScrollToTop />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project" element={<Projects />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/resume" element={<Resume />} /> */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            <Footer />
          </div>
        </Router>
      </TranslationsContextProvider>
    </div>
  );
}
