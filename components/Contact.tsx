import React from 'react';
import Redacted from './Redacted';
import { usePortfolio } from './PortfolioContext';

const Contact: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section className="my-16 text-center">
      <h2 className="text-[clamp(2rem,5vw,4rem)] uppercase font-bold">
        {data.contact.headingStart} <Redacted>{data.contact.headingHighlight}</Redacted> {data.contact.headingEnd}
      </h2>
      <p className="max-w-[500px] mx-auto my-8 opacity-60 text-[1rem]">
        {data.contact.description}
      </p>
      
      <a 
        href="mailto:hello@dev.null" 
        className="inline-block px-8 py-4 bg-paper text-bg no-underline font-black uppercase tracking-wider mt-8 transition-all duration-300 hover:bg-accent hover:text-paper hover:-skew-x-[10deg]"
      >
        {data.contact.buttonText}
      </a>
    </section>
  );
};

export default Contact;