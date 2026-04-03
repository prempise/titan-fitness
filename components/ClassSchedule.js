'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, User, Download } from 'lucide-react'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const scheduleData = {
  Mon: [
    { time: '6:00 AM - 7:00 AM', class: 'Strength Training', trainer: 'Marcus Steel', intensity: 'high', spots: 8 },
    { time: '8:00 AM - 9:00 AM', class: 'Yoga & Flexibility', trainer: 'Priya Sharma', intensity: 'low', spots: 15 },
    { time: '10:00 AM - 11:00 AM', class: 'HIIT Cardio', trainer: 'Jake Torres', intensity: 'high', spots: 12 },
    { time: '12:00 PM - 1:00 PM', class: 'CrossFit WOD', trainer: 'Alex Rivera', intensity: 'extreme', spots: 6 },
    { time: '5:00 PM - 6:00 PM', class: 'Boxing & MMA', trainer: 'Devon Clark', intensity: 'high', spots: 10 },
    { time: '7:00 PM - 8:00 PM', class: 'Yoga & Flexibility', trainer: 'Priya Sharma', intensity: 'low', spots: 20 },
  ],
  Tue: [
    { time: '6:00 AM - 7:00 AM', class: 'HIIT Cardio', trainer: 'Jake Torres', intensity: 'high', spots: 10 },
    { time: '9:00 AM - 10:00 AM', class: 'Swimming', trainer: 'Nina Waves', intensity: 'medium', spots: 8 },
    { time: '11:00 AM - 12:00 PM', class: 'Strength Training', trainer: 'Marcus Steel', intensity: 'high', spots: 14 },
    { time: '4:00 PM - 5:00 PM', class: 'CrossFit WOD', trainer: 'Alex Rivera', intensity: 'extreme', spots: 5 },
    { time: '6:00 PM - 7:00 PM', class: 'Boxing & MMA', trainer: 'Devon Clark', intensity: 'high', spots: 12 },
  ],
  Wed: [
    { time: '6:00 AM - 7:00 AM', class: 'Yoga & Flexibility', trainer: 'Priya Sharma', intensity: 'low', spots: 18 },
    { time: '8:00 AM - 9:00 AM', class: 'Strength Training', trainer: 'Marcus Steel', intensity: 'high', spots: 9 },
    { time: '10:00 AM - 11:00 AM', class: 'Swimming', trainer: 'Nina Waves', intensity: 'medium', spots: 10 },
    { time: '5:00 PM - 6:00 PM', class: 'HIIT Cardio', trainer: 'Jake Torres', intensity: 'high', spots: 7 },
    { time: '7:00 PM - 8:00 PM', class: 'CrossFit WOD', trainer: 'Alex Rivera', intensity: 'extreme', spots: 4 },
  ],
  Thu: [
    { time: '6:00 AM - 7:00 AM', class: 'CrossFit WOD', trainer: 'Alex Rivera', intensity: 'extreme', spots: 8 },
    { time: '9:00 AM - 10:00 AM', class: 'Yoga & Flexibility', trainer: 'Priya Sharma', intensity: 'low', spots: 20 },
    { time: '11:00 AM - 12:00 PM', class: 'Boxing & MMA', trainer: 'Devon Clark', intensity: 'high', spots: 11 },
    { time: '4:00 PM - 5:00 PM', class: 'Strength Training', trainer: 'Marcus Steel', intensity: 'high', spots: 13 },
    { time: '7:00 PM - 8:00 PM', class: 'HIIT Cardio', trainer: 'Jake Torres', intensity: 'high', spots: 9 },
  ],
  Fri: [
    { time: '6:00 AM - 7:00 AM', class: 'Swimming', trainer: 'Nina Waves', intensity: 'medium', spots: 12 },
    { time: '8:00 AM - 9:00 AM', class: 'CrossFit WOD', trainer: 'Alex Rivera', intensity: 'extreme', spots: 3 },
    { time: '10:00 AM - 11:00 AM', class: 'Boxing & MMA', trainer: 'Devon Clark', intensity: 'high', spots: 8 },
    { time: '5:00 PM - 6:00 PM', class: 'Yoga & Flexibility', trainer: 'Priya Sharma', intensity: 'low', spots: 22 },
    { time: '7:00 PM - 8:00 PM', class: 'Strength Training', trainer: 'Marcus Steel', intensity: 'high', spots: 10 },
  ],
  Sat: [
    { time: '8:00 AM - 9:00 AM', class: 'HIIT Cardio', trainer: 'Jake Torres', intensity: 'high', spots: 15 },
    { time: '10:00 AM - 11:00 AM', class: 'CrossFit WOD', trainer: 'Alex Rivera', intensity: 'extreme', spots: 7 },
    { time: '12:00 PM - 1:00 PM', class: 'Yoga & Flexibility', trainer: 'Priya Sharma', intensity: 'low', spots: 18 },
    { time: '3:00 PM - 4:00 PM', class: 'Boxing & MMA', trainer: 'Devon Clark', intensity: 'high', spots: 9 },
    { time: '5:00 PM - 6:00 PM', class: 'Swimming', trainer: 'Nina Waves', intensity: 'medium', spots: 11 },
  ],
  Sun: [
    { time: '9:00 AM - 10:00 AM', class: 'Yoga & Flexibility', trainer: 'Priya Sharma', intensity: 'low', spots: 25 },
    { time: '11:00 AM - 12:00 PM', class: 'Strength Training', trainer: 'Marcus Steel', intensity: 'high', spots: 16 },
    { time: '2:00 PM - 3:00 PM', class: 'HIIT Cardio', trainer: 'Jake Torres', intensity: 'high', spots: 14 },
    { time: '5:00 PM - 6:00 PM', class: 'Swimming', trainer: 'Nina Waves', intensity: 'medium', spots: 10 },
  ],
}

