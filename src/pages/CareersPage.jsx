import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Heart, TrendingUp, Users, Award, Coffee, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function CareersPage() {
  const jobs = [
    {
      title: 'Senior Investment Analyst',
      department: 'Investment Research',
      location: 'Mumbai',
      type: 'Full-time',
      description: 'Lead investment research and analysis for real estate and pre-IPO opportunities. Conduct due diligence, financial modeling, and market analysis.',
      requirements: [
        'MBA in Finance or related field',
        '5+ years in investment analysis or real estate',
        'Strong financial modeling and valuation skills',
        'Excellent communication and presentation abilities'
      ]
    },
    {
      title: 'Relationship Manager',
      department: 'Client Services',
      location: 'Lucknow',
      type: 'Full-time',
      description: 'Build and maintain relationships with high-net-worth clients. Provide personalized investment advice and portfolio management services.',
      requirements: [
        'Bachelor\'s degree in Finance, Business, or related field',
        '3+ years in wealth management or client services',
        'Strong interpersonal and communication skills',
        'Track record of meeting sales targets'
      ]
    },
    {
      title: 'Project Manager - Real Estate',
      department: 'Project Development',
      location: 'Dubai',
      type: 'Full-time',
      description: 'Oversee real estate project execution from planning to delivery. Coordinate with developers, contractors, and stakeholders.',
      requirements: [
        'Bachelor\'s degree in Civil Engineering or Construction Management',
        '7+ years in real estate project management',
        'PMP certification preferred',
        'Experience in international markets'
      ]
    },
    {
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Mumbai',
      type: 'Full-time',
      description: 'Develop and execute digital marketing strategies to drive investor acquisition and engagement. Manage social media, content, and campaigns.',
      requirements: [
        'Bachelor\'s degree in Marketing or related field',
        '3+ years in digital marketing, preferably in fintech',
        'Proficiency in SEO, SEM, and analytics tools',
        'Creative mindset with data-driven approach'
      ]
    },
    {
      title: 'Financial Analyst',
      department: 'Finance',
      location: 'Lucknow',
      type: 'Full-time',
      description: 'Support financial planning, budgeting, and reporting. Analyze investment performance and prepare management reports.',
      requirements: [
        'CA/CFA or MBA in Finance',
        '2+ years in financial analysis',
        'Advanced Excel and financial modeling skills',
        'Attention to detail and analytical thinking'
      ]
    },
    {
      title: 'Business Development Executive',
      department: 'Sales',
      location: 'Mumbai/Lucknow/Dubai',
      type: 'Full-time',
      description: 'Identify and pursue new business opportunities. Build partnerships with developers, brokers, and institutional investors.',
      requirements: [
        'Bachelor\'s degree in Business or related field',
        '4+ years in business development or sales',
        'Strong network in real estate or finance industry',
        'Excellent negotiation and closing skills'
      ]
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Competitive compensation',
      description: 'Industry-leading salary packages with performance-based bonuses and equity options'
    },
    {
      icon: Heart,
      title: 'Health & wellness',
      description: 'Comprehensive health insurance for you and your family, plus wellness programs'
    },
    {
      icon: Users,
      title: 'Learning & development',
      description: 'Continuous learning opportunities, certifications, and professional development programs'
    },
    {
      icon: Award,
      title: 'Career growth',
      description: 'Clear career progression paths with mentorship from industry leaders'
    },
    {
      icon: Coffee,
      title: 'Work-life balance',
      description: 'Flexible working hours, remote work options, and generous paid time off'
    },
    {
      icon: Zap,
      title: 'Innovation culture',
      description: 'Collaborative environment that encourages creativity and innovative thinking'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Careers - New ERRA Group</title>
        <meta name="description" content="Join New ERRA Group and build your career in real estate investment and fintech. Explore current job openings across Mumbai, Lucknow, and Dubai." />
      </Helmet>

      <Header />

      <section className="pt-32 pb-12 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>
              Build your career with us
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Join a team that's transforming real estate investment and building the future of wealth creation
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why join New ERRA Group
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're building a culture where talented individuals can thrive, innovate, and make a real impact on people's financial futures. Our team combines expertise, passion, and a commitment to excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">{benefit.title}</h3>
                <p className="text-card-foreground/80 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-secondary-foreground">
              Current openings
            </h2>
            <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
              Explore opportunities to join our growing team across multiple locations
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3 text-card-foreground">{job.title}</h3>
                    
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-sm text-card-foreground/70">
                        <Briefcase className="w-4 h-4 mr-2" />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center text-sm text-card-foreground/70">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-card-foreground/70">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{job.type}</span>
                      </div>
                    </div>

                    <p className="text-card-foreground/80 mb-4 leading-relaxed">
                      {job.description}
                    </p>

                    <div>
                      <h4 className="font-semibold mb-3 text-card-foreground">Requirements:</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start text-sm text-card-foreground/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 mt-2 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] whitespace-nowrap self-start"
                  >
                    Apply now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-secondary-foreground/80 mb-4">
              Don't see a role that fits? We're always looking for talented individuals.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors duration-200"
            >
              Send us your resume
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default CareersPage;