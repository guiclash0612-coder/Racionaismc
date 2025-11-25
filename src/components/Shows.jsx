import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const shows = [
  { 
    date: '2025-12-05', 
    time: '20:00',
    venue: 'Teatro X', 
    place: 'São Paulo - SP', 
    address: 'Av. Principal, 123 - Centro',
    status: 'Disponível',
    price: 'R$ 80 - R$ 200',
    description: 'Apresentação especial com setlist dos maiores sucessos.'
  },
  { 
    date: '2025-11-20', 
    time: '21:00',
    venue: 'Arena Y', 
    place: 'Rio de Janeiro - RJ', 
    address: 'Av. Beira Mar, 456 - Copacabana',
    status: 'Esgotado',
    price: 'Esgotado',
    description: 'Show histórico que marca o retorno ao Rio após 3 anos.'
  },
  {
    date: '2025-10-15',
    time: '19:30',
    venue: 'Festival Z',
    place: 'Belo Horizonte - MG',
    address: 'Parque Central - Centro',
    status: 'Disponível',
    price: 'R$ 120 - R$ 300',
    description: 'Participação especial no maior festival de rap do Brasil.'
  }
]

export default function Shows(){
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      cardsRef.current.forEach((card, idx) => {
        if(card) {
          gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: 'power3.out',
              delay: idx * 0.15,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true
              }
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = date.toLocaleDateString('pt-BR', { month: 'long' })
    const year = date.getFullYear()
    const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' })
    return { day, month, year, weekday }
  }

  return (
    <section 
      id="shows" 
      ref={sectionRef}
      className="py-24 md:py-40 bg-black relative overflow-hidden"
    >
      {/* Background decorativo com gradiente vermelho sutil */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-red/60 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-heading text-red mb-6 tracking-tight"
        >
          Shows e Agenda
        </h2>
        <p className="text-white-cream/70 text-lg md:text-xl mb-16 max-w-2xl">
          Próximas apresentações e eventos. Experiências únicas de música ao vivo.
        </p>

        {/* Grid de Shows - Layout Premium e Detalhado */}
        <div className="space-y-8 md:space-y-12">
          {shows.map((show, i) => {
            const dateInfo = formatDate(show.date)
            return (
              <motion.div
                key={i}
                ref={el => cardsRef.current[i] = el}
                className="show-card group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="show-card-inner relative overflow-hidden">
                  {/* Gradiente de fundo sutil */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] opacity-90"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-red/5 via-transparent to-red/5 opacity-50"></div>
                  
                  {/* Conteúdo do Card */}
                  <div className="relative grid md:grid-cols-[200px_1fr_auto] gap-6 md:gap-8 p-6 md:p-8">
                    {/* Seção de Data - Destaque */}
                    <div className="show-date-section">
                      <div className="text-red font-heading text-5xl md:text-6xl mb-2 leading-none">
                        {dateInfo.day}
                      </div>
                      <div className="text-white-cream/90 text-sm md:text-base uppercase tracking-wider mb-1">
                        {dateInfo.month}
                      </div>
                      <div className="text-white-cream/60 text-xs md:text-sm">
                        {dateInfo.year}
                      </div>
                      <div className="mt-3 pt-3 border-t border-red/20">
                        <div className="text-red text-sm font-medium">{dateInfo.weekday}</div>
                        <div className="text-white-cream/70 text-xs mt-1">{show.time}</div>
                      </div>
                    </div>

                    {/* Informações do Show */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-white-cream font-heading text-2xl md:text-3xl mb-3 group-hover:text-red transition-colors duration-300">
                          {show.venue}
                        </h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-white-cream/80 text-sm md:text-base">
                            <svg className="w-4 h-4 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{show.place}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white-cream/60 text-xs md:text-sm">
                            <svg className="w-4 h-4 text-red/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span>{show.address}</span>
                          </div>
                          <p className="text-white-cream/70 text-sm mt-3 leading-relaxed max-w-2xl">
                            {show.description}
                          </p>
                        </div>
                      </div>

                      {/* Preço */}
                      <div className="mt-4 pt-4 border-t border-red/10">
                        <div className="flex items-center gap-2 text-white-cream/60 text-xs mb-2">Preço</div>
                        <div className="text-red text-lg md:text-xl font-semibold">{show.price}</div>
                      </div>
                    </div>

                    {/* Status e Botão */}
                    <div className="flex flex-col items-end justify-between gap-4">
                      <div className={`show-status-badge ${show.status === 'Esgotado' ? 'status-soldout' : 'status-available'}`}>
                        <span className="status-dot"></span>
                        <span>{show.status}</span>
                      </div>
                      
                      <button 
                        className="show-details-btn"
                        disabled={show.status === 'Esgotado'}
                      >
                        {show.status === 'Esgotado' ? 'Esgotado' : 'Ver Detalhes'}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Borda vermelha animada no hover */}
                  <div className="absolute inset-0 border border-red/0 group-hover:border-red/30 transition-all duration-400 pointer-events-none"></div>
                  
                  {/* Brilho vermelho no hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
                    <div className="absolute inset-0 bg-red/5 blur-xl"></div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Mensagem adicional */}
        <div className="mt-16 text-center">
          <p className="text-white-cream/50 text-sm">
            Fique ligado para mais datas em breve
          </p>
        </div>
      </div>
    </section>
  )
}
