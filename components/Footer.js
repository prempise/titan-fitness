'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Twitter, Youtube, Zap, MapPin, Phone, Mail, ArrowRight, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import BackToTop from './BackToTop'

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter / X' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

const quickLinks = ['Home', 'About', 'Classes', 'Trainers', 'Pricing', 'Blog', 'Contact']
const programs = ['Strength Training', 'HIIT Cardio', 'Yoga & Flexibility', 'CrossFit', 'Boxing & MMA', 'Swimming']

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }
    toast.success('🔥 You\'re subscribed! Get ready to be inspired.')
    setEmail('')
  }

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase().replace(/\s/g, '-').replace('about', 'about').replace('home', 'hero'))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <BackToTop />
      <footer className="bg-secondary border-t border-white/5 relative overflow-hidden">
        {/* Gradient top border */}
        <div className="h-px w-full bg-gradient-primary" />

        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Column 1 — Brand */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-gradient-primary rounded flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" fill="white" />
                </div>
                <span className="font-oswald text-2xl font-bold tracking-widest">
                  TITAN<span className="text-primary">FITNESS</span>
                </span>
              </div>
              <p className="text-text-secondary font-inter text-sm leading-relaxed mb-6">
                More than a gym — a movement. We exist to help you forge your legacy, push your limits, and become the most powerful version of yourself.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-text-secondary hover:bg-gradient-primary hover:border-transparent hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 — Quick Links */}
            <div>
              <h4 className="font-oswald text-sm tracking-[4px] uppercase text-white mb-5">Quick Links</h4>
              <ul className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollTo(link)}
                      className="text-text-secondary text-sm font-inter hover:text-primary transition-colors underline-animate flex items-center gap-1"
                    >
                      <ArrowRight className="w-3 h-3 text-primary flex-shrink-0" />
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Programs */}
            <div>
              <h4 className="font-oswald text-sm tracking-[4px] uppercase text-white mb-5">Our Programs</h4>
              <ul className="flex flex-col gap-3">
                {programs.map((prog) => (
                  <li key={prog}>
                    <span className="text-text-secondary text-sm font-inter hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 text-primary flex-shrink-0" />
                      {prog}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Newsletter + Contact */}
            <div>
              <h4 className="font-oswald text-sm tracking-[4px] uppercase text-white mb-5">Stay Fired Up</h4>
              <p className="text-text-secondary text-sm font-inter mb-4">Get weekly workout tips, nutrition advice, and member exclusives.</p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 mb-8">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="form-input text-sm"
                />
                <button type="submit" className="btn-primary flex items-center justify-center gap-2 py-3 text-xs">
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </form>

              {/* Contact info */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary text-xs font-inter">450 Titan Boulevard, New York, NY 10001</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-text-secondary text-xs font-inter">+1 (800) TITAN-FIT</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-text-secondary text-xs font-inter">hello@titanfitness.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-secondary text-xs font-inter">
              © {new Date().getFullYear()} TITAN FITNESS. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-text-secondary text-xs font-inter hover:text-primary transition-colors underline-animate">Privacy Policy</a>
              <a href="#" className="text-text-secondary text-xs font-inter hover:text-primary transition-colors underline-animate">Terms of Service</a>
              <a href="#" className="text-text-secondary text-xs font-inter hover:text-primary transition-colors underline-animate">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
