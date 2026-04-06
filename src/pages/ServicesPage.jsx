import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Building2, HeartHandshake as Handshake, Globe, Laptop, Share2, Settings } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';

export default function ServicesPage() {
  const services = [
    {
      icon: Building2,
      title: 'Real Estate Solutions',
      desc: 'Comprehensive property investment and management solutions tailored to your financial goals.',
      image: 'https://images.unsplash.com/photo-1602385602836-beb9f3d8099f'
    },
    {
      icon: Handshake,
      title: 'Property Buying & Selling',
      desc: 'End-to-end facilitation of property transactions with complete transparency and legal compliance.',
      image: 'https://images.unsplash.com/photo-1569083676317-dafd0fc965f7'
    },
    {
      icon: Globe,
      title: 'Global Property Access',
      desc: 'Direct access to premium international real estate markets including Dubai and major Indian cities.',
      image: 'https://images.unsplash.com/photo-1702743611030-34c9af4d01ae'
    },
    {
      icon: Laptop,
      title: 'Digital Platform Services',
      desc: 'State-of-the-art digital infrastructure for seamless portfolio tracking and secure transactions.',
      image: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b'
    },
    {
      icon: Share2,
      title: 'Network Growth Opportunities',
      desc: 'Structured programs designed to reward your active participation and community building efforts.',
      image: 'https://images.unsplash.com/photo-1701688821013-232a313f8cf8'
    },
    {
      icon: Settings,
      title: 'CRM & Business Tools',
      desc: 'Advanced management tools to help you organize leads, track investments, and scale your business.',
      image: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b'
    }
  ];

  return (
    <>
      <Helmet><title>Our Services - Next Era Global</title></Helmet>
      <Header />

      {/* SECTION 1 - HERO */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" alt="Modern business buildings" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0B1F3A]/85 mix-blend-multiply" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions for your real estate and business needs
          </p>
        </div>
      </section>

      {/* SECTION 2 - SERVICES GRID */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-1">{service.desc}</p>
                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to="/contact">Learn More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-white mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-primary-foreground/80 mb-10">
            Join our platform today to access premium real estate opportunities and powerful business tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-14 px-8 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/signup">Join Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg bg-transparent border-primary-foreground/30 text-white hover:bg-primary-foreground/10 hover:text-white">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}