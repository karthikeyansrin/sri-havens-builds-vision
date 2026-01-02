
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Srinivasan\'s',
      status: 'completed',
      category: 'residential',
      location: 'Padappai',
      description: 'A 4-bedroom home with modern design elements and ample space for nature to thrive.',
  image: '/Srinivasans1.png',
  images: ['/Srinivasans1.png'],
      completionDate: 'June 2024',
      area: '2,300 sq ft'
    },
    {
      id: 2,
      title: 'Laxmi\'s Home',
      status: 'ongoing',
      category: 'residential',
      location: 'Maraimalai Nagar',
      description: 'Traditional design meets modern comfort in this carefully planned family residence.',
  image: '/laxmi1.jpeg',
  images: ['/laxmi1.jpeg', '/laxmi2.jpeg', '/laxmi3.jpeg'],
      completionDate: 'April 2026',
      area: '2,700 sq ft'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Modal / Gallery state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (project: any, startIndex = 0) => {
    setModalImages(project.images || [project.image]);
    setCurrentIndex(startIndex);
    setIsModalOpen(true);
    // prevent background scroll
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  const prevImage = () => setCurrentIndex(i => (i - 1 + modalImages.length) % modalImages.length);
  const nextImage = () => setCurrentIndex(i => (i + 1) % modalImages.length);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/20 py-6">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-5xl font-bold text-foreground mb-4">
              Our Projects
            </h1>
            <p className="font-body text-l text-muted-foreground max-w-2xl mx-auto">
              Explore our portfolio of exceptional homes and discover the quality 
              craftsmanship that defines Sri Havens Constructions.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className="font-body"
              >
                All Projects
              </Button>
              <Button
                variant={filter === 'completed' ? 'default' : 'outline'}
                onClick={() => setFilter('completed')}
                className="font-body"
              >
                Completed
              </Button>
              <Button
                variant={filter === 'ongoing' ? 'default' : 'outline'}
                onClick={() => setFilter('ongoing')}
                className="font-body"
              >
                Ongoing
              </Button>
              <Button
                variant={filter === 'planning' ? 'default' : 'outline'}
                onClick={() => setFilter('planning')}
                className="font-body"
              >
                Planning
              </Button>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} onClick={() => openModal(project)} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30 cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-heading text-xl font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <Badge className={`${getStatusColor(project.status)} font-body text-xs`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <p className="font-body text-muted-foreground text-sm mb-4">
                      {project.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-body text-muted-foreground">Location:</span>
                        <span className="font-body text-foreground font-medium">{project.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-muted-foreground">Area:</span>
                        <span className="font-body text-foreground font-medium">{project.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-muted-foreground">Timeline:</span>
                        <span className="font-body text-foreground font-medium">{project.completionDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true">
                <div className="absolute inset-0 bg-black/60" onClick={closeModal}></div>

                <div
                  className="relative bg-white rounded shadow-lg overflow-hidden"
                  style={{ width: '70vw', height: '70vh', maxWidth: '1200px', maxHeight: '90vh', boxSizing: 'border-box' }}
                >
                  <button onClick={closeModal} aria-label="Close" className="absolute top-3 right-3 bg-white rounded-full p-2 shadow z-20">✕</button>

                  <div className="h-full flex flex-col">
                    <div className="flex-1 relative flex items-center justify-center bg-black">
                      {/* Left / Right navigation buttons (overlay center left/right) */}
                      <button onClick={prevImage} aria-label="Previous" className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white px-4 py-2 rounded-full shadow z-20">‹</button>
                      <button onClick={nextImage} aria-label="Next" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white px-4 py-2 rounded-full shadow z-20">›</button>

                      {/* Main image: constrain using calc of the modal height minus thumbnails area so thumbnails remain visible */}
                      <img
                        src={modalImages[currentIndex] ? encodeURI(modalImages[currentIndex]) : ''}
                        alt={`img-${currentIndex}`}
                        className="object-contain"
                        style={{ maxWidth: 'calc(70vw - 40px)', maxHeight: 'calc(70vh - 120px)' }}
                      />
                    </div>

                    {/* Thumbnails bar: fixed height so modal size never changes */}
                    <div className="p-4 border-t bg-white" style={{ height: '134px', boxSizing: 'border-box' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 overflow-x-auto">
                          {modalImages.map((src, idx) => (
                            <img
                              key={idx}
                              src={encodeURI(src)}
                              alt={`thumb-${idx}`}
                              onClick={() => setCurrentIndex(idx)}
                              className={`w-28 h-20 object-cover rounded cursor-pointer flex-shrink-0 ${currentIndex === idx ? 'ring-2 ring-primary' : ''}`}
                            />
                          ))}
                        </div>
                        {/* optional thumbnail nav controls could stay, but primary nav is overlay */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="font-body text-muted-foreground text-lg">
                  No projects found for the selected filter.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="font-body text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and create something extraordinary together.
            </p>
            <div>
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-medium px-8 py-3 rounded-full"
              >
                Get In Touch
              </Button>
            </Link>
            </div>            
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
