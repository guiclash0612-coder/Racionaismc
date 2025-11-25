import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const videos = [
  { 
    id: 'video1', 
    title: 'Diário de um Detento', 
    description: 'Um dos maiores clássicos do rap nacional, retratando a realidade do sistema carcerário com crítica social profunda.',
    category: 'Clássico',
    thumb: '/assets/Sobrevivendo no inferno.jpeg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  { 
    id: 'video2', 
    title: 'Negro Drama', 
    description: 'Música que aborda as questões raciais e sociais no Brasil de forma impactante e reflexiva.',
    category: 'Social',
    thumb: '/assets/Nada como um dia após o outro.jpeg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  { 
    id: 'video3', 
    title: 'Vida Loka', 
    description: 'Hino que se tornou símbolo da resistência e da voz da periferia brasileira.',
    category: 'Hino',
    thumb: '/assets/gallery-01.jpg', 
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  { 
    id: 'video4', 
    title: 'Jesus Chorou', 
    description: 'Forte crítica social com letras que ecoam até os dias de hoje nas ruas do Brasil.',
    category: 'Crítica',
    thumb: '/assets/Nada como um dia após o outro.jpeg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  { 
    id: 'video5', 
    title: 'Fórmula Mágica da Paz', 
    description: 'Reflexão profunda sobre violência, paz e transformação social que marca gerações.',
    category: 'Reflexivo',
    thumb: '/assets/Sobrevivendo no inferno.jpeg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  { 
    id: 'video6', 
    title: 'Rapaz Comum', 
    description: 'História de um jovem da periferia e sua luta diária pela sobrevivência e dignidade.',
    category: 'Narrativa',
    thumb: '/assets/gallery-02.jpg', 
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
]

export default function Videos(){
  const [open, setOpen] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filter, setFilter] = useState('Todos')
  const sectionRef = useRef(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const categories = ['Todos', ...new Set(videos.map(v => v.category))]
  const filteredVideos = filter === 'Todos' ? videos : videos.filter(v => v.category === filter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.video-item')
      cards?.forEach((card, idx) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true
            },
            delay: idx * 0.1
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [filteredVideos])

  useEffect(() => {
    function onKey(e) {
      if(!open) return
      if(e.key === 'Escape') setOpen(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX
    handleSwipe()
  }

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextVideo()
      else prevVideo()
    }
  }

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredVideos.length)
  }

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredVideos.length) % filteredVideos.length)
  }

  const handleFilterChange = (cat) => {
    setFilter(cat)
    setCurrentIndex(0)
  }

  return (
    <section 
      id="videos" 
      ref={sectionRef}
      className="videos-premium-section py-24 md:py-40 bg-black relative overflow-hidden"
    >
      {/* Background cinematográfico */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-red/10 via-red/5 to-transparent opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-red/10 via-red/5 to-transparent opacity-40"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-red/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red/3 rounded-full blur-3xl"></div>
      </div>

      {/* Decorações de borda */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red/30 to-transparent"></div>

      <div className="container relative z-10">
        {/* Header da seção */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-heading text-red mb-6 tracking-tight leading-tight">
            Clipes &<br />Performances
          </h2>
          <div className="flex items-center gap-4">
            <div className="h-1 w-16 bg-gradient-to-r from-red to-red/30"></div>
            <p className="text-white-cream/70 text-lg md:text-xl max-w-2xl">
              Assista aos maiores clássicos e performances icônicas
            </p>
          </div>
        </motion.div>

        {/* Filtros por categoria */}
        <div className="flex flex-wrap gap-3 mb-16 md:mb-20">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm uppercase tracking-wider transition-all duration-300 ${
                filter === cat
                  ? 'bg-red text-black shadow-lg shadow-red/50'
                  : 'bg-transparent border border-red/40 text-red/80 hover:border-red/80 hover:text-red'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid de vídeos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          <AnimatePresence mode="wait">
            {filteredVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                className="video-item group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setOpen(video)}
              >
                <div className="relative rounded-2xl overflow-hidden bg-black/60 backdrop-blur-sm border border-red/20 hover:border-red/50 transition-all duration-500 h-full flex flex-col group-hover:shadow-2xl group-hover:shadow-red/40">
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-video overflow-hidden bg-gray-900">
                    <img 
                      src={video.thumb} 
                      alt={video.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay escuro */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 group-hover:via-black/30 group-hover:to-black/10 transition-all duration-500"></div>

                    {/* Efeito de brilho vermelho */}
                    <div className="absolute inset-0 bg-red/0 group-hover:bg-red/15 transition-colors duration-500"></div>

                    {/* Botão play animado */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.15 }}
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red/40 to-red/20 backdrop-filter backdrop-blur-md border-2 border-red/60 flex items-center justify-center shadow-lg shadow-red/50 group-hover:shadow-2xl group-hover:shadow-red/80 transition-all duration-300">
                        <svg className="w-10 h-10 text-white fill-current ml-1" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </motion.div>

                    {/* Badge de categoria */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="px-3 py-1 bg-red/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                        {video.category}
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo inferior */}
                  <div className="flex-1 p-5 md:p-6 bg-gradient-to-b from-red/5 to-black/40 flex flex-col justify-between">
                    <div>
                      <h3 className="text-white-cream font-heading text-lg md:text-xl mb-2 group-hover:text-red transition-colors duration-300 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-white-cream/70 text-xs md:text-sm line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    </div>

                    {/* Botão assistir */}
                    <motion.div
                      className="mt-4 inline-flex items-center gap-2 text-red text-xs font-bold uppercase tracking-wider group-hover:text-red-light transition-colors duration-300"
                      whileHover={{ x: 4 }}
                    >
                      <span>Assistir Agora</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Borda inferior animada */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Seção de destaques */}
        {filteredVideos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-red/10 to-red/5 border border-red/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red/20">
                  <svg className="h-6 w-6 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-white-cream text-xl font-heading mb-2">Conheça mais músicas clássicas</h3>
                <p className="text-white-cream/80 text-sm md:text-base">
                  Explore a discografia completa de Racionais MC's e descubra as histórias por trás de cada faixa.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal de vídeo */}
      <AnimatePresence>
        {open && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
            onClick={() => setOpen(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Fechar */}
              <motion.button 
                onClick={() => setOpen(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-red/20 border border-red/50 text-red hover:bg-red/30 hover:border-red transition-all z-10 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Video player */}
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-red/20">
                <iframe 
                  src={open.videoUrl} 
                  title={open.title} 
                  className="w-full h-full" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Informações do vídeo */}
              <div className="mt-6 bg-gradient-to-r from-red/10 to-red/5 border border-red/20 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-white-cream font-heading text-2xl mb-2">{open.title}</h3>
                <p className="text-white-cream/80 text-base leading-relaxed mb-4">{open.description}</p>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red rounded-full animate-pulse"></div>
                  <span className="text-red text-sm font-medium uppercase tracking-wider">{open.category}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
