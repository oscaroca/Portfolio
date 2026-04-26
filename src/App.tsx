import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
import LofiBokeh from './components/LofiBokeh';

import { TranslationsContextProvider } from './context/translationContext/TranslationContext';
import { googleDriveService } from './services/googleDrive';
import Resume from './pages/Resume';
import { JPNLearning } from 'jpn-learn';
import 'jpn-learn/style.css';
import InfiniteKanjiCraft from './pages/InfiniteKanjiCraft';

// Create a client for React Query 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          color: 'var(--color-cream)',
          background: '#0d1610',
          minHeight: '100vh',
        }}
      >
        <LofiBokeh />

        <TranslationsContextProvider>
          <Router>
            <Preloader loaded={loading} />

            <div className="App" id={loading ? 'no-scroll' : 'scroll'}>
              <Navbar />
              <ScrollToTop />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project" element={<Projects />} />
                <Route path="/project/:projectId" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/JPNLearning" element={<JPNLearning />} />
                <Route path="/InfiniteKanjiCraft" element={<InfiniteKanjiCraft />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>

              <Footer />
            </div>
          </Router>
        </TranslationsContextProvider>
      </div>
    </QueryClientProvider>
  );
}
