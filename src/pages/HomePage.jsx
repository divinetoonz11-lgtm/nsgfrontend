
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  Building2, Globe, ShieldCheck, Laptop, Network, Home, 
  UserPlus, LineChart, Star, Gift, CheckCircle2, MapPin
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const projects = [
    { id: 1, name: 'Skyline Residences', location: 'Mumbai', type: 'Residential', priceRange: '₹2.5 Cr - ₹5 Cr', status: 'Available', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00' },
    { id: 2, name: 'Green Valley Estates', location: 'Lucknow', type: 'Residential', priceRange: '₹80 L - ₹1.5 Cr', status: 'Available', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750' },
    { id: 3, name: 'Marina Heights', location: 'Dubai', type: 'Commercial', priceRange: 'AED 2M - AED 5M', status: 'Coming Soon', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914' },
    { id: 4, name: 'Tech Park Alpha', location: 'Mumbai', type: 'Commercial', priceRange: '₹5 Cr - ₹15 Cr', status: 'Available', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab' },
    { id: 5, name: 'Oasis Villas', location: 'Dubai', type: 'Residential', priceRange: 'AED 5M - AED 12M', status: 'Sold Out', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9' },
    { id: 6, name: 'Heritage Towers', location: 'Lucknow', type: 'Mixed', priceRange: '₹1 Cr - ₹3 Cr', status: 'Available', image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8' },
  ];

  const testimonials = [
    { name: 'Arjun Mehta', role: 'Business Owner', rating: 5, review: 'This platform helped me grow my network and income efficiently. The returns have exceeded my expectations, and the transparency is unmatched.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
    { name: 'Priya Sharma', role: 'IT Professional', rating: 5, review: 'Great community and transparent system. Highly recommended! The team\'s expertise made investing in real estate simple and profitable.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    { name: 'Vikram Patel', role: 'Entrepreneur', rating: 5, review: 'Best decision to join. Amazing support team! The international reach and local expertise create perfect investment opportunities.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' }
  ];

  return (
    <>
      <Helmet><title>Next Erra Group - Smart Investments. Real Growth.</title></Helmet>
      <Header />

      {/* SECTION 1 - HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1636897246834-c134f3e5be44" alt="Premium real estate" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0B1F3A]/75 mix-blend-multiply" />
        </div>
        <div className="relative z-10 container-custom text-center text-white animate-fade-in-up">
          <h1 className="mb-6 text-white drop-shadow-lg">Smart Investments. Real Growth.</h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Access premium real estate opportunities across India & global markets with complete transparency and digital infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-14 px-8 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white">
              <a href="https://www.divineacres.co.in" target="_blank" rel="noopener noreferrer">Explore Properties</a>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2 - ABOUT PLATFORM */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Democratizing Global Real Estate</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">We bridge the gap between ambitious investors and high-yield property markets through our innovative platform.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Laptop, title: 'Digital-First Approach', desc: 'Seamless online transactions, portfolio tracking, and instant updates through our advanced tech infrastructure.' },
              { icon: Globe, title: 'Global Reach', desc: 'Access curated property investments in prime locations including Mumbai, Lucknow, and Dubai.' },
              { icon: ShieldCheck, title: 'Transparent System', desc: 'Complete visibility into your investments, returns, and network growth with bank-grade security.' }
            ].map((item, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl border shadow-sm text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="mb-3">{item.title}</h4>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - CORE SYSTEMS */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <h2 className="text-center mb-16">Our Core Systems</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { icon: Laptop, title: 'Technology Platform', features: ['Real-time dashboard', 'Secure payment gateway', 'Automated payouts', 'Analytics & reporting'] },
              { icon: Building2, title: 'Real Estate Marketplace', features: ['Verified properties', 'Virtual tours', 'Legal compliance', 'Property management'] },
              { icon: Network, title: 'Network System', features: ['Structured organization', 'Performance tracking', 'Team collaboration', 'Reward milestones'] }
            ].map((sys, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-lg transition-shadow duration-300">
                <sys.icon className="w-10 h-10 text-secondary mb-6" />
                <h3 className="text-xl mb-6">{sys.title}</h3>
                <ul className="space-y-3">
                  {sys.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - INCOME MODEL */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-white">Multiple Earning Opportunities</h2>
            <p className="text-primary-foreground/80 mt-4 max-w-2xl mx-auto">Participate in various earning channels designed to reward your involvement and growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Home, title: 'Property-Based Earnings', desc: 'Earn through property participation and appreciation opportunities.' },
              { icon: UserPlus, title: 'Referral-Based Incentives', desc: 'Receive incentives for introducing qualified members to our platform.' },
              { icon: LineChart, title: 'Performance-Based Rewards', desc: 'Earn rewards based on your activity and engagement levels.' },
              { icon: Star, title: 'Recognition Programs', desc: 'Achieve milestones and receive recognition bonuses.' },
              { icon: Gift, title: 'Loyalty Bonuses', desc: 'Exclusive benefits for long-term members and active participants.' }
            ].map((inc, i) => (
              <div key={i} className={`bg-primary-foreground/10 p-8 rounded-2xl border border-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/20 transition-colors ${i === 3 ? 'lg:col-start-1 lg:col-end-2' : ''} ${i === 4 ? 'lg:col-start-2 lg:col-end-4' : ''}`}>
                <inc.icon className="w-10 h-10 text-secondary mb-4" />
                <h4 className="text-white mb-2">{inc.title}</h4>
                <p className="text-primary-foreground/80">{inc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 - SERVICES */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="text-center mb-16">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Real Estate Investment', desc: 'Curated high-yield property portfolios.' },
              { title: 'Property Buying/Selling', desc: 'End-to-end transaction facilitation.' },
              { title: 'Global Property Access', desc: 'Invest across borders seamlessly.' },
              { title: 'Referral Income System', desc: 'Structured network marketing tools.' },
              { title: 'Digital Real Estate Business', desc: 'Run your property business online.' },
              { title: 'CRM & Management Tools', desc: 'Manage leads and investments efficiently.' }
            ].map((srv, i) => (
              <div key={i} className="p-6 rounded-2xl bg-muted/50 border hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-background rounded-lg shadow-sm flex items-center justify-center mb-4 text-primary font-bold text-xl">
                  0{i+1}
                </div>
                <h4 className="mb-2">{srv.title}</h4>
                <p className="text-muted-foreground text-sm">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 - WHY CHOOSE US */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom max-w-5xl">
          <h2 className="text-center mb-16">Why Choose Next Erra Group?</h2>
          <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
            <div className="grid grid-cols-3 bg-muted p-6 border-b font-bold text-sm md:text-base">
              <div>Feature</div>
              <div className="text-center text-muted-foreground">Traditional Real Estate</div>
              <div className="text-center text-primary">Next Erra Platform</div>
            </div>
            {[
              ['Investment Required', 'High Capital', 'Flexible Options'],
              ['Market Access', 'Local Only', 'Global Markets'],
              ['Income Streams', 'Single (Rent/Sale)', 'Multiple (5+ Types)'],
              ['Technology', 'Manual/Paperwork', '100% Digital'],
              ['Transparency', 'Low/Opaque', 'High/Real-time'],
              ['Support', 'Limited', '24/7 Dedicated']
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 p-6 border-b last:border-0 items-center text-sm md:text-base">
                <div className="font-medium">{row[0]}</div>
                <div className="text-center text-muted-foreground">{row[1]}</div>
                <div className="text-center font-semibold text-primary flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success hidden sm:block" /> {row[2]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 - GLOBAL PRESENCE */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Our Global Presence</h2>
            <p className="text-muted-foreground mt-4">Strategic locations driving our international growth.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { city: 'Mumbai, India', count: '50+ Properties', active: true },
              { city: 'Lucknow, India', count: '30+ Properties', active: true },
              { city: 'Dubai, UAE', count: '25+ Properties', active: true },
              { city: 'Expanding Markets', count: 'Coming Soon', active: false }
            ].map((loc, i) => (
              <div key={i} className={`p-8 rounded-2xl border text-center ${loc.active ? 'bg-card shadow-sm' : 'bg-muted/50 border-dashed'}`}>
                <MapPin className={`w-10 h-10 mx-auto mb-4 ${loc.active ? 'text-secondary' : 'text-muted-foreground'}`} />
                <h4 className="mb-2">{loc.city}</h4>
                <Badge variant={loc.active ? 'default' : 'secondary'}>{loc.count}</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 - PROJECTS SHOWCASE */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Featured Projects</h2>
            <p className="text-muted-foreground mt-4">Discover our latest premium property offerings.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map(project => (
              <div key={project.id} className="bg-card rounded-2xl overflow-hidden border shadow-sm flex flex-col">
                <div className="relative h-56">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                  <Badge className="absolute top-4 right-4 bg-background/90 text-foreground hover:bg-background/90 backdrop-blur-sm">
                    {project.status}
                  </Badge>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="mb-2">{project.name}</h4>
                  <div className="text-sm text-muted-foreground space-y-1 mb-6">
                    <p>{project.location} • {project.type}</p>
                    <p className="font-semibold text-foreground">{project.priceRange}</p>
                  </div>
                  <Button asChild variant="outline" className="w-full mt-auto">
                    <Link to="/projects">View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 9 - TESTIMONIALS */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="text-center mb-16">What Our Members Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl border shadow-sm flex flex-col">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-muted-foreground italic mb-8 flex-1">"{t.review}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="text-base">{t.name}</h4>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 - CONTACT CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-white mb-6">Start Your Real Estate Journey Today</h2>
          <p className="text-lg text-primary-foreground/80 mb-10">
            Join thousands of successful investors and associates building their future with Next Erra Group.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-14 px-8 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/signup">Join Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg bg-transparent border-primary-foreground/30 text-white hover:bg-primary-foreground/10 hover:text-white">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
