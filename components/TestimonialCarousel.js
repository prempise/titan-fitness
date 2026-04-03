'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const testimonials = [
  {
    text: "TITAN FITNESS completely changed my life. I lost 18kg in just 4 months with the guidance of their incredible trainers. The facilities are world-class and the community keeps you motivated every single day.",
    name: "Michael Chen",
    membership: "Elite Member",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
  {
    text: "I've been to dozens of gyms across three cities, and nothing compares to TITAN. The equipment, the trainers, and the atmosphere are in a league of their own. This place genuinely pushes you beyond your limits.",
    name: "Sarah Williams",
    membership: "Premium Member",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
  {
    text: "The CrossFit program here is absolutely insane — in the best way possible. Alex Rivera is the most dedicated coach I've ever worked with. Three months in and I've completely transformed my body and mindset.",
    name: "James Rodriguez",
    membership: "Premium Member",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
  {
    text: "As a busy professional, I love that TITAN is open 24/7 with Elite membership. I can squeeze in a session at 5 AM before work or 11 PM after a late night. The flexibility and quality are unmatched.",
    name: "Anika Patel",
    membership: "Elite Member",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
  {
    text: "The swimming pool and spa facilities are absolutely stunning. I come here for both intense workouts and recovery — it's truly an all-in-one destination. Worth every penny of my Elite membership.",
    name: "David Kim",
    membership: "Elite Member",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
]

export default function TestimonialCarousel() {
  const swiperRef = useRef(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    const initSwiper = async () => {
      const { Swiper } = await import('swiper')
      const { Autoplay, Navigation, Pagination } = await import('swiper/modules')

      if (swiperRef.current && !swiperRef.current.swiper) {
        new Swiper(swiperRef.current, {
          modules: [Autoplay, Navigation, Pagination],
          slidesPerView: 1,
          spaceBetween: 24,
          loop: true,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          },
        })
      }
    }

    if (inView) initSwiper()
  }, [inView])

  return (
    <div ref={ref} className="w-full">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
      <div ref={swiperRef} className="swiper">
        <div className="swiper-wrapper pb-12">
          {testimonials.map((t, i) => (
            <div key={i} className="swiper-slide">
              <div className="glass rounded-xl p-8 h-full flex flex-col neon-border hover:border-primary/40 transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold" fill="#FFD700" />
                  ))}
                </div>

                {/* Quote icon */}
                <Quote className="w-10 h-10 text-primary/30 mb-4" />

                {/* Text */}
                <p className="text-text-secondary font-inter text-sm leading-relaxed flex-1 italic mb-6">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                    <Image src={t.image} alt={t.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <div className="font-oswald text-sm font-bold uppercase">{t.name}</div>
                    <div className="text-primary text-xs font-inter">{t.membership}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination" />
        <div className="swiper-button-prev !text-primary" />
        <div className="swiper-button-next !text-primary" />
      </div>
    </div>
  )
}
