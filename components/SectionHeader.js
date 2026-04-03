'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function SectionHeader({ subtitle, title, description, light = false, align = 'center' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`flex flex-col ${alignClass} mb-16`}
    >
      {subtitle && (
        <div className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-px w-10 bg-primary" />
          <span className="font-oswald text-sm tracking-[4px] text-primary uppercase">{subtitle}</span>
          <span className="h-px w-10 bg-primary" />
        </div>
      )}
      <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight">
        {title.split(' ').map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            className={`inline-block mr-3 ${i % 3 === 0 ? 'text-gradient' : ''}`}
          >
            {word}
          </motion.span>
        ))}
      </h2>
      <div className="section-divider mt-4" />
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-text-secondary text-lg max-w-2xl mt-4 leading-relaxed font-inter"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
