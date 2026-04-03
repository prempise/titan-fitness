'use client'

import { motion } from 'framer-motion'
import { Instagram, Twitter, Linkedin } from 'lucide-react'
import Image from 'next/image'

export default function TrainerCard({ trainer, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group relative overflow-hidden rounded-xl bg-card neon-border"
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={trainer.image}
          alt={trainer.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        {/* Social icons - slide up on hover */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 transform translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {[Instagram, Twitter, Linkedin].map((Icon, i) => (
            <button
              key={i}
              className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center hover:scale-110 transition-transform"
              aria-label={`Social link ${i}`}
            >
              <Icon className="w-4 h-4 text-white" />
            </button>
          ))}
        </div>

        {/* Experience badge */}
        <div className="absolute top-4 right-4 bg-gradient-primary text-white font-oswald text-xs tracking-widest px-3 py-1 rounded">
          {trainer.experience}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-oswald text-xl font-bold uppercase group-hover:text-primary transition-colors duration-300">
          {trainer.name}
        </h3>
        <p className="text-primary text-sm font-inter mt-1 mb-2">{trainer.specialty}</p>
        <p className="text-text-secondary text-sm font-inter leading-relaxed line-clamp-2">{trainer.bio}</p>
      </div>
    </motion.div>
  )
}
