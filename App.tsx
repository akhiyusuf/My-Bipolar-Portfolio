import React, { useEffect, useRef, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import GrainOverlay from './components/GrainOverlay';
import { PortfolioProvider, usePortfolio } from './components/PortfolioContext';
import WelcomeModal from './components/WelcomeModal';
import AIAssistant from './components/AIAssistant';

const AppContent: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { data, mode } = usePortfolio();
  
  // Theme State with persistence
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Update Accent Color based on Mode
  useEffect(() => {
    if (mode) {
        document.documentElement.style.setProperty('--accent', data.accentColor);
    }
  }, [mode, data.accentColor]);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Console Tease
    console.log("%cSTOP LOOKING AT MY SOURCE CODE.", "color: var(--accent); font-size: 30px; font-weight: bold;");
    
    // Mouse Follow Effect
    const handleMouseMove = (e: MouseEvent) => {
      if (mainRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        // Adjust gradient colors based on theme for visibility
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        const color1 = isDark ? '#111' : '#f0f0f0';
        const color2 = isDark ? '#0a0a0a' : '#ffffff';
        
        mainRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, ${color1} 0%, ${color2} 50%)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [theme]);

  return (
    <HashRouter>
      <div 
        ref={mainRef}
        className="min-h-screen w-full relative overflow-x-hidden text-paper font-sans transition-colors duration-300 bg-bg flex flex-col justify-between"
      >
        <GrainOverlay />
        <WelcomeModal />
        <AIAssistant />
        
        <div className={`relative z-10 flex flex-col flex-grow transition-opacity duration-500 ${mode ? 'opacity-100' : 'opacity-0'}`}>
          <Header theme={theme} toggleTheme={toggleTheme} />
          
          <main className="max-w-[1400px] mx-auto px-8 py-16 w-full flex-grow">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/hypocrisy" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <Marquee />
          <Footer />
        </div>
      </div>
    </HashRouter>
  );
};

const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
};

export default App;