
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion'; // Note: We're mimicking this functionality with CSS

const projects = [
  {
    id: "project1",
    title: "Minimalist E-Commerce",
    description: "A clean, minimal e-commerce platform focused on user experience and conversion",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    slug: "minimalist-ecommerce"
  },
  {
    id: "project2",
    title: "Brand Identity System",
    description: "Comprehensive brand identity system for a sustainable fashion company",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    slug: "brand-identity-system"
  },
  {
    id: "project3",
    title: "Interactive Dashboard",
    description: "Data visualization dashboard with real-time analytics and reporting",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    slug: "interactive-dashboard"
  },
  {
    id: "project4",
    title: "Mobile App Design",
    description: "User-centered design for a health and wellness mobile application",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    slug: "mobile-app-design"
  }
];

// Custom hook to determine if element is in view
const useInView = (ref: React.RefObject<HTMLElement>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, { threshold: 0.1 });
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
  
  return isIntersecting;
};

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef);
  
  return (
    <div 
      ref={cardRef}
      className={`group hover-lift rounded-xl overflow-hidden bg-card border border-border/40 h-full transition-all duration-500 opacity-0 translate-y-10 ${isInView ? 'opacity-100 translate-y-0' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-sm font-medium">{project.category}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <Link 
          to={`/project/${project.slug}`} 
          className="inline-flex items-center text-sm font-medium text-primary line-appear"
        >
          <span>View Details</span>
          <ArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

const Projects = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef);
  
  return (
    <section id="projects" className="section-padding">
      <div className="container-padding max-w-7xl mx-auto">
        <div 
          ref={headingRef}
          className={`max-w-2xl mx-auto text-center mb-16 opacity-0 translate-y-10 transition-all duration-500 ${isHeadingInView ? 'opacity-100 translate-y-0' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground">
            A selection of my most recent work across different categories,
            showcasing my approach to design and development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/projects" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            <span>View All Projects</span>
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
