
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Logo from './Logo.jsx';

function Footer() {
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' }
  ];

  const legalLinks = [
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Refund Policy', path: '/refund' },
    { label: 'Disclaimer', path: '/disclaimer' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-[#0B1F3A] text-white border-t border-white/10 mt-auto">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Logo variant="footer" className="text-white" />
            <p className="text-sm leading-relaxed text-white/80 max-w-xs">
              Next Erra Group is a premium real estate investment platform democratizing access to global property markets through transparent, technology-driven solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/80 hover:text-secondary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/80 hover:text-secondary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <a href="mailto:info@nexterragroup.com" className="text-sm text-white/80 hover:text-secondary transition-colors">
                  info@nexterragroup.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm text-white/80">+91 8400013213 (IN)</span>
                  <span className="text-sm text-white/80">+971 529375409 (UAE)</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/80">Andheri East, Mumbai, Maharashtra 400069</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            © 2026 Next Erra Group. All rights reserved.
          </p>
          <p className="text-xs text-white/50">
            Any dispute subject to Mumbai High Court jurisdiction only.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
