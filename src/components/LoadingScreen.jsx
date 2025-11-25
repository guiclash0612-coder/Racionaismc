import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const loaderRef = useRef(null)
  const progressRef = useRef(null)
  const textRef = useRef(null)
  const percentageRef = useRef(null)

  useEffect(() => {
    // Simular carregamento
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Animações GSAP
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
      )
    }

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: 'power1.out'
      })
    }
    if (percentageRef.current) {
      gsap.to(percentageRef.current, {
        textContent: Math.round(progress),
        duration: 0.3,
        snap: { textContent: 1 },
        ease: 'power1.out'
      })
    }
  }, [progress])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          scale: 1.1,
          duration: 0.8,
          ease: 'power2.in',
          onComplete: () => {
            if (onComplete) onComplete()
          }
        })
      }, 500)
    }
  }, [progress, onComplete])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center grain-bg"
    >
      <div className="text-center">
        <h1
          ref={textRef}
          className="text-5xl md:text-7xl font-heading text-red mb-8"
        >
          Racionais MC's
        </h1>
        <div className="w-64 h-1 bg-red/10 rounded-full overflow-hidden mx-auto mt-8 relative">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-red via-red-light to-red rounded-full relative"
            style={{ width: '0%' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
        <div className="mt-4 text-red/60 text-sm">
          <span ref={percentageRef}>0</span>%
        </div>
      </div>
    </div>
  )
}

