import React from 'react'
import { motion } from 'framer-motion'

export default function CruzDecorative() {
  const cruzes = [
    // Hero Section
    { id: 1, top: '10%', left: '5%', size: 120, opacity: 0.1, delay: 0, rotate: 15 },
    { id: 2, top: '15%', right: '8%', size: 80, opacity: 0.08, delay: 0.3, rotate: -25 },
    
    // About Section
    { id: 3, top: '35%', left: '3%', size: 100, opacity: 0.07, delay: 0.6, rotate: 45 },
    { id: 4, top: '40%', right: '2%', size: 60, opacity: 0.09, delay: 0.4, rotate: -15 },
    
    // Discography Section
    { id: 5, top: '55%', left: '8%', size: 90, opacity: 0.08, delay: 0.8, rotate: 30 },
    { id: 6, top: '58%', right: '5%', size: 110, opacity: 0.07, delay: 0.5, rotate: -35 },
    
    // Legacy/History Section
    { id: 7, top: '70%', left: '2%', size: 140, opacity: 0.09, delay: 1, rotate: 20 },
    { id: 8, top: '75%', right: '3%', size: 85, opacity: 0.08, delay: 0.7, rotate: -40 },
    
    // Gallery/Shows
    { id: 9, top: '85%', left: '6%', size: 95, opacity: 0.07, delay: 0.9, rotate: -20 },
    { id: 10, top: '88%', right: '7%', size: 70, opacity: 0.08, delay: 0.6, rotate: 35 },
    
    // Videos/Footer
    { id: 11, top: '92%', left: '4%', size: 75, opacity: 0.09, delay: 1.1, rotate: -30 },
    { id: 12, top: '96%', right: '4%', size: 120, opacity: 0.07, delay: 0.8, rotate: 25 },
  ]

  return (
    <>
      {cruzes.map(cruz => (
        <motion.div
          key={cruz.id}
          className="hidden md:block fixed pointer-events-none"
          style={{
            top: cruz.top,
            [cruz.left !== undefined ? 'left' : 'right']: cruz.left !== undefined ? cruz.left : cruz.right,
            width: cruz.size,
            height: cruz.size,
            opacity: cruz.opacity,
            zIndex: 0,
          }}
          initial={{ rotate: cruz.rotate - 5, opacity: 0 }}
          animate={{ 
            rotate: cruz.rotate,
            opacity: cruz.opacity,
          }}
          transition={{
            delay: cruz.delay,
            duration: 1.5,
            ease: 'easeOut'
          }}
        >
          <motion.img
            src="/assets/CRUZ.png"
            alt="Decorative cross"
            className="w-full h-full object-contain"
            animate={{
              y: [0, 15, 0],
              rotate: [cruz.rotate, cruz.rotate + 3, cruz.rotate],
            }}
            transition={{
              delay: cruz.delay,
              duration: 6 + cruz.id * 0.3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      ))}
    </>
  )
}
