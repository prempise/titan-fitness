'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import {
  ChevronDown, Play, ArrowRight, Check, MapPin, Phone, Mail, Clock,
  Dumbbell, Flame, Leaf, Swords, Waves, Shield, Trophy, Users, Star,
  AlertCircle, Send, ChevronRight
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'

import SectionHeader from '../components/SectionHeader'
import StatsCounter from '../components/StatsCounter'
import ProgramCard from '../components/ProgramCard'
import PricingCard from '../components/PricingCard'
import TrainerCard from '../components/TrainerCard'
import TestimonialCarousel from '../components/TestimonialCarousel'
import BMICalculator from '../components/BMICalculator'
import ClassSchedule from '../components/ClassSchedule'
import GalleryGrid from '../components/GalleryGrid'
import VideoModal from '../components/VideoModal'
import BrandCarousel from '../components/BrandCarousel'
import InstagramFeed from '../components/InstagramFeed'

// ─── DATA ────────────────────────────────────────────────────────────────────

const programs = [
  {
    icon: Dumbbell,
    title: 'Strength Training',
    description: 'Build raw power and sculpt a physique that commands respect. Our strength program combines compound lifts with progressive overload methodology used by elite athletes.',
    difficulty: 'Intermediate',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
  },
  {
    icon: Flame,
    title: 'HIIT Cardio',
    description: 'Torch fat, skyrocket your endurance, and ignite your metabolism with high-intensity interval training that keeps burning calories long after you leave the gym.',
    difficulty: 'Advanced',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
  },
  {
    icon: Leaf,
    title: 'Yoga & Flexibility',
    description: 'Unlock your body\'s full potential with dynamic yoga flows that improve mobility, reduce injury risk, and sharpen mental focus for every other workout you do.',
    difficulty: 'Beginner',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop',
  },
  {
    icon: Swords,
    title: 'CrossFit',
    description: 'Forge an unbreakable body with constantly varied functional movements at high intensity. CrossFit at TITAN will push you past every limit you thought you had.',
    difficulty: 'Advanced',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
  },
  {
    icon: Shield,
    title: 'Boxing & MMA',
    description: 'Learn to fight, learn to move, and develop the grit of a champion. Our boxing and MMA program builds real-world confidence, coordination, and explosive power.',
    difficulty: 'Intermediate',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&h=600&fit=crop',
  },
  {
    icon: Waves,
    title: 'Swimming',
    description: 'Train in our Olympic-sized pool with certified coaches. Whether you\'re building cardiovascular endurance or recovering from intense training, swimming is transformative.',
    difficulty: 'Beginner',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=600&fit=crop',
  },
]

const trainers = [
  {
    name: 'Marcus Steel',
    specialty: 'Strength & Conditioning',
    bio: 'Former collegiate powerlifter with 12 years coaching elite athletes. Marcus has helped over 500 members shatter their personal records.',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop',
    experience: '12 Yrs',
  },
  {
    name: 'Priya Sharma',
    specialty: 'Yoga & Mindfulness',
    bio: 'Certified yoga instructor and sports psychologist. Priya combines ancient practices with modern sports science to help members unlock their inner athlete.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
    experience: '9 Yrs',
  },
  {
    name: 'Alex Rivera',
    specialty: 'CrossFit & Functional Training',
    bio: 'Level 3 CrossFit coach and former military fitness instructor. Alex\'s brutal WODs and precision coaching have minted dozens of regional competitors.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    experience: '10 Yrs',
  },
  {
    name: 'Devon Clark',
    specialty: 'Boxing & MMA',
    bio: 'Pro MMA veteran and certified boxing coach. Devon\'s classes are legendary — equal parts brutal workout and genuine martial arts education.',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop',
    experience: '15 Yrs',
  },
]

const pricingPlans = [
  {
    name: 'Basic',
    price: 29,
    tagline: 'Everything you need to get started on your fitness journey.',
    features: [
      'Full gym floor access',
      'Locker room & showers',
      '2 group classes per week',
      'Basic fitness assessment',
      'WiFi access',
      'Mobile app access',
    ],
  },
  {
    name: 'Premium',
    price: 59,
    tagline: 'The most popular plan for serious fitness enthusiasts.',
    features: [
      'Everything in Basic',
      'Unlimited group classes',
      'Olympic swimming pool',
      'Sauna & steam room',
      '1 personal training session/month',
      'Custom nutrition plan',
      'Priority class booking',
      'Guest pass (1/month)',
    ],
  },
  {
    name: 'Elite',
    price: 99,
    tagline: 'The ultimate VIP experience for unstoppable athletes.',
    features: [
      'Everything in Premium',
      'Unlimited personal training',
      'Full recovery & spa access',
      'VIP locker room',
      'Guest passes (2/month)',
      '24/7 exclusive access',
      'Quarterly body composition analysis',
      'Dedicated nutrition coach',
    ],
    gold: true,
  },
]

