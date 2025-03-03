
import { useEffect, useRef } from 'react';
import { ArrowDownCircle } from 'lucide-react';

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const button = buttonRef.current;

    if (heading) {
      heading.classList.add('animate-slide-down');
    }
    
    if (subheading) {
      setTimeout(() => {
        subheading.classList.add('animate-slide-down');
      }, 300);
    }
    
    if (button) {
      setTimeout(() => {
        button.classList.add('animate-fade-in');
      }, 600);
    }
  }, []);
  
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/60 z-10"></div>
        <div className="absolute top-1/4 -right-28 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-28 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container-padding max-w-7xl mx-auto w-full text-center md:text-left md:w-3/4 pt-20">
        <div className="space-y-6">
          <h1 
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold opacity-0"
          >
            Crafting <span className="text-gradient">Digital Experiences</span> With Precision
          </h1>
          
          <p 
            ref={subheadingRef}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto md:mx-0 opacity-0"
          >
            A creative professional focused on designing and developing 
            memorable digital solutions that balance form and function.
          </p>
          
          <div>
            <a 
              ref={buttonRef}
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToProjects();
              }}
              className="inline-flex items-center space-x-2 mt-8 text-primary font-medium opacity-0 hover:opacity-80 transition-opacity"
            >
              <span>View Projects</span>
              <ArrowDownCircle size={20} className="animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
