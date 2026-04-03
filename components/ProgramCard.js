'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const difficultyColors = {
  Beginner: 'bg-success/20 text-success border border-success/30',
  Intermediate: 'bg-gold/20 text-gold border border-gold/30',
  Advanced: 'bg-primary/20 text-primary border border-primary/30',
}

export default function ProgramCard({ icon: Icon, title, description, difficulty, duration, image, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -12 }}
      className="group relative rounded-lg overflow-hidden cursor-pointer neon-border bg-card"
      style={{ minHeight: '380px' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/20 group-hover:via-dark/50 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full" style={{ minHeight: '380px' }}>
        {/* Icon */}
        <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Title */}
        <h3 className="font-oswald text-2xl font-bold uppercase mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {description}
        </p>

        {/* Badges */}
        <div className="flex items-center gap-3 mt-auto">
          <span className={`badge text-xs ${difficultyColors[difficulty]}`}>{difficulty}</span>
          <span className="text-text-secondary text-xs">⏱ {duration}</span>
        </div>

        {/* Learn More */}
        <div className="flex items-center gap-2 mt-4 text-primary font-oswald text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          Learn More <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  )
}
