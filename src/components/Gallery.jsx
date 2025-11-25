import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import assets from '../utils/assets'

export default function Gallery(){
  const [open, setOpen] = useState(null)
  const sectionRef = useRef(null)
  const imagesRef = useRef([])

  useEffect(() => {
    // Animação suave com Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if(entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('gallery-item-visible')
          }, idx * 50)
        }
      })
    }, { threshold: 0.1 })

    imagesRef.current.forEach(img => {
      if(img) observer.observe(img)
    })

    return () => {
      imagesRef.current.forEach(img => {
        if(img) observer.unobserve(img)
      })
    }
  }, [])

  useEffect(() => {
    function onKey(e){
      if(open === null) return
      if(e.key === 'Escape') setOpen(null)
      if(e.key === 'ArrowRight') setOpen((s) => (s === null ? 0 : Math.min(assets.photos.length-1, s+1)))
      if(e.key === 'ArrowLeft') setOpen((s) => (s === null ? 0 : Math.max(0, s-1)))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Parallax suave nas imagens ao scroll
  useEffect(() => {
    const handleScroll = () => {
      imagesRef.current.forEach((item, idx) => {
        if (!item) return
        const rect = item.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        if (isVisible) {
          const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
          const parallaxY = scrollProgress * 20 - 10 // Movimento parallax leve (20px max)
          item.style.transform = `translateY(${parallaxY}px) rotate(${(idx % 3 - 1) * 0.5}deg)`
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-black relative overflow-x-hidden"
    >
      {/* Background decorativo sutil com brilho vermelho */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading text-red mb-6 tracking-tight fade-in">
          Galeria
        </h2>
        <p className="text-white-cream/60 text-lg md:text-xl mb-12 max-w-2xl fade-in">
          Momentos que marcaram a trajetória do grupo.
        </p>

        {/* Grid Masonry Moderno com mais interatividade */}
        <div className="gallery-masonry">
          {assets.photos.map((photo, i) => (
            <motion.div
              key={i}
              ref={el => imagesRef.current[i] = el}
              className="gallery-item group cursor-pointer"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
            >
              <div className="relative overflow-hidden rounded-xl gallery-item-inner">
                <img 
                  src={photo} 
                  alt={`Foto ${i+1}`} 
                  className="gallery-image"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Overlay com gradiente vermelho sutil */}
                <div className="gallery-overlay">
                  <div className="gallery-icon">
                    <svg className="w-8 h-8 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                  
                  {/* Borda vermelha sutil no hover */}
                  <div className="absolute inset-0 border-2 border-red/0 group-hover:border-red/40 transition-all duration-400 rounded-xl"></div>
                </div>

                {/* Brilho vermelho sutil no canto */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-red/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 shadow-lg shadow-red/50"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Moderno com animação melhorada */}
      {open !== null && (
        <motion.div 
          className="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            if(e.target.classList.contains('lightbox-backdrop')) setOpen(null)
          }}
        >
          <motion.div 
            className="lightbox-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <img 
              src={assets.photos[open]} 
              alt={`Foto ${open+1}`} 
              className="lightbox-image"
            />
            
            {assets.photos.length > 1 && (
              <>
                <button 
                  aria-label="Anterior" 
                  className="lightbox-nav lightbox-nav-prev"
                  onClick={() => setOpen(i => Math.max(0, i-1))}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button 
                  aria-label="Próxima" 
                  className="lightbox-nav lightbox-nav-next"
                  onClick={() => setOpen(i => Math.min(assets.photos.length-1, i+1))}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <button 
              aria-label="Fechar" 
              className="lightbox-close"
              onClick={() => setOpen(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="lightbox-counter">
              {open + 1} / {assets.photos.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
