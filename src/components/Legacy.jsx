import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  {
    year: '1988',
    title: 'Fundação',
    description: 'Grupo formado na periferia de São Paulo, começando uma revolução cultural.',
    impact: 'Pioneiros do rap nacional'
  },
  {
    year: '1997',
    title: 'Sobrevivendo no Inferno',
    description: 'Álbum que se tornou referência obrigatória do rap brasileiro e da música nacional.',
    impact: '1 milhão+ de cópias vendidas'
  },
  {
    year: '2002',
    title: 'Nada Como Um Dia Após o Outro Dia',
    description: 'Disco duplo que consolidou o legado e influenciou gerações futuras.',
    impact: 'Grammy Latino indicado'
  },
  {
    year: '2014',
    title: 'Cores e Valores',
    description: 'Coletânea que reúne os maiores sucessos e marca a permanência do grupo.',
    impact: 'Influência cultural contínua'
  }
]

export default function Legacy(){
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const itemsRef = useRef([])
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Animação da linha da timeline baseada no scroll
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação dos pontos da timeline baseada no scroll
      itemsRef.current.forEach((item, idx) => {
        if (!item) return
        
        const card = item.querySelector('.legacy-card')
        const dot = item.querySelector('.legacy-dot')
        
        if (card && dot) {
          gsap.fromTo(dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
              }
            }
          )

          gsap.fromTo(card,
            { 
              opacity: 0, 
              x: idx % 2 === 0 ? -80 : 80,
              scale: 0.9
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
              }
            }
          )
        }
      })

      // Parallax nos cards baseado no scroll
      itemsRef.current.forEach((item, idx) => {
        if (!item) return
        
        const card = item.querySelector('.legacy-card')
        if (card) {
          gsap.to(card, {
            y: () => {
              const progress = ScrollTrigger.getById(`legacy-${idx}`)?.progress || 0
              return (idx % 2 === 0 ? -20 : 20) * (1 - progress)
            },
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              id: `legacy-${idx}`
            }
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="legacy" 
      ref={sectionRef}
      className="py-24 md:py-40 bg-black relative overflow-hidden"
    >
      {/* Background decorativo mais intenso */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red/60 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.h2 
          className="text-5xl md:text-7xl lg:text-8xl font-heading text-red mb-6 tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Impacto Cultural
        </motion.h2>
        <p className="text-white-cream/70 text-lg md:text-xl mb-20 max-w-2xl">
          Uma timeline visual da importância e influência do grupo na cultura brasileira.
        </p>

        {/* Timeline Visual Interativa */}
        <div ref={timelineRef} className="relative max-w-7xl mx-auto">
          {/* Linha vertical animada */}
          <motion.div 
            className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-red/20 origin-top"
            style={{ 
              scaleY: lineProgress,
            }}
          />
          
          {/* Linha de brilho vermelho */}
          <motion.div 
            className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 w-0.5 bg-red origin-top"
            style={{ 
              height: lineHeight,
              boxShadow: '0 0 20px rgba(179, 0, 0, 0.8), 0 0 40px rgba(179, 0, 0, 0.4)'
            }}
          />

          {/* Itens da timeline */}
          <div className="space-y-20 md:space-y-32">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={milestone.year}
                ref={el => itemsRef.current[idx] = el}
                className="legacy-item relative flex flex-col md:flex-row items-start gap-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                {/* Ponto na linha - interativo */}
                <motion.div 
                  className="legacy-dot absolute left-8 md:left-1/2 md:-translate-x-1/2 w-6 h-6 bg-red rounded-full border-4 border-black shadow-2xl shadow-red/60 z-10"
                  whileHover={{ scale: 1.3, boxShadow: '0 0 30px rgba(179, 0, 0, 1)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 bg-red rounded-full animate-ping opacity-30"></div>
                </motion.div>

                {/* Conteúdo do card */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:ml-auto md:pl-16 md:text-left'}`}>
                  <motion.div 
                    className="legacy-card bg-[#0a0a0a] border border-red/20 rounded-2xl p-6 md:p-8 hover:border-red/50 transition-all duration-400 group cursor-pointer relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Gradiente de fundo sutil no hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                    
                    {/* Brilho vermelho no hover */}
                    <div className="absolute inset-0 bg-red/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

                    <div className="relative z-10">
                      {/* Ano destacado */}
                      <motion.div 
                        className="text-red font-heading text-5xl md:text-6xl mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {milestone.year}
                      </motion.div>
                      
                      {/* Título */}
                      <h3 className="text-white-cream text-2xl md:text-3xl font-heading mb-4 group-hover:text-red transition-colors duration-300">
                        {milestone.title}
                      </h3>
                      
                      {/* Descrição */}
                      <p className="text-white-cream/80 text-base md:text-lg mb-6 leading-relaxed">
                        {milestone.description}
                      </p>
                      
                      {/* Badge de impacto */}
                      <motion.div 
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-red/10 border border-red/40 rounded-full text-red text-sm font-medium backdrop-blur-sm"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: 'rgba(179, 0, 0, 0.2)',
                          borderColor: 'rgba(179, 0, 0, 0.6)'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>{milestone.impact}</span>
                      </motion.div>
                    </div>

                    {/* Linha decorativa vermelha */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Linha final da timeline */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 bottom-0 w-6 h-6 bg-red rounded-full border-4 border-black shadow-2xl shadow-red/60 z-10"></div>
        </div>
      </div>
    </section>
  )
}
