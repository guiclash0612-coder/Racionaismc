import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AlbumModal from './AlbumModal'
import assets from '../utils/assets'

gsap.registerPlugin(ScrollTrigger)

export default function Discography(){
  const [open, setOpen] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const carouselRef = useRef(null)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do título
      if(titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        )
      }

      // Animação de entrada dos cards no carrossel
      if(carouselRef.current) {
        const cards = carouselRef.current.querySelectorAll('.discography-card')
        cards.forEach((card, idx) => {
          gsap.fromTo(card,
            { opacity: 0, x: 50, scale: 0.9 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
              delay: idx * 0.15,
              scrollTrigger: {
                trigger: card,
                start: 'left 90%',
                toggleActions: 'play none none none',
                once: true
              }
            }
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Drag and scroll para o carrossel
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const handleMouseDown = (e) => {
      setIsDragging(true)
      startXRef.current = e.pageX - carousel.offsetLeft
      scrollLeftRef.current = carousel.scrollLeft
      carousel.style.cursor = 'grabbing'
      carousel.style.userSelect = 'none'
    }

    const handleMouseLeave = () => {
      setIsDragging(false)
      carousel.style.cursor = 'grab'
      carousel.style.userSelect = ''
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      carousel.style.cursor = 'grab'
      carousel.style.userSelect = ''
    }

    const handleMouseMove = (e) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - carousel.offsetLeft
      const walk = (x - startXRef.current) * 2
      carousel.scrollLeft = scrollLeftRef.current - walk
    }

    // Touch events para mobile
    let touchStart = 0
    let scrollLeftStart = 0

    const handleTouchStart = (e) => {
      touchStart = e.touches[0].pageX - carousel.offsetLeft
      scrollLeftStart = carousel.scrollLeft
    }

    const handleTouchMove = (e) => {
      if (!touchStart) return
      const x = e.touches[0].pageX - carousel.offsetLeft
      const walk = (x - touchStart) * 2
      carousel.scrollLeft = scrollLeftStart - walk
    }

    carousel.addEventListener('mousedown', handleMouseDown)
    carousel.addEventListener('mouseleave', handleMouseLeave)
    carousel.addEventListener('mouseup', handleMouseUp)
    carousel.addEventListener('mousemove', handleMouseMove)
    carousel.addEventListener('touchstart', handleTouchStart, { passive: true })
    carousel.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      carousel.removeEventListener('mousedown', handleMouseDown)
      carousel.removeEventListener('mouseleave', handleMouseLeave)
      carousel.removeEventListener('mouseup', handleMouseUp)
      carousel.removeEventListener('mousemove', handleMouseMove)
      carousel.removeEventListener('touchstart', handleTouchStart)
      carousel.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isDragging])

  // Smooth scroll com botões
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="discography" 
      ref={sectionRef}
      className="py-24 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Background decorativo sutil */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red/50 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-heading text-red mb-4 tracking-tight"
        >
          Discografia
        </h2>
        <p className="text-white-cream/60 text-lg mb-12 max-w-2xl">
          Álbuns que marcaram gerações e definiram o rap brasileiro.
        </p>

        {/* Carrossel Container */}
        <div className="relative mt-12">
          {/* Botões de navegação */}
          <button
            onClick={scrollLeft}
            className="discography-nav-btn discography-nav-left"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className="discography-nav-btn discography-nav-right"
            aria-label="Próximo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carrossel */}
          <div 
            ref={carouselRef}
            className="discography-carousel"
          >
            {assets.albums.map((album, idx) => (
              <motion.div
                key={album.src}
                className="discography-card group"
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="discography-card-inner">
                  <div className="relative overflow-hidden rounded-xl">
                    <img 
                      src={album.src} 
                      alt={album.title} 
                      loading="lazy" 
                      decoding="async"
                      className="w-full h-72 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                    {/* Borda vermelha sutil no hover */}
                    <div className="absolute inset-0 border border-red/0 group-hover:border-red/20 transition-all duration-400"></div>
                    {/* Brilho vermelho suave no hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <div className="absolute inset-0 bg-red/10 blur-xl"></div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col bg-[#0a0a0a]">
                    <h3 className="font-heading text-2xl text-white-cream mb-2 group-hover:text-red transition-colors duration-300">
                      {album.title}
                    </h3>
                    <p className="text-white-cream/60 text-sm mb-3">{album.year}</p>
                    <p className="text-white-cream/80 text-sm mb-6 line-clamp-2">{album.description}</p>
                    
                    <button 
                      onClick={() => setOpen(idx)} 
                      className="discography-btn"
                      data-magnetic
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {open !== null && (
        <AlbumModal 
          album={assets.albums[open]} 
          onClose={() => setOpen(null)} 
        />
      )}
    </section>
  )
}
