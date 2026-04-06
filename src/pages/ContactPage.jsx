import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Phone, Mail, Clock, MapPin, Loader2 } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Helmet><title>Contact Us - Next Era Global</title></Helmet>
      <Header />

      {/* SECTION 1 - HERO */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c" alt="Office building" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0B1F3A]/85 mix-blend-multiply" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Get in touch with our team. We're here to help!
          </p>
        </div>
      </section>

      {/* SECTION 2 - INFO CARDS */}
      <section className="section-padding bg-background -mt-10 relative z-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-8 rounded-2xl border shadow-sm text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Call Us</h3>
              <p className="text-muted-foreground mb-1">+91 8400013213 (India)</p>
              <p className="text-muted-foreground mb-4">+971 529375409 (UAE)</p>
              <p className="text-sm text-primary font-medium">Available during business hours</p>
            </div>
            
            <div className="bg-card p-8 rounded-2xl border shadow-sm text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Email Us</h3>
              <p className="text-muted-foreground mb-4">info@nexterraglobal.co.in</p>
              <p className="text-sm text-primary font-medium">We'll respond within 24 hours</p>
            </div>

            <div className="bg-card p-8 rounded-2xl border shadow-sm text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <p className="text-muted-foreground mb-1">Mon - Sat: 10:00 AM - 6:00 PM</p>
              <p className="text-muted-foreground mb-4">Sunday: Closed</p>
              <p className="text-sm text-primary font-medium">IST Timezone</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - CONTACT FORM */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom max-w-3xl">
          <div className="bg-card p-8 md:p-12 rounded-3xl border shadow-sm">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Send us a Message</h2>
              <p className="text-muted-foreground">Fill out the form below and our team will get back to you shortly.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    placeholder="John Doe"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    placeholder="john@example.com"
                    className="bg-background"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                  placeholder="How can we help you?"
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  placeholder="Your message here..."
                  className="min-h-[150px] bg-background"
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full h-14 text-lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...</>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 4 - OFFICE LOCATIONS */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Our Offices</h2>
            <p className="text-muted-foreground mt-4">Visit us at any of our global locations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl border shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">Mumbai Head Office</h3>
              </div>
              <p className="text-muted-foreground mb-4">Andheri East, Mumbai, Maharashtra 400069, India</p>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +91 8400013213</p>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> info@nexterraglobal.co.in</p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl border shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">Lucknow Branch</h3>
              </div>
              <p className="text-muted-foreground mb-4">Gomti Nagar, Lucknow, Uttar Pradesh 226010, India</p>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +91 8400013213</p>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> info@nexterraglobal.co.in</p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl border shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">Dubai Office</h3>
              </div>
              <p className="text-muted-foreground mb-4">Business Bay, Dubai, United Arab Emirates</p>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +971 529375409</p>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> info@nexterraglobal.co.in</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - MAP */}
      <section className="h-[400px] w-full bg-muted relative">
        <iframe 
          title="Office Locations"
          src="https://www.openstreetmap.org/export/embed.html?bbox=72.82%2C19.05%2C72.92%2C19.15&amp;layer=mapnik" 
          className="w-full h-full border-0"
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="absolute inset-0 pointer-events-none border-t border-border/50 shadow-inner"></div>
      </section>

      <Footer />
    </>
  );
}