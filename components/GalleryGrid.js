'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import Image from 'next/image'

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop', title: 'Main Gym Floor', cols: 2 },
  { src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=600&fit=crop', title: 'Olympic Pool', cols: 1 },
  { src: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&h=600&fit=crop', title: 'Boxing Ring', cols: 1 },
  { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop', title: 'Yoga Studio', cols: 1 },
  { src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=600&fit=crop', title: 'Premium Equipment', cols: 1 },
  { src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop', title: 'Personal Training', cols: 2 },
  { src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop', title: 'Free Weights Area', cols: 1 },
  { src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop', title: 'Outdoor Training', cols: 1 },
]

export default function GalleryGrid() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`relative overflow-hidden rounded-xl cursor-pointer group ${
              img.cols === 2 ? 'col-span-2' : 'col-span-1'
            }`}
            style={{ aspectRatio: img.cols === 2 ? '2/1' : '1/1' }}
            onClick={() => setSelected(img)}
          >
            <Image
              src={img.src}
              alt={img.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/60 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                <ZoomIn className="w-8 h-8 text-white mx-auto mb-2" />
                <span className="font-oswald text-sm tracking-widest uppercase text-white">{img.title}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative" style={{ aspectRatio: '16/9' }}>
                <Image src={selected.src} alt={selected.title} fill className="object-cover" sizes="90vw" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark to-transparent p-6">
                <h3 className="font-oswald text-xl uppercase text-white">{selected.title}</h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-dark/80 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
