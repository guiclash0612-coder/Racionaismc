import React, { lazy, Suspense, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import Mascot from './components/Mascot'
import RedCrossesBackground from './components/RedCrossesBackground'

const About = lazy(() => import('./components/About'))
const Discography = lazy(() => import('./components/Discography'))
const Videos = lazy(() => import('./components/Videos'))
const Gallery = lazy(() => import('./components/Gallery'))
const Legacy = lazy(() => import('./components/Legacy'))
const Shows = lazy(() => import('./components/Shows'))
const Contact = lazy(() => import('./components/Contact'))

gsap.registerPlugin(ScrollTrigger)

export default function App(){
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Garantir que o body tenha altura suficiente e scroll funcional
    document.body.style.height = 'auto'
    document.documentElement.style.height = 'auto'
    document.documentElement.style.scrollBehavior = 'smooth'

    // Initialize Lenis com configurações otimizadas para scroll funcional
    const lenis = new Lenis({ 
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      gestureDirection: 'vertical',
      smoothTouch: false
    })

    let rafId
    function raf(time){
      lenis.raf(time)
      ScrollTrigger.update()
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    window.lenis = lenis

    // Lightweight progress bar
    function updateProgress(){
      const scrollTop = lenis.scroll || window.scrollY || 0
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const pct = height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0
      const el = document.getElementById('progress-bar')
      if(el) {
        el.style.width = `${pct}%`
      }
    }

    if(typeof lenis.on === 'function') {
      lenis.on('scroll', updateProgress)
    }
    updateProgress()

    // Permitir scroll nativo se Lenis falhar
    window.addEventListener('wheel', () => {}, { passive: true })

    // Reveal animations com Intersection Observer (CSS-based, mais leve)
    const reveals = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('show')
        }
      })
    }, { threshold: 0.1 })
    
    reveals.forEach(el => revealObserver.observe(el))

    // Light parallax - only on hero
    const parallaxEls = gsap.utils.toArray('[data-speed]')
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-speed') || '0.15')
      gsap.to(el, {
        y: () => `-${window.innerHeight * speed}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      })
    })

    // Magnetic hover - optimized
    const setupMagnetic = () => {
      const magneticButtons = document.querySelectorAll('[data-magnetic]')
      magneticButtons.forEach(btn => {
        const handleMouseMove = (e) => {
          const rect = btn.getBoundingClientRect()
          const x = (e.clientX - rect.left - rect.width / 2) * 0.15
          const y = (e.clientY - rect.top - rect.height / 2) * 0.15
          
          gsap.to(btn, {
            x: x,
            y: y,
            duration: 0.3,
            ease: 'power1.out'
          })
        }

        const handleMouseLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power1.out'
          })
        }

        btn.addEventListener('mousemove', handleMouseMove)
        btn.addEventListener('mouseleave', handleMouseLeave)
      })
    }

    // Setup magnetic after a short delay to ensure DOM is ready
    setTimeout(setupMagnetic, 100)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.lenis = null
      if(typeof lenis.off === 'function') lenis.off('scroll', updateProgress)
      document.body.style.height = ''
      document.documentElement.style.height = ''
      document.documentElement.style.scrollBehavior = ''
      reveals.forEach(el => revealObserver.unobserve(el))
      if(lenis) lenis.destroy()
    }
  }, [])

  const handleLoadingComplete = () => {
    setLoading(false)
    // Animate main content in
    gsap.fromTo('main',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    )
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>
      
      <a href="#main" className="skip-link">Pular para conteúdo</a>
      <RedCrossesBackground />
      <CustomCursor />
      <Mascot />
      <div id="progress-bar" aria-hidden="true"></div>
      <Header />
      <main id="main" className={loading ? 'opacity-0' : ''}>
        <Hero />
        <Suspense fallback={
          <div className="w-full h-screen flex items-center justify-center grain-bg">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-red/30 border-t-red rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-red/60">Carregando...</p>
            </div>
          </div>
        }>
          <About />
          <Discography />
          <Videos />
          <Gallery />
          <Legacy />
          <Shows />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
