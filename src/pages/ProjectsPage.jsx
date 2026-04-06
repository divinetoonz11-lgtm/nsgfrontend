
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { MapPin, Building, Home, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const projectsData = [
  {
    id: 1,
    title: 'Jalaram Eco Homes',
    location: 'Palghar, Mumbai Metropolitan Region',
    type: 'Residential Apartments',
    shortDescription: 'Eco-friendly residential project offering affordable and spacious homes in a peaceful environment.',
    fullDescription: 'Jalaram Eco Homes ek well-planned residential project hai jo Palghar ke fast-developing area mein located hai. Yeh project eco-friendly living aur modern lifestyle ka perfect combination provide karta hai. Natural ventilation, open spaces aur greenery ke saath yeh project comfortable aur healthy living experience deta hai.',
    configurations: ['1 BHK', '2 BHK'],
    amenities: [
      'Landscaped Garden',
      'Children Play Area',
      'Parking Facility',
      '24x7 Security',
      'Water Supply'
    ],
    highlights: [
      'Affordable housing',
      'Peaceful environment',
      'Good investment potential',
      'Growing location'
    ],
    heroImage: 'https://images.unsplash.com/photo-1684943089794-67bfb3ff76f3',
    hasMap: false
  },
  {
    id: 2,
    title: 'Devnagari',
    location: 'Nalasopara, Mumbai',
    type: 'Residential Apartments',
    shortDescription: 'Well-connected residential project ideal for families with modern amenities and city accessibility.',
    fullDescription: 'Devnagari Nalasopara mein located ek strategically planned residential project hai jo daily commuters ke liye best choice hai. Railway connectivity aur nearby infrastructure ki wajah se yeh project comfortable aur convenient lifestyle provide karta hai.',
    configurations: ['1 RK', '1 BHK', '2 BHK'],
    amenities: [
      'Lift Facility',
      'Security System',
      'Parking',
      'Power Backup',
      'Play Area'
    ],
    highlights: [
      'Prime location',
      'Excellent connectivity',
      'Budget-friendly homes',
      'Ideal for families'
    ],
    heroImage: 'https://images.unsplash.com/photo-1694852361007-fec112738f10',
    hasMap: false
  },
  {
    id: 3,
    title: 'Vedanshi Lucknow',
    location: 'Balsingh Kheda, Nagram to Gangaganj Road, Lucknow',
    type: 'Residential Plotting Project',
    shortDescription: 'Well-planned plotting project with wide roads, green areas, and strong future investment potential.',
    fullDescription: 'Vedanshi Lucknow ek large-scale plotting project hai jo organized layout aur natural surroundings ke saath develop kiya gaya hai. Project mein proper road planning, green zones aur water features jaise pond included hai. Yeh project future development zone mein located hai, jo long-term investment ke liye ideal hai.',
    configurations: ['600 sq.ft', '1000 sq.ft', '1250 sq.ft', '1500 sq.ft', '3000 sq.ft+'],
    amenities: [
      'Wide internal roads (25 ft, 30 ft, 40 ft, 50 ft)',
      'Green park areas',
      'Pond area',
      'Drainage system',
      'Organized block layout (A, B, C, D, E, F, G, H zones)',
      'Canal connectivity nearby'
    ],
    highlights: [
      'Total project area approx 12,31,312 sq.ft',
      'Future expansion scope',
      'Ideal for investment & residential use',
      'Planned infrastructure'
    ],
    heroImage: 'https://images.unsplash.com/photo-1696541681628-ecbfe43abd6c',
    hasMap: true,
    mapCoordinates: { lat: 26.8467, lng: 80.9462 }
  }
];

function ProjectCard({ project }) {
  const [expandedSections, setExpandedSections] = useState({
    description: false,
    amenities: false,
    highlights: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Hero Image */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img 
          src={project.heroImage} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <Badge className="mb-3 bg-secondary text-secondary-foreground">
            {project.type}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2" style={{letterSpacing: '-0.02em'}}>
            {project.title}
          </h2>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="w-4 h-4" />
            <span className="text-sm sm:text-base">{project.location}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6 sm:p-8 space-y-6">
        {/* Short Description */}
        <p className="text-lg text-muted-foreground leading-relaxed">
          {project.shortDescription}
        </p>

        <Separator />

        {/* Configurations */}
        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Home className="w-5 h-5 text-primary" />
            Available Configurations
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.configurations.map((config, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1.5 text-sm">
                {config}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Expandable Sections */}
        <Accordion type="multiple" className="w-full">
          {/* Full Description */}
          <AccordionItem value="description" className="border-none">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
              Full Description
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
              {project.fullDescription}
            </AccordionContent>
          </AccordionItem>

          {/* Amenities */}
          <AccordionItem value="amenities" className="border-none">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
              Amenities & Features
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{amenity}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Highlights */}
          <AccordionItem value="highlights" className="border-none">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
              Key Highlights
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Map Section for Vedanshi Lucknow */}
        {project.hasMap && (
          <>
            <Separator />
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Location Map
              </h3>
              <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-muted border">
                <iframe
                  title={`${project.title} Location Map`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${project.mapCoordinates.lng - 0.02},${project.mapCoordinates.lat - 0.02},${project.mapCoordinates.lng + 0.02},${project.mapCoordinates.lat + 0.02}&layer=mapnik&marker=${project.mapCoordinates.lat},${project.mapCoordinates.lng}`}
                  allowFullScreen
                />
                <div className="absolute bottom-2 right-2">
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${project.mapCoordinates.lat}&mlon=${project.mapCoordinates.lng}#map=15/${project.mapCoordinates.lat}/${project.mapCoordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-md text-xs font-medium shadow-md hover:bg-gray-50 transition-colors"
                  >
                    View Larger Map
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button className="flex-1 h-12 text-base" asChild>
            <a href="/contact">Enquire Now</a>
          </Button>
          <Button variant="outline" className="flex-1 h-12 text-base" asChild>
            <a href="https://www.divineacres.in" target="_blank" rel="noopener noreferrer">
              View on Property Portal
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <Helmet>
        <title>Our Projects - Next Erra Group</title>
        <meta name="description" content="Explore our premium real estate projects including Jalaram Eco Homes in Palghar, Devnagari in Nalasopara, and Vedanshi Lucknow plotting project." />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight" style={{letterSpacing: '-0.02em'}}>
            Our Projects
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated portfolio of residential projects across Mumbai and Lucknow, designed for modern living and smart investment
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="space-y-16">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to invest in your dream property?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get in touch with our team to learn more about these projects and find the perfect property for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-12 px-8" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8" asChild>
              <a href="https://www.divineacres.in" target="_blank" rel="noopener noreferrer">
                Browse All Properties
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
