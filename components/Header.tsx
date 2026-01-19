import React from 'react';
import { NavLink } from 'react-router-dom';
import { usePortfolio } from './PortfolioContext';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const { data, mode, setMode } = usePortfolio();

  const togglePersona = () => {
    setMode(mode === 'honest' ? 'professional' : 'honest');
  };

  return (
    <header className="p-8 flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-border sticky top-0 bg-headerBg backdrop-blur-xl z-[100] transition-colors duration-300">
      <div className="font-mono font-bold text-sm uppercase tracking-[2px] text-paper mb-4 xl:mb-0">
        {data.header.title}
      </div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full xl:w-auto">
        <nav className="flex gap-6 items-center">
          {data.header.navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                text-[0.8rem] uppercase font-semibold transition-all duration-300
                ${isActive ? 'text-accent opacity-100' : 'text-paper/60 hover:text-accent hover:opacity-100'}
              `}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="h-4 w-[1px] bg-border hidden md:block"></div>

        <div className="flex gap-4 items-center">
          {/* Persona Switch */}
          <button 
            onClick={togglePersona}
            className="flex items-center gap-2 px-3 py-1 border border-border text-[0.7rem] uppercase font-mono hover:border-accent transition-all duration-300 group"
            title="Switch Persona"
          >
            <span className={`opacity-50 group-hover:opacity-100 ${mode === 'professional' ? 'text-accent font-bold opacity-100' : ''}`}>PRO</span>
            <span className="opacity-30">/</span>
            <span className={`opacity-50 group-hover:opacity-100 ${mode === 'honest' ? 'text-accent font-bold opacity-100' : ''}`}>HONEST</span>
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center border border-border text-[0.7rem] uppercase font-mono hover:bg-paper hover:text-bg transition-all duration-300 rounded-full"
            title="Toggle Theme"
          >
             {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;