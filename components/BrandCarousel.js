'use client'

import { motion } from 'framer-motion'

const brands = ['Nike', 'Adidas', 'Under Armour', 'Reebok', 'Puma', 'Gymshark', 'MyProtein', 'Technogym']

export default function BrandCarousel() {
  const duplicated = [...brands, ...brands]

  return (
    <div className="relative overflow-hidden py-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-16 animate-marquee"
        style={{ animation: 'marquee 25s linear infinite' }}
      >
        {duplicated.map((brand, i) => (
          <div
            key={i}
            className="flex-shrink-0 font-oswald text-2xl font-bold tracking-widest uppercase text-white/20 hover:text-primary transition-colors duration-300 cursor-default whitespace-nowrap"
          >
            {brand}
          </div>
        ))}
      </div>
    </div>
  )
}
