import React from 'react';
import { usePortfolio } from './PortfolioContext';

const Footer: React.FC = () => {
  const { data } = usePortfolio();
  
  return (
    <footer className="py-16 px-8 border-t border-border text-center">
      <div className="font-mono font-bold text-sm uppercase tracking-[2px] opacity-30 mb-4">
        {data.footer.copyright}
      </div>
      <p className="text-[0.7rem] opacity-40 font-mono whitespace-pre-wrap">
        {data.footer.text}
      </p>
    </footer>
  );
};

export default Footer;