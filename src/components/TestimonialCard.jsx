import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-8 shadow-lg border border-border h-full flex flex-col"
    >
      <Quote className="w-12 h-12 text-primary/20 mb-4" />
      
      <div className="flex mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-gold text-gold" />
        ))}
      </div>

      <p className="text-card-foreground/90 leading-relaxed mb-6 flex-1 italic">
        "{testimonial.review}"
      </p>

      <div className="flex items-center">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-lg font-bold text-primary mr-4">
          {testimonial.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="font-semibold text-card-foreground">{testimonial.name}</p>
          <p className="text-sm text-card-foreground/60">{testimonial.title}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;