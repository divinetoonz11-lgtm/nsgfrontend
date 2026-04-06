import React from 'react';
import { motion } from 'framer-motion';

function ServiceCard({ icon: Icon, title, description, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border"
    >
      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
        <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-card-foreground">{title}</h3>
      <p className="text-card-foreground/80 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default ServiceCard;