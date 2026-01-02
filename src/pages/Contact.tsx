
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  // Get the base URL for the current environment
  const getBaseUrl = () => {
    if (import.meta.env.DEV) {
      return 'http://localhost:8080';
    }
    return 'https://srihavensconstructions.com';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/20 py-6">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="font-body text-l text-muted-foreground max-w-2xl mx-auto">
              Ready to build your dream home? Get in touch with us today and let's 
              start creating something extraordinary together.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
                    Send Us a Message
                  </h2>
                  <form action="https://formsubmit.co/enquiry@srihavensconstructions.com" method="POST" className="space-y-6">
                    <input type="hidden" name="_next" value={`${getBaseUrl()}/#/thank-you`} />
                    <input type="hidden" name="_subject" value="New Contact Form Submission" />
                    {/* enquiry@srihavensconstructions.com */ }
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="font-body text-sm font-medium text-foreground">
                          First Name
                        </Label>
                        <Input
                          name="firstName"
                          id="firstName" 
                          type="text" 
                          required 
                          className="mt-1 font-body"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="font-body text-sm font-medium text-foreground">
                          Last Name
                        </Label>
                        <Input 
                          name="lastName"
                          id="lastName" 
                          type="text" 
                          required 
                          className="mt-1 font-body"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="font-body text-sm font-medium text-foreground">
                        Email Address
                      </Label>
                      <Input 
                        name="email"
                        id="email" 
                        type="email" 
                        required 
                        className="mt-1 font-body"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="font-body text-sm font-medium text-foreground">
                        Phone Number
                      </Label>
                      <Input 
                        name="phone"
                        id="phone" 
                        type="tel" 
                        className="mt-1 font-body"
                        placeholder="+91 XX XXX XXXX"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="projectType" className="font-body text-sm font-medium text-foreground">
                        Project Type
                      </Label>
                      <Input 
                        name="projectType"
                        id="projectType" 
                        type="text" 
                        className="mt-1 font-body"
                        placeholder="e.g., New Home, Renovation, Extension"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="font-body text-sm font-medium text-foreground">
                        Message
                      </Label>
                      <Textarea 
                        name="message"
                        id="message" 
                        required 
                        className="mt-1 font-body min-h-[120px]"
                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body font-medium py-3"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
                    Get In Touch
                  </h2>
                  <p className="font-body text-muted-foreground leading-relaxed mb-8">
                    We're here to answer your questions and discuss your construction needs. 
                    Whether you're planning a new home, renovation, or have questions about 
                    our services, we'd love to hear from you.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Email */}
                  <Card className="border border-border hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                            Email Us
                          </h3>
                          <p className="font-body text-muted-foreground text-sm mb-2">
                            Send us your project details and we'll get back to you within 24 hours.
                          </p>
                          <a 
                            href="mailto:enquiry@srihavensconstructions.com"
                            className="font-body text-primary hover:text-primary/80 font-medium"
                          >
                            enquiry@srihavensconstructions.com
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Phone */}
                  <Card className="border border-border hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                            Call Us
                          </h3>
                          <p className="font-body text-muted-foreground text-sm mb-2">
                            Speak directly with us about your ideas.
                          </p>
                          <a 
                            href="tel:+919962574474"
                            className="font-body text-primary hover:text-primary/80 font-medium"
                          >
                            +91 99625 74474 /73
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Location */}
                  {/* <Card className="border border-border hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                            Visit Our Office
                          </h3>
                          <p className="font-body text-muted-foreground text-sm mb-2">
                            Come see our showroom and discuss your project in person.
                          </p>
                          <p className="font-body text-foreground">
                            123 Main Street<br />
                            Colombo 03, Sri Lanka
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card> */}

                  {/* Hours */}
                  {/* <Card className="border border-border hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                            Business Hours
                          </h3>
                          <div className="font-body text-foreground text-sm space-y-1">
                            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                            <p>Saturday: 9:00 AM - 4:00 PM</p>
                            <p className="text-muted-foreground">Sunday: Closed</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
