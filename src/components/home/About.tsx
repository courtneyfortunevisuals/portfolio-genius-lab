
import { useRef } from 'react';
import { FileText } from 'lucide-react';

// Custom hook to determine if element is in view (duplicate for simplicity)
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

const skills = [
  { category: "Design", items: ["UI/UX Design", "Interaction Design", "Design Systems", "Visual Design"] },
  { category: "Development", items: ["React.js", "Typescript", "Tailwind CSS", "Node.js"] },
  { category: "Tools", items: ["Figma", "Adobe Creative Suite", "Webflow", "Git"] }
];

import { useState, useEffect } from 'react';

const About = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef);
  
  const imageRef = useRef<HTMLDivElement>(null);
  const isImageInView = useInView(imageRef);

  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            ref={imageRef}
            className={`relative opacity-0 translate-x-[-20px] transition-all duration-700 ${isImageInView ? 'opacity-100 translate-x-0' : ''}`}
          >
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e" 
                alt="Portrait" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent mix-blend-overlay"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full filter blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full filter blur-2xl"></div>
          </div>
          
          <div 
            ref={contentRef}
            className={`opacity-0 translate-x-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : ''}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            
            <div className="prose prose-lg">
              <p className="text-muted-foreground mb-4">
                I'm a digital designer and developer with over 5 years of experience creating thoughtful, 
                functional, and visually compelling digital products that connect with users.
              </p>
              
              <p className="text-muted-foreground mb-8">
                My approach combines strategic thinking with design sensibility, focusing on 
                creating solutions that balance beauty with usability. I believe in simplicity, attention 
                to detail, and creating experiences that delight users while solving real problems.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Skillset</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.category}>
                    <h4 className="font-medium mb-2">{skillGroup.category}</h4>
                    <ul className="space-y-1.5">
                      {skillGroup.items.map((skill) => (
                        <li key={skill} className="text-sm text-muted-foreground">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <a 
              href="#" 
              className="inline-flex items-center px-5 py-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            >
              <FileText size={18} className="mr-2" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
