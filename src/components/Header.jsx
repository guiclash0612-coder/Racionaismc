import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Header(){
  const ref = useRef()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navLinksRef = useRef([])

  useEffect(() => {
    const el = ref.current
    function onScroll(){
      const y = window.scrollY || (window.lenis?.scroll) || 0
      const scrolled = y > 40
      const shrink = y > 120
      if(scrolled) el.classList.add('scrolled')
      else el.classList.remove('scrolled')
      if(shrink) el.classList.add('shrink')
      else el.classList.remove('shrink')
    }

    window.addEventListener('scroll', onScroll)
    if(window.lenis && typeof window.lenis.on === 'function') {
      window.lenis.on('scroll', onScroll)
    }
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if(window.lenis && typeof window.lenis.off === 'function') {
        window.lenis.off('scroll', onScroll)
      }
    }
  }, [])

  useEffect(() => {
    // Animação de entrada dos links do menu
    if(navLinksRef.current.length > 0) {
      gsap.fromTo(navLinksRef.current,
        { opacity: 0, y: -10 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power2.out'
        }
      )
    }
  }, [])

  const handleNav = (e) => {
    const a = e.target.closest('a')
    if(!a || !a.hash) return
    e.preventDefault()
    const id = a.hash.replace('#','')
    const target = document.getElementById(id)
    if(target){
      setMobileMenuOpen(false)
      if(window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(target, { 
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const navItems = [
    { href: '#hero', label: 'Início' },
    { href: '#about', label: 'História' },
    { href: '#discography', label: 'Discografia' },
    { href: '#videos', label: 'Vídeos' },
    { href: '#gallery', label: 'Galeria' },
    { href: '#legacy', label: 'Impacto' },
    { href: '#contact', label: 'Contato' }
  ]

  return (
    <header 
      ref={ref} 
      className="site-header fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-transparent"
    >
      <nav onClick={handleNav} className="container flex items-center justify-between py-4 md:py-5">
        <a 
          href="#hero" 
          className="text-xl md:text-2xl font-heading text-red hover:text-red-light transition-all duration-200 hover:scale-105"
          aria-label="Voltar ao início"
        >
          Racionais MC's
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, idx) => (
            <a 
              key={item.href}
              ref={el => navLinksRef.current[idx] = el}
              href={item.href}
              className="text-sm font-medium text-white/80 hover:text-red transition-all duration-200 relative group uppercase tracking-wider"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-red hover:text-red-light transition-colors"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container py-4 space-y-4 glass-strong rounded-lg mx-4 mb-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-sm font-medium text-white/80 hover:text-red transition-colors py-2 uppercase tracking-wider"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
