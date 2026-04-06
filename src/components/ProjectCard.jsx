import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold text-sm">
          {project.status}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">{project.title}</h3>
        
        <div className="flex items-center text-sm text-card-foreground/70 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{project.location}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border">
          <div>
            <p className="text-xs text-card-foreground/60 mb-1">Investment</p>
            <p className="font-semibold text-card-foreground">{project.investment}</p>
          </div>
          <div>
            <p className="text-xs text-card-foreground/60 mb-1">Expected return</p>
            <p className="font-semibold text-accent flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {project.returns}
            </p>
          </div>
        </div>

        <p className="text-sm text-card-foreground/80 mb-6 leading-relaxed">
          {project.description}
        </p>

        <Link
          to="/projects"
          className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors duration-200 group/link"
        >
          View details
          <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </motion.div>
  );
}

export default ProjectCard;