'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, AlertCircle } from 'lucide-react'
import CountUp from 'react-countup'
import toast from 'react-hot-toast'

const schema = z.object({
  height: z.number({ invalid_type_error: 'Enter a valid height' }).min(50, 'Min 50cm').max(300, 'Max 300cm'),
  weight: z.number({ invalid_type_error: 'Enter a valid weight' }).min(20, 'Min 20kg').max(500, 'Max 500kg'),
  age: z.number({ invalid_type_error: 'Enter a valid age' }).min(10, 'Min age 10').max(120, 'Max age 120'),
})

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { label: 'Underweight', color: '#00FF88', recommendation: 'Focus on strength training and a calorie surplus diet to build healthy mass.', position: 5 }
  if (bmi < 25) return { label: 'Normal Weight', color: '#FFD700', recommendation: 'Great work! Maintain with balanced workouts and a healthy diet. Keep up the excellent lifestyle.', position: 30 }
  if (bmi < 30) return { label: 'Overweight', color: '#FF4500', recommendation: 'Try HIIT cardio and strength training combined with a slight calorie deficit diet.', position: 65 }
  return { label: 'Obese', color: '#E94560', recommendation: 'Start with low-impact cardio like swimming and consult our nutrition team for a personalized plan.', position: 90 }
}

export default function BMICalculator() {
  const [result, setResult] = useState(null)
  const [gender, setGender] = useState('male')
  const [calculating, setCalculating] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    setCalculating(true)
    await new Promise(r => setTimeout(r, 800))
    const bmi = (data.weight / ((data.height / 100) ** 2)).toFixed(1)
    setResult({ bmi: parseFloat(bmi), ...getBMICategory(parseFloat(bmi)) })
    setCalculating(false)
    toast.success(`Your BMI is ${bmi} — ${getBMICategory(parseFloat(bmi)).label}`, { icon: '💪' })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Form */}
      <div>
        {/* Gender */}
        <div className="flex gap-4 mb-6">
          {['male', 'female'].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGender(g)}
              className={`flex-1 py-3 font-oswald tracking-[3px] uppercase text-sm rounded-lg border transition-all duration-300 ${
                gender === g
                  ? 'bg-gradient-primary border-transparent text-white'
                  : 'bg-transparent border-white/10 text-text-secondary hover:border-primary/50'
              }`}
            >
              {g === 'male' ? '♂ Male' : '♀ Female'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Height */}
          <div>
            <label className="font-oswald text-xs tracking-[3px] uppercase text-text-secondary mb-2 block">
              Height (cm)
            </label>
            <input
              type="number"
              placeholder="175"
              className="form-input"
              {...register('height', { valueAsNumber: true })}
            />
            {errors.height && (
              <p className="text-accent text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.height.message}
              </p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label className="font-oswald text-xs tracking-[3px] uppercase text-text-secondary mb-2 block">
              Weight (kg)
            </label>
            <input
              type="number"
              placeholder="75"
              className="form-input"
              {...register('weight', { valueAsNumber: true })}
            />
            {errors.weight && (
              <p className="text-accent text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.weight.message}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="font-oswald text-xs tracking-[3px] uppercase text-text-secondary mb-2 block">
              Age
            </label>
            <input
              type="number"
              placeholder="25"
              className="form-input"
              {...register('age', { valueAsNumber: true })}
            />
            {errors.age && (
              <p className="text-accent text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.age.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={calculating}
            className="btn-primary flex items-center justify-center gap-3 py-4 mt-2"
          >
            {calculating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Calculator className="w-5 h-5" />
                Calculate BMI
              </>
            )}
          </button>
        </form>
      </div>

      {/* Result */}
      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="glass rounded-2xl p-8 text-center"
          >
            <p className="font-oswald text-sm tracking-[4px] uppercase text-text-secondary mb-4">Your BMI Score</p>
            <div className="font-oswald text-8xl font-bold mb-2" style={{ color: result.color }}>
              <CountUp end={result.bmi} decimals={1} duration={1.5} />
            </div>
            <div
              className="font-oswald text-xl tracking-widest uppercase mb-6"
              style={{ color: result.color }}
            >
              {result.label}
            </div>

            {/* Gauge */}
            <div className="relative mb-8">
              <div className="bmi-gauge mb-2" />
              <div
                className="absolute top-0 w-4 h-4 rounded-full bg-white shadow-lg -mt-1 transition-all duration-700"
                style={{ left: `calc(${result.position}% - 8px)`, boxShadow: `0 0 10px ${result.color}` }}
              />
              <div className="flex justify-between text-xs text-text-secondary font-inter mt-4">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>

            <div className="glass-dark rounded-xl p-4">
              <p className="text-sm text-text-secondary font-inter leading-relaxed">
                💡 <strong className="text-white">Recommendation:</strong> {result.recommendation}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-4"
            style={{ minHeight: '350px' }}
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Calculator className="w-10 h-10 text-primary" />
            </div>
            <p className="font-oswald text-xl uppercase text-text-secondary">Enter your details to see your BMI result</p>
            <p className="text-text-secondary text-sm font-inter">Get personalized recommendations based on your score</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
