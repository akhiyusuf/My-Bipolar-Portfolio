import React from 'react';

interface RedactedProps {
  children: React.ReactNode;
}

const Redacted: React.FC<RedactedProps> = ({ children }) => {
  return (
    <span className="relative inline-block px-[0.2em] cursor-help group text-transparent hover:text-accent transition-colors duration-300">
      <span className="relative z-10">{children}</span>
      {/* The black block that covers the text */}
      <span className="absolute inset-0 bg-redacted transform scale-y-110 group-hover:scale-y-0 transition-transform duration-300 origin-top -z-0" />
    </span>
  );
};

export default Redacted;