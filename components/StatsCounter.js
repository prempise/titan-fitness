'use client'

import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

export default function StatsCounter({ end, suffix = '', label, icon: Icon }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      {Icon && <Icon className="w-8 h-8 text-primary mb-2" />}
      <div className="font-oswald text-4xl md:text-5xl font-bold text-gradient leading-none">
        {inView ? (
          <CountUp end={end} duration={2.5} separator="," />
        ) : (
          '0'
        )}
        {suffix}
      </div>
      <div className="font-oswald text-sm tracking-[3px] text-text-secondary uppercase mt-2">{label}</div>
    </div>
  )
}
