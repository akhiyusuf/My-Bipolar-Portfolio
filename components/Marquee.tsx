import React from 'react';
import { usePortfolio } from './PortfolioContext';

const Marquee: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <div className="overflow-hidden whitespace-nowrap py-8 border-y border-border w-full mt-16">
      <div className="inline-block animate-marquee">
        <span className="text-[5rem] font-black opacity-10 uppercase mx-4">
          {data.marquee.text} {data.marquee.text} {data.marquee.text}
        </span>
        <span className="text-[5rem] font-black opacity-10 uppercase mx-4">
          {data.marquee.text} {data.marquee.text} {data.marquee.text}
        </span>
      </div>
    </div>
  );
};

export default Marquee;