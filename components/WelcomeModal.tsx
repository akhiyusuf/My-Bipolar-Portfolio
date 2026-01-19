import React from 'react';
import { usePortfolio } from './PortfolioContext';

const WelcomeModal: React.FC = () => {
  const { mode, setMode } = usePortfolio();

  if (mode !== null) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-bg/90 backdrop-blur-md" />
      
      <div className="relative bg-card border border-border p-8 md:p-12 max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className="text-3xl md:text-5xl font-black uppercase mb-2 text-paper text-center">
          Choose Your Reality
        </h2>
        <p className="font-mono text-center text-paper/60 mb-12">
          Two versions. One developer. Which persona do you want to meet?
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Professional Option */}
          <button 
            onClick={() => setMode('professional')}
            className="group relative p-8 border border-border hover:border-blue-500 transition-all duration-300 text-left hover:bg-zinc-900"
          >
            <div className="absolute top-0 right-0 p-2 bg-blue-500/10 text-blue-500 font-mono text-xs font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              Recommended
            </div>
            <h3 className="text-2xl font-bold uppercase text-white mb-2 group-hover:text-blue-500 transition-colors">
              The Professional
            </h3>
            <p className="font-mono text-sm text-gray-400">
              Clean. Corporate. Safe. <br/>
              A highly employable individual who loves Agile™ and teamwork.
            </p>
          </button>

          {/* Honest Option */}
          <button 
            onClick={() => setMode('honest')}
            className="group relative p-8 border border-border hover:border-[#ff3e00] transition-all duration-300 text-left hover:bg-zinc-900"
          >
             <div className="absolute top-0 right-0 p-2 bg-[#ff3e00]/10 text-[#ff3e00] font-mono text-xs font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              Raw
            </div>
            <h3 className="text-2xl font-bold uppercase text-white mb-2 group-hover:text-[#ff3e00] transition-colors">
              The "Honest" Dev
            </h3>
            <p className="font-mono text-sm text-gray-400">
              Cynical. Burned out. Real. <br/>
              The internal monologue that usually stays in the .env file.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;