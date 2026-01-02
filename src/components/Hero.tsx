
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_theme(colors.primary)_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Logo Icon */}
          <img src="/logo.png" alt="Sri Havens" className="w-20 h-20" style={{ borderRadius: '50%', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'inline-block'}}/>

          <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            SRI HAVENS
          </h1>
          
          <p className="font-heading text-xl md:text-2xl text-primary mb-4 font-medium">
            Where Homes Feel Like Havens
          </p>
          
          <p className="font-body text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Crafting exceptional residential spaces through detailed crafting, 
            thoughtful design, and unwavering attention to detail.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/projects">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Our Projects
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-body font-medium px-8 py-3 rounded-full transition-all duration-300"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
