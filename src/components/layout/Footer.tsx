
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="border-t border-border py-12 bg-secondary/50">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <NavLink to="/" className="font-serif text-2xl font-semibold">
              Portfolio
            </NavLink>
            <p className="mt-2 text-muted-foreground max-w-md">
              Creating thoughtful digital experiences through design and development.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-3">Navigation</h3>
            <ul className="space-y-2">
              <li><NavLink to="/" className="text-muted-foreground hover:text-primary line-appear">Home</NavLink></li>
              <li><NavLink to="/#projects" className="text-muted-foreground hover:text-primary line-appear">Projects</NavLink></li>
              <li><NavLink to="/#about" className="text-muted-foreground hover:text-primary line-appear">About</NavLink></li>
              <li><NavLink to="/#contact" className="text-muted-foreground hover:text-primary line-appear">Contact</NavLink></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-3">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary line-appear mr-4">Privacy Policy</a>
            <a href="#" className="hover:text-primary line-appear">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
