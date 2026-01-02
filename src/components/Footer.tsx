
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.png" alt="Sri Havens" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Sri Havens
                </h3>
                <p className="text-sm text-muted-foreground font-body">Constructions</p>
              </div>
            </div>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              Where Homes Feel Like Havens. Creating quality residential spaces with 
              attention to detail and thoughtful design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <nav className="space-y-2">
              <Link 
                to="/" 
                className="block text-muted-foreground hover:text-primary transition-colors font-body text-sm"
              >
                Home
              </Link>
              <Link 
                to="/projects" 
                className="block text-muted-foreground hover:text-primary transition-colors font-body text-sm"
              >
                Projects
              </Link>
              <Link 
                to="/contact" 
                className="block text-muted-foreground hover:text-primary transition-colors font-body text-sm"
              >
                Contact
              </Link>
              <Link 
                to="/sketchpad" 
                className="block text-muted-foreground hover:text-primary transition-colors font-body text-sm"
              >
                Sketchpad
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">
              Get In Touch
            </h4>
            <div className="space-y-2">
              <p className="text-muted-foreground font-body text-sm">
                Ready to build your dream home?
              </p>
              <a 
                href="mailto:enquiry@srihavensconstructions.com"
                className="block text-primary hover:text-primary/80 transition-colors font-body text-sm font-medium"
              >
                enquiry@srihavensconstructions.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground font-body text-sm">
            © 2026 Sri Havens Constructions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
