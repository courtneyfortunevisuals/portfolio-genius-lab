
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react';
import { projects } from '../components/home/Projects';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const foundProject = projects.find(p => p.slug === slug);
      if (foundProject) {
        setProject({
          ...foundProject,
          date: "January 2023",
          client: "Client Name",
          role: "Design & Development",
          technologies: ["React", "TypeScript", "Tailwind CSS"],
          description: `
            This project involved creating a comprehensive design solution that balanced aesthetics with functionality.
            The goal was to create an intuitive and engaging user experience that would help the client achieve their business objectives.
            
            The design process began with extensive research and wireframing, followed by high-fidelity mockups and prototyping.
            Close collaboration with the client throughout the project ensured that their vision was realized while maintaining design integrity.
            
            The final product exceeded expectations, resulting in improved user engagement and business metrics.
          `,
          images: [
            foundProject.image,
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
          ]
        });
      }
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [slug]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-5 py-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Back button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft size={16} className="mr-2" />
          <span>Back to Projects</span>
        </Link>
        
        {/* Project header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1.5" />
              <span>{project.date}</span>
            </div>
            <div className="flex items-center">
              <Tag size={16} className="mr-1.5" />
              <span>{project.category}</span>
            </div>
          </div>
        </div>
        
        {/* Main image */}
        <div className="relative rounded-xl overflow-hidden mb-16 animate-scale-in shadow-xl">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-auto"
          />
        </div>
        
        {/* Project details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2 animate-slide-up">
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <div className="prose prose-lg max-w-none">
              {project.description.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i} className="text-muted-foreground mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Project Details</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Client</h4>
                  <p>{project.client}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Role</h4>
                  <p>{project.role}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Timeline</h4>
                  <p>{project.date}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Technologies</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech: string) => (
                      <span 
                        key={tech} 
                        className="inline-block px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <a 
                  href="#" 
                  className="inline-flex items-center text-primary hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Visit Live Site</span>
                  <ExternalLink size={14} className="ml-1.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional images */}
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-bold">Project Gallery</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images.slice(1).map((image: string, index: number) => (
              <div 
                key={index}
                className="rounded-xl overflow-hidden shadow-lg hover-lift"
              >
                <img 
                  src={image} 
                  alt={`${project.title} - Image ${index + 2}`} 
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Next/Prev navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link 
            to={`/project/${(projects[0] || {}).slug}`} 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Previous Project</span>
          </Link>
          
          <Link 
            to={`/project/${(projects[1] || {}).slug}`} 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Next Project</span>
            <ArrowLeft size={16} className="ml-2 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
