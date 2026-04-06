
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Building2, Globe, ShieldCheck, TrendingUp, Laptop, Server, Users, Wrench } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const team = [
    { name: 'Rakesh Chaudhary', role: 'Chairman', image: 'https://images.unsplash.com/photo-1552581234-26160f608093', bio: 'Visionary leader with decades of experience in global real estate and strategic investments.' },
    { name: 'Umesh Yadav', role: 'Project Partner', image: 'https://images.unsplash.com/photo-1685955011452-2d9cf1cb4081', bio: 'Expert in project execution and delivery, ensuring quality and timely completion across all markets.' },
    { name: 'Pramod Gupta', role: 'Global Business Partner', image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2', bio: 'Driving international expansion and forging strategic partnerships in key global markets.' },
    { name: 'Smart Singh', role: 'International Motivator & Trainer', image: 'https://images.unsplash.com/photo-1573167582108-000d05b2faad', bio: 'Empowering our network of associates through world-class training and motivational programs.' }
  ];

  return (
    <>
      <Helmet><title>About Us - Next Erra Group</title></Helmet>
      <Header />

      {/* SECTION 1 - HERO */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1616870034869-ddeca4aeaf30" alt="Modern architecture" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0B1F3A]/85 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] to-transparent opacity-80" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">About Next Erra Group</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Transforming the Global Real Estate Ecosystem through innovation, transparency, and strategic growth.
          </p>
        </div>
      </section>

      {/* SECTION 2 - COMPANY OVERVIEW */}
      <section className="section-padding bg-background relative">
        <div className="absolute inset-0 bg-muted/10 pointer-events-none" />
        <div className="container-custom max-w-4xl text-center relative z-10">
          <h2 className="mb-8">Company Overview</h2>
          <div className="bg-card p-8 md:p-12 rounded-3xl shadow-sm border">
            <p className="text-lg text-muted-foreground mb-6">
              Next Erra Group is a pioneering real estate investment and management platform designed to democratize access to premium property markets. Headquartered with a strong presence in Mumbai, Lucknow, and Dubai, we bridge the gap between ambitious investors and high-yield real estate opportunities.
            </p>
            <p className="text-lg text-muted-foreground">
              By leveraging cutting-edge digital infrastructure, we ensure that every transaction is transparent, secure, and optimized for maximum returns. Our ecosystem is built not just for buying and selling, but for creating sustainable, long-term wealth for our global community of associates and customers.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 - WHAT WE DO */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>What We Do</h2>
            <p className="text-muted-foreground mt-4">Comprehensive solutions for the modern real estate investor.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Building2, title: 'Curate Premium Properties', desc: 'We identify and vet high-potential residential and commercial properties across prime global locations.' },
              { icon: ShieldCheck, title: 'End-to-End Management', desc: 'Provide complete property management solutions, ensuring hassle-free ownership and maintenance.' },
              { icon: Laptop, title: 'Digital Transactions', desc: 'Facilitate secure, transparent, and swift digital transactions through our proprietary platform.' },
              { icon: TrendingUp, title: 'Investment Consulting', desc: 'Offer strategic investment consulting to help you build a diversified and profitable portfolio.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 bg-card p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h4 className="mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - MISSION & VISION */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary-foreground/10 p-10 rounded-3xl backdrop-blur-sm border border-primary-foreground/20">
              <h3 className="text-secondary mb-6">Our Mission</h3>
              <p className="text-lg leading-relaxed text-primary-foreground/90">
                To democratize access to premium real estate investments by providing a transparent, technology-driven platform that empowers individuals to build wealth and secure their financial future with confidence.
              </p>
            </div>
            <div className="bg-primary-foreground/10 p-10 rounded-3xl backdrop-blur-sm border border-primary-foreground/20">
              <h3 className="text-secondary mb-6">Our Vision</h3>
              <p className="text-lg leading-relaxed text-primary-foreground/90">
                To become the globally recognized standard for real estate excellence, creating a borderless ecosystem where property investment is seamless, secure, and universally accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - CORE STRENGTHS */}
      <section className="section-padding bg-background relative">
        <div className="absolute inset-0 bg-muted/10 pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2>Our Core Strengths</h2>
            <p className="text-muted-foreground mt-4">The pillars that support our robust ecosystem.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Laptop, title: 'Technology-Driven', desc: 'Advanced digital platform for seamless operations.' },
              { icon: Globe, title: 'Global Access', desc: 'Direct access to international property markets.' },
              { icon: Server, title: 'Scalable Infrastructure', desc: 'Built to handle high-volume global transactions.' },
              { icon: Users, title: 'User-Friendly', desc: 'Intuitive interfaces for both associates and customers.' },
              { icon: Wrench, title: 'Integrated Tools', desc: 'Comprehensive CRM and portfolio management tools.' }
            ].map((item, i) => (
              <div key={i} className={`bg-card p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <item.icon className="w-10 h-10 text-secondary mb-6" />
                <h4 className="mb-3">{item.title}</h4>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 - LEADERSHIP TEAM */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Leadership Team</h2>
            <p className="text-muted-foreground mt-4">The visionaries driving Next Erra Group forward.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden border shadow-sm flex flex-col sm:flex-row group">
                <div className="w-full sm:w-2/5 h-64 sm:h-auto relative overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                  <h3 className="text-xl mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 - CONTACT CTA */}
      <section className="py-24 bg-background border-t">
        <div className="container-custom text-center">
          <h2 className="mb-6">Get in Touch</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Ready to start your journey with Next Erra Group? Contact our team or join our platform today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-14 px-8 text-base">
              <Link to="/signup">Join Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
