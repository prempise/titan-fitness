'use client'

import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'

export default function PricingCard({ plan, highlighted, annual, index }) {
  const price = annual ? Math.round(plan.price * 0.8) : plan.price

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className={`relative rounded-xl p-8 flex flex-col transition-all duration-300 ${
        highlighted
          ? 'bg-gradient-dark border-2 border-gold glow-gold scale-105 z-10'
          : plan.gold
          ? 'bg-card border border-gold/30'
          : 'bg-card border border-white/10 hover:border-primary/40'
      }`}
    >
      {/* Popular badge */}
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-primary text-white font-oswald text-xs tracking-[3px] uppercase px-5 py-2 rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3" fill="white" /> Most Popular
          </span>
        </div>
      )}

      {/* Plan name */}
      <div className={`font-oswald text-sm tracking-[4px] uppercase mb-2 ${
        highlighted ? 'text-gold' : plan.gold ? 'text-gold' : 'text-primary'
      }`}>
        {plan.name}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-2">
        <span className="font-oswald text-6xl font-bold text-white">${price}</span>
        <span className="text-text-secondary font-inter">/month</span>
      </div>

      {annual && (
        <div className="text-success text-xs font-inter mb-4">
          ✓ Save 20% with annual billing
        </div>
      )}

      <p className="text-text-secondary text-sm font-inter mb-6 pb-6 border-b border-white/10">
        {plan.tagline}
      </p>

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
              highlighted ? 'text-gold' : plan.gold ? 'text-gold' : 'text-primary'
            }`} />
            <span className="text-sm text-text-secondary font-inter leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={`w-full py-4 font-oswald tracking-[3px] uppercase text-sm rounded-lg transition-all duration-300 ${
          highlighted
            ? 'bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5'
            : plan.gold
            ? 'bg-gradient-to-r from-gold to-amber-500 text-dark font-bold hover:shadow-lg hover:shadow-gold/40'
            : 'border border-primary/40 text-white hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/30'
        }`}
      >
        Get Started
      </button>
    </motion.div>
  )
}