const intensityConfig = {
  low: { label: 'Low', color: '#00FF88' },
  medium: { label: 'Medium', color: '#FFD700' },
  high: { label: 'High', color: '#FF4500' },
  extreme: { label: 'Extreme', color: '#E94560' },
}

export default function ClassSchedule() {
  const [activeDay, setActiveDay] = useState('Mon')

  return (
    <div className="w-full">
      {/* Day Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`flex-shrink-0 font-oswald text-sm tracking-[3px] uppercase px-6 py-3 rounded-lg transition-all duration-300 ${
              activeDay === day
                ? 'bg-gradient-primary text-white shadow-lg shadow-primary/30'
                : 'bg-card text-text-secondary border border-white/10 hover:border-primary/40 hover:text-white'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Table */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-3"
        >
          {scheduleData[activeDay].map((slot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Time */}
              <div className="flex items-center gap-2 min-w-[180px]">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-text-secondary font-inter">{slot.time}</span>
              </div>

              {/* Class name */}
              <div className="flex-1">
                <span className="font-oswald text-base uppercase group-hover:text-primary transition-colors">{slot.class}</span>
              </div>

              {/* Trainer */}
              <div className="flex items-center gap-2 min-w-[160px]">
                <User className="w-4 h-4 text-text-secondary flex-shrink-0" />
                <span className="text-sm text-text-secondary font-inter">{slot.trainer}</span>
              </div>

              {/* Intensity */}
              <div className="flex items-center gap-2">
                <span
                  className="intensity-dot"
                  style={{ background: intensityConfig[slot.intensity].color }}
                />
                <span className="text-xs font-inter" style={{ color: intensityConfig[slot.intensity].color }}>
                  {intensityConfig[slot.intensity].label}
                </span>
              </div>

              {/* Spots */}
              <div className="min-w-[80px] text-right">
                <span className={`text-xs font-inter ${slot.spots <= 5 ? 'text-accent' : 'text-text-secondary'}`}>
                  {slot.spots} spots left
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Download button */}
      <div className="mt-8 flex justify-center">
        <button className="flex items-center gap-2 btn-outline py-3 px-8">
          <Download className="w-4 h-4" />
          Download Full Schedule
        </button>
      </div>
    </div>
  )
}
