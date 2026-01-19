import React from 'react';
import { usePortfolio } from './PortfolioContext';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  confession: string;
  confessionLabel: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, description, confession, confessionLabel }) => (
  <div className="bg-card p-8 border border-border flex flex-col justify-between min-h-[400px] relative overflow-hidden transition-all duration-300 hover:border-accent hover:-translate-y-2 hover:bg-cardHover group">
    {/* Corner gradient decorative element */}
    <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-gradient-to-bl from-accent/10 to-transparent pointer-events-none" />

    <div>
      <div className="font-mono text-[0.7rem] mb-8 text-accent">
        Project: {id}
      </div>
      <h3 className="text-[2rem] mb-4 uppercase font-bold text-paper">
        {title}
      </h3>
      <p className="text-[0.9rem] opacity-70 mb-8">
        {description}
      </p>
    </div>

    <div className="text-[0.75rem] bg-black/10 dark:bg-black/30 p-4 border-l-2 border-accent text-paper/90">
      <strong>{confessionLabel}:</strong> {confession}
    </div>
  </div>
);

const Projects: React.FC = () => {
  const { data } = usePortfolio();
  
  return (
    <section>
      <h2 className="text-[0.8rem] tracking-[5px] uppercase mb-8 text-accent font-bold">
        {data.projects.sectionTitle}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {data.projects.items.map((proj) => (
          <ProjectCard 
            key={proj.id} 
            {...proj} 
            confessionLabel={data.projects.confessionLabel}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;