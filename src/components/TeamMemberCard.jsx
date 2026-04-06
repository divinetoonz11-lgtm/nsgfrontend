import React from 'react';
import { motion } from 'framer-motion';

function TeamMemberCard({ member, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border"
    >
      <div className="relative h-80 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-primary/10 flex items-center justify-center text-6xl font-bold text-primary">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1 text-card-foreground">{member.name}</h3>
        <p className="text-primary font-medium mb-3">{member.role}</p>
        <p className="text-sm text-card-foreground/80 leading-relaxed">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
}

export default TeamMemberCard;