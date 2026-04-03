'use client'

import { motion } from 'framer-motion'
import { Heart, Instagram } from 'lucide-react'
import Image from 'next/image'

const posts = [
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', likes: '2.4K' },
  { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop', likes: '1.8K' },
  { src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&h=400&fit=crop', likes: '3.1K' },
  { src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop', likes: '2.7K' },
  { src: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=400&fit=crop', likes: '4.2K' },
  { src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=400&fit=crop', likes: '1.5K' },
]

export default function InstagramFeed() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-10">
        {posts.map((post, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative group overflow-hidden rounded-xl cursor-pointer aspect-square"
          >
            <Image
              src={post.src}
              alt={`Instagram post ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart className="w-8 h-8 mx-auto mb-1" fill="white" />
                <span className="font-oswald text-lg font-bold">{post.likes}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline flex items-center gap-3 py-3 px-8 hover:bg-gradient-primary hover:border-transparent hover:text-white transition-all duration-300"
        >
          <Instagram className="w-5 h-5" />
          Follow on Instagram
        </a>
      </div>
    </div>
  )
}
