import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function BlogCard({ post, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-card-foreground/60 mb-3">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{post.date}</span>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-card-foreground line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-card-foreground/80 mb-4 leading-relaxed line-clamp-3">
          {post.description}
        </p>

        <Link
          to="/blog"
          className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors duration-200 group/link"
        >
          Read more
          <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </motion.div>
  );
}

export default BlogCard;