const blogPosts = [
  {
    title: '10 Best Exercises for Building Core Strength',
    excerpt: 'Your core is the foundation of every movement you make. Discover the science-backed exercises that elite trainers swear by for building an unbreakable midsection.',
    category: 'Workout',
    author: 'Marcus Steel',
    authorImg: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=60&h=60&fit=crop',
    date: 'Mar 15, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    categoryColor: 'bg-primary/20 text-primary border border-primary/30',
  },
  {
    title: 'Nutrition Guide: What to Eat Before & After Workouts',
    excerpt: 'Fuel your body like an elite athlete. Our head nutritionist breaks down exactly what to eat, when to eat it, and why it matters for maximizing your performance and recovery.',
    category: 'Nutrition',
    author: 'Priya Sharma',
    authorImg: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=60&h=60&fit=crop',
    date: 'Mar 8, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=400&fit=crop',
    categoryColor: 'bg-success/20 text-success border border-success/30',
  },
  {
    title: 'How to Stay Motivated: Mental Strategies for Gym Success',
    excerpt: 'The hardest rep is the one you take in your mind before you even walk through the door. Learn the psychological frameworks that top athletes use to stay consistent year-round.',
    category: 'Motivation',
    author: 'Alex Rivera',
    authorImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop',
    date: 'Feb 28, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&h=400&fit=crop',
    categoryColor: 'bg-gold/20 text-gold border border-gold/30',
  },
]

const trialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
})

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Home() {
  const [annual, setAnnual] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(trialSchema) })

  const onTrialSubmit = async (data) => {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    toast.success('🎉 Welcome to TITAN FITNESS! Your free trial is confirmed. Check your email!', { duration: 5000 })
    reset()
    setSubmitting(false)
  }

  // Floating particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
  }))

  return (
    <>
      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════ */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background with parallax */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop"
            alt="TITAN FITNESS gym interior"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/60 to-dark" />
        </motion.div>

        {/* Floating particles */}
        {particles.map(p => (
          <div
            key={p.id}
            className="particle absolute"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40 text-center"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="h-px w-12 bg-primary" />
            <span className="font-oswald text-xs tracking-[6px] text-primary uppercase">Est. 2009 — New York City</span>
            <span className="h-px w-12 bg-primary" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-oswald text-6xl sm:text-8xl lg:text-[120px] font-bold uppercase leading-none mb-6 tracking-tight"
          >
            FORGE YOUR
            <br />
            <span className="text-gradient">LEGACY</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="font-inter text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Transform Your Body. Conquer Your Limits. Become Unstoppable.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary flex items-center gap-3 py-4 px-10 text-sm animate-pulse-glow"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setVideoOpen(true)}
              className="btn-outline flex items-center gap-3 py-4 px-10 text-sm"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Play className="w-4 h-4 text-white" fill="white" />
              </div>
              Watch Video
            </button>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <div className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="max-w-5xl mx-auto px-4 sm:px-6"
          >
            <div className="glass rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border border-white/10">
              <StatsCounter end={15} suffix="+" label="Years Experience" icon={Trophy} />
              <StatsCounter end={50000} suffix="+" label="Members" icon={Users} />
              <StatsCounter end={200} suffix="+" label="Expert Trainers" icon={Shield} />
              <StatsCounter end={35} suffix="+" label="Locations" icon={MapPin} />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="font-oswald text-[10px] tracking-[4px] uppercase text-text-secondary">Scroll</span>
          <ChevronDown className="w-5 h-5 text-primary animate-bounce-slow" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — ABOUT
      ═══════════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 md:py-32 bg-dark relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] hidden lg:block"
            >
              <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-2xl overflow-hidden neon-border">
                <Image
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=500&fit=crop"
                  alt="TITAN gym floor"
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-2xl overflow-hidden border-2 border-primary">
                <Image
                  src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=400&fit=crop"
                  alt="Personal training session"
                  fill
                  className="object-cover"
                  sizes="350px"
                />
              </div>
              {/* Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-primary rounded-full flex flex-col items-center justify-center z-10 animate-pulse-glow">
                <span className="font-oswald text-3xl font-bold leading-none">15+</span>
                <span className="font-oswald text-[10px] tracking-[2px] uppercase text-center leading-tight">Years<br/>Strong</span>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-primary" />
                <span className="font-oswald text-xs tracking-[4px] text-primary uppercase">Who We Are</span>
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase leading-tight mb-6">
                MORE THAN A GYM —<br /><span className="text-gradient">A MOVEMENT</span>
              </h2>
              <p className="text-text-secondary font-inter leading-relaxed mb-4">
                TITAN FITNESS was built by athletes, for people who refuse to be ordinary. Since 2009, we&apos;ve transformed over 50,000 lives across 35 locations — not by selling gym memberships, but by building a community obsessed with becoming the best version of themselves.
              </p>
              <p className="text-text-secondary font-inter leading-relaxed mb-8">
                Our philosophy is simple: elite coaching, world-class facilities, and a culture that holds you accountable. We don&apos;t care where you&apos;re starting — we care about where you&apos;re going. Every machine, every program, every trainer exists for one purpose: your transformation.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  'State-of-the-art Equipment',
                  'Olympic-sized Swimming Pool',
                  'Recovery & Spa Center',
                  'Nutrition Counseling',
                  '24/7 Elite Access',
                  'Personal Training',
                ].map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm font-inter text-text-secondary">{f}</span>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary flex items-center gap-3 py-4 px-8 w-fit"
              >
                Explore Programs <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — PROGRAMS
      ═══════════════════════════════════════════════════════════ */}
      <section id="programs" className="py-24 md:py-32 bg-secondary clip-diagonal-both relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Train With Purpose"
            title="OUR PROGRAMS"
            description="Six elite training disciplines — each designed to push you further, faster, and harder than you thought possible."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog, i) => (
              <ProgramCard key={prog.title} {...prog} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — SCHEDULE
      ═══════════════════════════════════════════════════════════ */}
      <section id="schedule" className="py-24 md:py-32 bg-dark relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Never Miss a Session"
            title="WEEKLY SCHEDULE"
            description="Plan your week around world-class classes led by elite coaches. Something powerful happens every hour."
          />
          <ClassSchedule />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — TRAINERS
      ═══════════════════════════════════════════════════════════ */}
      <section id="trainers" className="py-24 md:py-32 bg-secondary relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="The Best In The Business"
            title="ELITE TRAINERS"
            description="Our coaches aren't just instructors — they're obsessed athletes, certified experts, and committed mentors who live and breathe your results."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {trainers.map((trainer, i) => (
              <TrainerCard key={trainer.name} trainer={trainer} index={i} />
            ))}
          </div>
          <div className="flex justify-center">
            <button className="btn-outline py-4 px-10 flex items-center gap-2">
              Meet All Trainers <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — RESULTS / TRANSFORMATIONS
      ═══════════════════════════════════════════════════════════ */}
      <section id="results" className="py-24 md:py-32 bg-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Proof That Works"
            title="REAL RESULTS"
            description="Our members' incredible transformations speak louder than any marketing claim we could make."
          />

          {/* Transformation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { name: 'Michael C.', age: 34, program: 'HIIT + Strength', duration: '4 months', lost: '18kg', quote: 'I went from feeling exhausted climbing stairs to running 5Ks. TITAN didn\'t just change my body — it changed who I am.' },
              { name: 'Sarah W.', age: 28, program: 'CrossFit + Nutrition', duration: '3 months', lost: '12kg', quote: 'The trainers pushed me harder than I ever pushed myself. I\'m stronger at 28 than I was at 22. This place is magic.' },
              { name: 'James R.', age: 41, program: 'Boxing + Yoga', duration: '6 months', lost: '22kg', quote: 'At 41 I thought my best days were behind me. TITAN proved me wrong. I\'ve never felt more alive in my life.' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl overflow-hidden neon-border group"
              >
                {/* Before/After visual */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-2">
                    <div className="relative">
                      <Image
                        src={`https://images.unsplash.com/photo-157190294320${i}-507ec2618e8f?w=300&h=250&fit=crop`}
                        alt="Before transformation"
                        fill
                        className="object-cover grayscale brightness-75"
                        sizes="150px"
                      />
                      <div className="absolute bottom-2 left-2 font-oswald text-xs tracking-widest uppercase text-white bg-dark/70 px-2 py-1 rounded">Before</div>
                    </div>
                    <div className="relative">
                      <Image
                        src={`https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=250&fit=crop`}
                        alt="After transformation"
                        fill
                        className="object-cover brightness-90"
                        sizes="150px"
                      />
                      <div className="absolute bottom-2 right-2 font-oswald text-xs tracking-widest uppercase text-white bg-primary px-2 py-1 rounded">After</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-0.5 h-full bg-primary/60" />
                    <div className="absolute w-8 h-8 rounded-full bg-primary flex items-center justify-center font-oswald text-xs font-bold">VS</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="font-oswald text-lg font-bold uppercase">{t.name}</span>
                      <span className="text-text-secondary text-sm font-inter ml-2">Age {t.age}</span>
                    </div>
                    <span className="text-success font-oswald text-xl font-bold">-{t.lost}</span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <span className="badge bg-primary/20 text-primary border border-primary/30 text-xs">{t.program}</span>
                    <span className="badge bg-card text-text-secondary border border-white/10 text-xs">{t.duration}</span>
                  </div>
                  <p className="text-text-secondary text-sm font-inter italic leading-relaxed">"{t.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: 'Avg 12kg', label: 'Lost in 3 months' },
              { value: '87%', label: 'Achieve their goals' },
              { value: '4.9/5', label: 'Member satisfaction' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-8 text-center neon-border"
              >
                <div className="font-oswald text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-text-secondary font-inter text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7 — PRICING
      ═══════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Invest In Yourself"
            title="MEMBERSHIP PLANS"
            description="Choose the plan that matches your ambition. Every membership starts with a 7-day free trial."
          />

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`font-oswald text-sm tracking-widest uppercase ${!annual ? 'text-white' : 'text-text-secondary'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${annual ? 'bg-gradient-primary' : 'bg-card border border-white/20'}`}
              aria-label="Toggle annual billing"
            >
              <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300 ${annual ? 'left-7' : 'left-0.5'}`} />
            </button>
            <span className={`font-oswald text-sm tracking-widest uppercase ${annual ? 'text-white' : 'text-text-secondary'}`}>
              Annual
              {annual && <span className="ml-2 text-success text-xs">(Save 20%)</span>}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {pricingPlans.map((plan, i) => (
              <PricingCard key={plan.name} plan={plan} highlighted={i === 1} annual={annual} index={i} />
            ))}
          </div>

          <p className="text-center text-text-secondary text-sm font-inter mt-8 flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-success" />
            All plans include a 7-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8 — GALLERY
      ═══════════════════════════════════════════════════════════ */}
      <section id="gallery" className="py-24 md:py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="See It To Believe It"
            title="WORLD-CLASS FACILITIES"
            description="Every inch of TITAN FITNESS is engineered for elite performance, recovery, and results."
          />
          <GalleryGrid />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 9 — TESTIMONIALS
      ═══════════════════════════════════════════════════════════ */}
      <section id="testimonials" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,69,0,0.08)_0%,_transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="50,000+ Members Can't Be Wrong"
            title="WHAT THEY SAY"
            description="Real words from real members who chose to forge their legacy at TITAN FITNESS."
          />
          <TestimonialCarousel />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 10 — BMI CALCULATOR
      ═══════════════════════════════════════════════════════════ */}
      <section id="bmi" className="py-24 md:py-32 bg-dark relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Know Your Numbers"
            title="CALCULATE YOUR BMI"
            description="Get instant insights into your body composition and receive personalized program recommendations."
          />
          <BMICalculator />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 11 — BLOG
      ═══════════════════════════════════════════════════════════ */}
      <section id="blog" className="py-24 md:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Knowledge Is Power"
            title="LATEST FITNESS TIPS"
            description="Expert advice on workouts, nutrition, and mindset — straight from TITAN's elite coaching team."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group bg-card rounded-2xl overflow-hidden neon-border hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className={`absolute top-4 left-4 badge ${post.categoryColor}`}>{post.category}</span>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="font-oswald text-lg font-bold uppercase mb-3 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary text-sm font-inter leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image src={post.authorImg} alt={post.author} fill className="object-cover" sizes="32px" />
                      </div>
                      <div>
                        <p className="text-xs font-inter font-semibold text-white">{post.author}</p>
                        <p className="text-xs font-inter text-text-secondary">{post.date}</p>
                      </div>
                    </div>
                    <span className="text-xs text-text-secondary font-inter">{post.readTime}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-oswald tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    Read More <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 12 — CTA / FREE TRIAL SIGNUP
      ═══════════════════════════════════════════════════════════ */}
      <section id="trial" className="relative py-24 md:py-32 clip-diagonal-both overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-10" />

        {/* Floating shapes */}
        {[Dumbbell, Flame, Trophy, Shield].map((Icon, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              top: `${20 + i * 20}%`,
              left: i % 2 === 0 ? `${5 + i * 5}%` : `${75 + i * 5}%`,
              animation: `float ${6 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          >
            <Icon className="w-16 h-16 text-white" />
          </div>
        ))}

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-oswald text-4xl md:text-6xl font-bold uppercase leading-tight mb-4">
              YOUR TRANSFORMATION<br />STARTS TODAY
            </h2>
            <p className="font-inter text-lg text-white/80 mb-10">
              Join TITAN FITNESS and get your first <strong>7 days completely FREE</strong>. No commitments. No credit card. Just results.
            </p>

            <form onSubmit={handleSubmit(onTrialSubmit)} className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-4 bg-dark/40 border border-white/20 rounded-lg text-white placeholder-white/40 font-inter focus:outline-none focus:border-white/60 backdrop-blur"
                  {...register('name')}
                />
                {errors.name && <p className="text-white/70 text-xs mt-1 text-left">{errors.name.message}</p>}
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-4 bg-dark/40 border border-white/20 rounded-lg text-white placeholder-white/40 font-inter focus:outline-none focus:border-white/60 backdrop-blur"
                  {...register('email')}
                />
                {errors.email && <p className="text-white/70 text-xs mt-1 text-left">{errors.email.message}</p>}
              </div>
              <div className="flex-1">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-4 bg-dark/40 border border-white/20 rounded-lg text-white placeholder-white/40 font-inter focus:outline-none focus:border-white/60 backdrop-blur"
                  {...register('phone')}
                />
                {errors.phone && <p className="text-white/70 text-xs mt-1 text-left">{errors.phone.message}</p>}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-dark text-white font-oswald tracking-[3px] uppercase text-sm py-4 px-8 rounded-lg flex items-center gap-2 hover:bg-dark/80 transition-colors flex-shrink-0 whitespace-nowrap"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {submitting ? 'Sending...' : 'Claim Free Trial'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 13 — INSTAGRAM FEED
      ═══════════════════════════════════════════════════════════ */}
      <section id="instagram" className="py-24 md:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="@titanfitness"
            title="FOLLOW THE MOVEMENT"
            description="Join 2.4 million athletes sharing their TITAN journey every single day."
          />
          <InstagramFeed />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 14 — BRAND PARTNERS
      ═══════════════════════════════════════════════════════════ */}
      <section id="partners" className="py-16 bg-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <span className="font-oswald text-xs tracking-[6px] uppercase text-text-secondary">Trusted Partners & Sponsors</span>
        </div>
        <BrandCarousel />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 15 — LOCATION / CONTACT
      ═══════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 md:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Visit Us"
            title="FIND US"
            description="Walk through our doors and experience the TITAN difference in person. We'd love to show you around."
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 glass rounded-2xl p-8 flex flex-col gap-8"
            >
              <div>
                <h3 className="font-oswald text-2xl uppercase mb-6 text-gradient">Contact Info</h3>
                <div className="flex flex-col gap-5">
                  {[
                    { icon: MapPin, label: 'Address', value: '450 Titan Boulevard\nNew York, NY 10001' },
                    { icon: Phone, label: 'Phone', value: '+1 (800) TITAN-FIT' },
                    { icon: Mail, label: 'Email', value: 'hello@titanfitness.com' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-oswald text-xs tracking-[3px] uppercase text-text-secondary mb-1">{label}</p>
                        <p className="font-inter text-sm text-white whitespace-pre-line">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h4 className="font-oswald text-sm tracking-[3px] uppercase">Opening Hours</h4>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { day: 'Mon — Fri', hours: '5:00 AM – 11:00 PM' },
                    { day: 'Saturday', hours: '6:00 AM – 10:00 PM' },
                    { day: 'Sunday', hours: '7:00 AM – 9:00 PM' },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="font-inter text-sm text-text-secondary">{day}</span>
                      <span className="font-inter text-sm text-white">{hours}</span>
                    </div>
                  ))}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-success text-xs font-inter">Elite members: 24/7 access</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 rounded-2xl overflow-hidden border border-white/10 min-h-[400px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-73.98823938459391!3d40.74844097932879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px', filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TITAN FITNESS Location"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
