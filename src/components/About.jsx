import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const historyItems = [
  {
    year: '1988',
    title: 'A Origem',
    text: 'Da periferia de São Paulo surge uma voz que ecoaria por décadas. O início de uma revolução que transformaria a música brasileira para sempre.',
    side: 'left',
    details: {
      founder: 'Mano Brown, KL Jay, Ice Blue e Edy Rock',
      location: 'Vila Brasilândia, São Paulo',
      impact: 'Nascimento do que seria o maior nome do rap brasileiro',
      achievements: [
        'Formação do grupo com propósito social',
        'Primeiras apresentações em shows underground',
        'Início da documentação poética das periferias',
        'Criação de identidade própria no rap nacional'
      ],
      cultural: 'Marca o início da revolução do rap consciente, trazendo a voz das ruas para a música'
    }
  },
  {
    year: '1990-1996',
    title: 'Consolidação',
    text: 'Racionais MC\'s se consolidam como instrumento de transformação social, usando a música para documentar a realidade das periferias e dar voz aos invisíveis.',
    side: 'right',
    details: {
      founder: 'Consolidação da fórmula musical e lírica',
      location: 'São Paulo - Shows e apresentações ao vivo',
      impact: 'Reconhecimento e expansão do movimento',
      achievements: [
        'Lançamento de álbuns independentes',
        'Crescimento em shows e apresentações',
        'Influência sobre gerações de jovens',
        'Estabelecimento como porta-voz das periferias'
      ],
      cultural: 'Período de aperfeiçoamento do discurso social e reconhecimento local do movimento'
    }
  },
  {
    year: '1997',
    title: 'Sobrevivendo no Inferno',
    text: 'Álbum que marca gerações e define o rap nacional como nunca antes. Um marco histórico que ecoa até os dias de hoje.',
    side: 'left',
    details: {
      founder: 'Lançamento do álbum revolucionário',
      location: 'Brasil - Impacto nacional e internacional',
      impact: 'Maior álbum de rap produzido na América Latina',
      achievements: [
        'Mais de 1 milhão de cópias vendidas',
        'Indicação ao Grammy',
        'Transformação do rap brasileiro internacionalmente',
        'Estabelecimento como voz oficial da periferia'
      ],
      cultural: 'Marca a consolidação definitiva do rap consciente como ferramenta de transformação social'
    }
  },
  {
    year: '2002',
    title: 'Nada Como Um Dia Após o Outro Dia',
    text: 'Disco duplo que consolida o legado histórico e influencia gerações futuras. A maturidade artística em sua forma mais pura.',
    side: 'right',
    details: {
      founder: 'Continuação do legado com maior maturidade',
      location: 'Brasil - Consolidação da carreira',
      impact: 'Disco duplo que redefiniu o rap brasileiro',
      achievements: [
        'Exploração de temas diversos e profundos',
        'Produção musical de qualidade superior',
        'Consolidação de vendas recordes',
        'Influência geracional contínua'
      ],
      cultural: 'Demonstra que a conscientização social pode evoluir artisticamente sem perder o propósito'
    }
  },
  {
    year: 'Hoje',
    title: 'O Legado',
    text: 'Mais de três décadas depois, o legado continua vivo. Influenciando. Transformando. Resistindo.',
    side: 'center',
    details: {
      founder: 'Continuidade e influência geracional',
      location: 'Brasil e Mundo - Alcance global',
      impact: 'Ícones permanentes da música brasileira',
      achievements: [
        'Influência em artistas contemporâneos',
        'Reconhecimento internacional permanente',
        'Documentário e produções audiovisuais',
        'Símbolo eterno de resistência e transformação'
      ],
      cultural: 'O maior legado de resistência, conscientização e transformação social através da música'
    }
  }
]

