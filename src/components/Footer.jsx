import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer(){
  const footerRef = useRef(null)

  useEffect(() => {
    if(footerRef.current) {
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, [])

  const scrollToTop = () => {
    if(window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.5 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer 
      ref={footerRef}
      className="py-12 md:py-16 border-t border-red/10 bg-black/50 relative grain-bg"
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-white/80 mb-2">
              © 2025 Racionais MC's — Todos os direitos reservados.
            </div>
            <div className="text-white/50 text-sm">
              Legado que inspira gerações.
            </div>
          </div>
          
          <button
            onClick={scrollToTop}
            className="btn-ghost flex items-center gap-2 group"
            aria-label="Voltar ao topo"
          >
            <span>Voltar ao topo</span>
            <svg 
              className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>

        {/* Linha decorativa */}
        <div className="mt-8 pt-8 border-t border-red/5">
          <div className="text-center text-white/40 text-xs">
            Feito com respeito ao legado do rap brasileiro
          </div>
        </div>
      </div>
    </footer>
  )
}
