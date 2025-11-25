import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Pequeno componente para as cruzes vermelhas decorativas
export function RedCrossesBackground() {
  // Array com posições (%) para as cruzes - pode ser personalizado
  const crosses = [
    { top: '10%', left: '8%', size: 18, rotate: 12 },
    { top: '23%', left: '80%', size: 22, rotate: -8 },
    { top: '45%', left: '20%', size: 15, rotate: 45 },
    { top: '12%', left: '50%', size: 20, rotate: -22 },
    { top: '60%', left: '65%', size: 25, rotate: 30 },
    { top: '78%', left: '34%', size: 16, rotate: -35 },
    { top: '85%', left: '88%', size: 14, rotate: 14 },
    { top: '70%', left: '12%', size: 17, rotate: 50 }
  ]
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 w-full h-full z-0"
      style={{ inset: 0 }}
    >
      {crosses.map((cross, i) => (
        <svg
          key={i}
          width={cross.size}
          height={cross.size}
          style={{
            position: 'absolute',
            top: cross.top,
            left: cross.left,
            transform: `rotate(${cross.rotate}deg)`,
            opacity: 0.28,
          }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <line
            x1="12"
            y1="3"
            x2="12"
            y2="21"
            stroke="#e32636" // vermelho vibrante
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            stroke="#e32636"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </div>
  )
}

gsap.registerPlugin(ScrollTrigger)

export default function Hero(){
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text avançado com máscara
      if(titleRef.current) {
        const text = titleRef.current.textContent
        titleRef.current.innerHTML = ''
        const words = text.split(' ')
        words.forEach((word, i) => {
          const wordSpan = document.createElement('span')
          wordSpan.className = 'inline-block mr-3 md:mr-4 split-word overflow-hidden'
          wordSpan.style.display = 'inline-block'
          word.split('').forEach((char, j) => {
            const charSpan = document.createElement('span')
            charSpan.className = 'inline-block split-char'
            charSpan.style.display = 'inline-block'
            charSpan.textContent = char === ' ' ? '\u00A0' : char
            wordSpan.appendChild(charSpan)
          })
          titleRef.current.appendChild(wordSpan)
        })

        const chars = titleRef.current.querySelectorAll('.split-char')
        gsap.fromTo(chars, 
          { 
            opacity: 0, 
            y: 40
          },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: {
              amount: 0.8,
              from: 'start'
            },
            delay: 0.3
          }
        )
      }

      // Animação do subtítulo com split por palavras
      if(subtitleRef.current) {
        const text = subtitleRef.current.textContent
        subtitleRef.current.innerHTML = ''
        const words = text.split(' ')
        words.forEach((word, i) => {
          const wordSpan = document.createElement('span')
          wordSpan.className = 'inline-block mr-2'
          wordSpan.textContent = word + (i < words.length - 1 ? ' ' : '')
          subtitleRef.current.appendChild(wordSpan)
        })

        const wordSpans = subtitleRef.current.querySelectorAll('span')
        gsap.fromTo(wordSpans,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
            delay: 1.2
          }
        )
      }

      // Animação do botão
      if(buttonRef.current) {
        gsap.fromTo(buttonRef.current,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 1.8
          }
        )
      }

      // Scroll indicator com animação suave
      if(scrollIndicatorRef.current) {
        gsap.fromTo(scrollIndicatorRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 3
          }
        )
        gsap.to(scrollIndicatorRef.current, {
          y: 12,
          duration: 2,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
          delay: 3.5
        })
      }

      // Parallax sutil no vídeo/fundo
      if(videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.08,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8
          }
        })
      }

      // Fade out suave do conteúdo ao scroll
      const content = heroRef.current?.querySelector('.hero-content')
      if(content) {
        gsap.to(content, {
          opacity: 0,
          y: -30,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5
          }
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleExplore = () => {
    const el = document.getElementById('about')
    if(window.lenis && el) {
      window.lenis.scrollTo(el, { 
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        offset: -80
      })
    } else {
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative w-full min-h-screen md:h-screen flex items-center justify-center overflow-x-hidden grain-bg"
    >
      {/* Imagem de fundo hero1.jpeg com parallax */}
      <img 
        ref={videoRef}
        src="/assets/hero1.jpeg" 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover brightness-[0.35] contrast-115 saturate-110"
        aria-hidden="true"
        data-speed="0.3"
        loading="eager"
      />

      {/* Fallback para vídeo (caso exista) */}
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover brightness-[0.35] contrast-115 saturate-110 hidden"
        poster="/assets/hero1.jpeg"
        data-speed="0.3"
      >
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay cinematográfico com brilho vermelho sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red/5 to-transparent opacity-30"></div>

      {/* Conteúdo principal */}
      <div className="hero-content z-10 text-center px-4 max-w-7xl mx-auto relative">
        <h1 
          ref={titleRef}
          aria-label="Racionais MC's" 
          className="hero-title text-[clamp(52px,11vw,160px)] md:text-[clamp(72px,14vw,200px)] font-heading leading-[0.85] text-red mb-8 relative tracking-tight"
        >
          Racionais MC's
        </h1>
        
        <p 
          ref={subtitleRef}
          className="mt-8 text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 max-w-4xl mx-auto font-light tracking-wider leading-relaxed"
        >
          O legado do rap nacional.
        </p>
        
        <motion.button 
          ref={buttonRef}
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.98 }}
          onClick={handleExplore} 
          className="btn-primary mt-12 relative overflow-hidden group"
          aria-label="Explorar conteúdo"
          data-magnetic
        >
          <span className="relative z-10">Explorar</span>
          <span className="absolute inset-0 bg-gradient-to-r from-red-light via-red to-red-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </motion.button>

        {/* Scroll indicator premium */}
        <div 
          ref={scrollIndicatorRef}
          className="mt-20 flex flex-col items-center justify-center gap-3 opacity-0" 
          aria-hidden="true"
        >
          <span className="text-white/50 text-xs uppercase tracking-[0.2em] font-medium">Rolar para explorar</span>
          <div className="w-6 h-12 border-2 border-red/40 rounded-full flex items-start justify-center p-2 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 bg-red rounded-full shadow-lg shadow-red/50"></div>
          </div>
        </div>
      </div>

      {/* Linha decorativa vermelha */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red/40 to-transparent"></div>
    </section>
  )
}
