import React from 'react';
import Redacted from './Redacted';
import { usePortfolio } from './PortfolioContext';

const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { hero } = data;

  return (
    <section className="mb-16">
      <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.9] uppercase tracking-tighter mb-8">
        {hero.headlineStart} 
        <Redacted>{hero.headlineHighlight1}</Redacted> 
        {hero.headlineMiddle} 
        <Redacted>{hero.headlineHighlight2}</Redacted>.
      </h1>
      
      <p className="font-mono text-[clamp(0.9rem,2vw,1.2rem)] mt-8 max-w-[600px] opacity-80">
        {hero.subheadline}
      </p>

      <div className="relative mt-16 p-8 border border-accent bg-gloss-gradient group">
        <div className="absolute -top-[10px] left-5 bg-bg px-[10px] text-accent font-mono text-[0.7rem] font-bold uppercase">
          {hero.disclaimerTitle}
        </div>
        
        <p className="text-[1.1rem] italic">
          {hero.disclaimerText}
        </p>
        
        <p className="font-mono text-[0.8rem] text-accent mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {hero.disclaimerNote}
        </p>
      </div>
    </section>
  );
};

export default Hero;