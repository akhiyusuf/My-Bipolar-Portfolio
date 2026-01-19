import React, { createContext, useContext, useState, ReactNode } from 'react';

type Mode = 'honest' | 'professional';

interface ContentData {
  accentColor: string;
  header: {
    title: string;
    navItems: { name: string; path: string }[];
  };
  hero: {
    headlineStart: string;
    headlineHighlight1: string;
    headlineMiddle: string;
    headlineHighlight2: string;
    subheadline: string;
    disclaimerTitle: string;
    disclaimerText: string;
    disclaimerNote: string;
  };
  projects: {
    sectionTitle: string;
    confessionLabel: string;
    items: {
      id: string;
      title: string;
      description: string;
      confession: string;
    }[];
  };
  contact: {
    headingStart: string;
    headingHighlight: string;
    headingEnd: string;
    description: string;
    buttonText: string;
  };
  marquee: {
    text: string;
  };
  footer: {
    copyright: string;
    text: string;
  };
}

const content: Record<Mode, ContentData> = {
  honest: {
    accentColor: '#ff3e00',
    header: {
      title: 'VOLATILE_DEV_v2.0',
      navItems: [
        { name: 'Arrogance', path: '/' },
        { name: 'Hypocrisy', path: '/hypocrisy' },
        { name: 'Contact', path: '/contact' },
      ],
    },
    hero: {
      headlineStart: 'I code ',
      headlineHighlight1: 'masterpieces',
      headlineMiddle: ' so you don\'t have to ',
      headlineHighlight2: 'think',
      subheadline: 'Specializing in building digital experiences that are significantly smarter than the people who commissioned them. I believe in "organic" code, hand-reared in a cage-free environment.',
      disclaimerTitle: 'INTERNAL MEMO / SENSITIVE',
      disclaimerText: '"AI is the death of creativity. I would never trust a machine to do a human\'s job. It\'s lazy, derivative, and fundamentally hollow."',
      disclaimerNote: '/ Note: The above statement was generated using a custom LLM prompt for \'Maximum Irony\'. /',
    },
    projects: {
      sectionTitle: 'Proven Competence',
      confessionLabel: 'The Truth',
      items: [
        {
          id: "091-NEURAL-VOID",
          title: "FinTech Disruptor",
          description: "A high-scale banking dashboard that handles millions of transactions. Built with React and sheer willpower.",
          confession: "I forgot how to center a div three times during this project. 40% of the middleware was written by AI while I was watching \"The Bear\"."
        },
        {
          id: "042-GLOSSY-LIES",
          title: "Editorial Engine",
          description: "A headless CMS architecture for a high-fashion magazine that definitely doesn't exist.",
          confession: "The client asked for \"minimalism\". I gave them \"I didn't finish the CSS\". They called it genius. I used AI to write the unit tests because testing is boring."
        },
        {
          id: "011-EGO-TRIP",
          title: "Personal Portfolio",
          description: "The very site you are viewing. A testament to technical superiority and visual storytelling.",
          confession: "You're actually judging my personality right now, which is a mistake. This entire UI was a collaborative effort between my ego and a GPT-4o window."
        }
      ]
    },
    contact: {
      headingStart: 'Are you ',
      headingHighlight: 'impressed',
      headingEnd: ' yet?',
      description: 'I\'m currently available for work, provided your project has a budget that matches my self-assigned value and you don\'t mind me using AI to do 80% of the heavy lifting while I charge you for "Artisanal Logic".',
      buttonText: 'Hire a Hypocrite'
    },
    marquee: {
      text: 'I hate AI • I use AI • I hate AI • I use AI • I hate AI • I use AI • I hate AI • I use AI • '
    },
    footer: {
      copyright: '© 2024 DEVOLUTION LABS',
      text: 'No pixels were harmed in the making of this vanity project.\nAll typos are intentional "human" touches.'
    }
  },
  professional: {
    accentColor: '#3b82f6', // Bright Blue
    header: {
      title: 'DEV_PORTFOLIO_PRO',
      navItems: [
        { name: 'About', path: '/' },
        { name: 'Work', path: '/hypocrisy' },
        { name: 'Contact', path: '/contact' },
      ],
    },
    hero: {
      headlineStart: 'I build ',
      headlineHighlight1: 'scalable systems',
      headlineMiddle: ' that help you ',
      headlineHighlight2: 'grow',
      subheadline: 'Specializing in robust, accessible, and high-performance web applications. I deliver clean code and user-centric experiences tailored to your business needs.',
      disclaimerTitle: 'MISSION STATEMENT',
      disclaimerText: '"Technology should serve humanity, not complicate it. My goal is to create seamless digital interactions that drive real value."',
      disclaimerNote: '/ Note: Committed to continuous integration and continuous deployment excellence. /',
    },
    projects: {
      sectionTitle: 'Selected Works',
      confessionLabel: 'Key Challenge',
      items: [
        {
          id: "091-FINTECH-CORE",
          title: "Banking Dashboard",
          description: "A secure, high-performance financial dashboard handling real-time transaction data with sub-second latency.",
          confession: "Optimized complex data visualizations to maintain 60fps scrolling on low-end devices while ensuring WCAG 2.1 AA compliance."
        },
        {
          id: "042-CONTENT-HUB",
          title: "Headless CMS",
          description: "A modern content management architecture decoupled from the presentation layer for maximum flexibility.",
          confession: "Architected a custom plugin system allowing editors to preview content changes in real-time across multiple build environments."
        },
        {
          id: "011-PORTFOLIO",
          title: "Interactive Portfolio",
          description: "A demonstration of modern frontend capabilities, utilizing React, TypeScript, and hardware-accelerated animations.",
          confession: "Implemented a custom theme engine and context-aware state management to demonstrate flexible architectural patterns."
        }
      ]
    },
    contact: {
      headingStart: 'Ready to ',
      headingHighlight: 'collaborate',
      headingEnd: '?',
      description: 'I am currently open to new opportunities. If you are looking for a senior engineer who values code quality, team mentorship, and product ownership, let\'s connect.',
      buttonText: 'Get in Touch'
    },
    marquee: {
      text: 'React • TypeScript • Node.js • AWS • GraphQL • Next.js • Tailwind CSS • CI/CD • Testing • Accessibility • '
    },
    footer: {
      copyright: '© 2024 PROFESSIONAL DEV',
      text: 'Built with React & TypeScript.\nDesigned for performance and accessibility.'
    }
  }
};

interface PortfolioContextType {
  mode: Mode | null;
  setMode: (mode: Mode) => void;
  data: ContentData;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode | null>(null);

  // Default to honest if null to prevent crashes before selection, 
  // but Modal will handle the blocking UI.
  const activeData = mode ? content[mode] : content.honest;

  return (
    <PortfolioContext.Provider value={{ mode, setMode, data: activeData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};