export default function About(){
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação dos itens da história
      const items = sectionRef.current?.querySelectorAll('.history-item')
      items?.forEach((item, idx) => {
        // Fade in e slide
        gsap.fromTo(item,
          {
            opacity: 0,
            y: 80,
            filter: 'blur(10px)'
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true
            },
            delay: idx * 0.1
          }
        )
      })

      // Rotação sutil dos badges
      const badges = sectionRef.current?.querySelectorAll('.year-badge')
      badges?.forEach((badge, idx) => {
        gsap.to(badge, {
          rotation: 360,
          duration: 3,
          repeat: -1,
          ease: 'none',
          delay: idx * 0.2
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-auto md:min-h-screen py-24 md:py-40 overflow-hidden bg-black"
    >
      {/* Background com gradiente sutil */}
      <div className="absolute inset-0">
        <div className="hidden md:block absolute top-0 left-1/4 w-96 h-96 bg-red/5 rounded-full blur-3xl"></div>
        <div className="hidden md:block absolute bottom-0 right-1/4 w-96 h-96 bg-red/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* Título principal */}
        <motion.div 
          className="mb-16 md:mb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-heading text-red mb-3 md:mb-4 tracking-tight">
            A História
          </h2>
          <p className="text-white-cream/70 text-base md:text-xl font-light">
            Uma jornada de resistência, voz e transformação social
          </p>
        </motion.div>

        {/* Grid de itens da história */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 lg:gap-12"
        >
          {historyItems.map((item, idx) => (
            <motion.div
              key={item.year}
              className="history-item group cursor-default"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <div className="relative h-full">
                {/* Decoração de fundo */}
                <div className="absolute inset-0 bg-gradient-to-br from-red/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Linha decorativa superior */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red via-red/50 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Conteúdo */}
                <div className="relative p-4 sm:p-6 md:p-10 h-full flex flex-col">
                  {/* Badge do ano */}
                  <div className="mb-6 inline-flex">
                    <div className="year-badge relative">
                      <div className="absolute inset-0 bg-red rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500"></div>
                      <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-red/60 group-hover:border-red transition-colors duration-300">
                        <span className="text-red font-heading text-sm md:text-base font-bold">
                          {item.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-heading text-white-cream mb-3 md:mb-4 transition-colors duration-300 group-hover:text-red">
                    {item.title}
                  </h3>

                  {/* Linha divisória */}
                  <div className="w-12 h-1 bg-gradient-to-r from-red to-red/30 mb-6 rounded-full"></div>

                  {/* Descrição */}
                  <p className="text-white-cream/80 text-sm md:text-lg leading-relaxed font-light flex-grow">
                    {item.text}
                  </p>

                  {/* Ícone de seta (decorativo) */}
                  <div className="mt-6 inline-flex">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-red/40 hover:text-red transition-colors duration-300 cursor-pointer hover:scale-110 transform transition-transform"
                      aria-label={`Ver mais sobre ${item.title}`}
                    >
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l-7 7m7-7H5" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Borda inferior sutil */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rodapé inspirador */}
        <motion.div 
          className="mt-24 md:mt-32 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="inline-block">
            <p className="text-white-cream/60 text-lg md:text-xl font-light mb-4">
              Mais de 35 anos transformando vidas através da música
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-red"></div>
              <div className="w-2 h-2 bg-red rounded-full"></div>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-red"></div>
            </div>
          </div>
        </motion.div>

        {/* Modal de Detalhes */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
              />

              {/* Modal */}
              <motion.div
                className="relative bg-black border border-red/40 rounded-2xl overflow-hidden flex flex-col w-full max-w-2xl max-h-[85vh] md:max-h-[80vh]"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Decoração da cruz no canto superior direito */}
                <div className="absolute -top-24 -right-24 w-56 h-56 opacity-15 pointer-events-none">
                  <img 
                    src="/assets/CRUZ.png" 
                    alt="decoração" 
                    className="w-full h-full object-contain filter brightness-150"
                  />
                </div>

                {/* Header do Modal - Compacto */}
                <div className="relative bg-gradient-to-b from-red/15 to-red/5 border-b border-red/30 p-6">
                  {/* Linha decorativa */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red to-transparent opacity-50"></div>

                  <div className="relative flex items-end justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-red font-heading text-xs font-bold tracking-widest uppercase block mb-2">
                        {selectedItem.year}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-heading text-white-cream leading-tight">
                        {selectedItem.title}
                      </h2>
                    </div>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="text-red/60 hover:text-red transition-colors flex-shrink-0"
                      aria-label="Fechar modal"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Conteúdo do Modal */}
                <div className="overflow-y-auto flex-1 p-6">
                  <div className="space-y-6">
                    {/* Descrição principal */}
                    <div>
                      <p className="text-white-cream/85 text-sm md:text-base leading-relaxed font-light">
                        {selectedItem.text}
                      </p>
                    </div>

                    {/* Grid com informações principais */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red/5 border border-red/20 rounded-lg p-4">
                        <div className="text-red text-xs font-bold tracking-widest mb-2">PROTAGONISTA</div>
                        <p className="text-white-cream/80 text-sm font-light">{selectedItem.details.founder}</p>
                      </div>
                      <div className="bg-red/5 border border-red/20 rounded-lg p-4">
                        <div className="text-red text-xs font-bold tracking-widest mb-2">LOCAL</div>
                        <p className="text-white-cream/80 text-sm font-light">{selectedItem.details.location}</p>
                      </div>
                    </div>

                    {/* Impacto destacado */}
                    <div className="bg-gradient-to-r from-red/10 to-transparent border border-red/20 rounded-lg p-4">
                      <div className="text-red text-xs font-bold tracking-widest mb-2">IMPACTO</div>
                      <p className="text-white-cream/85 text-sm font-light leading-relaxed">
                        {selectedItem.details.impact}
                      </p>
                    </div>

                    {/* Realizações em lista compacta */}
                    <div>
                      <div className="text-red text-xs font-bold tracking-widest mb-3">MARCOS</div>
                      <div className="space-y-2">
                        {selectedItem.details.achievements.map((achievement, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <div className="w-1.5 h-1.5 bg-red rounded-full mt-1.5 flex-shrink-0"></div>
                            <p className="text-white-cream/80 font-light">
                              {achievement}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Significado cultural */}
                    <div className="bg-gradient-to-br from-red/5 to-red/2 border border-red/20 rounded-lg p-4">
                      <div className="text-red text-xs font-bold tracking-widest mb-2">LEGADO</div>
                      <p className="text-white-cream/80 text-sm font-light italic leading-relaxed">
                        {selectedItem.details.cultural}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer simples */}
                <div className="border-t border-red/20 p-4 bg-black/50">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full py-2 px-4 text-sm bg-red/10 hover:bg-red/20 text-red border border-red/30 rounded-lg font-light transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
