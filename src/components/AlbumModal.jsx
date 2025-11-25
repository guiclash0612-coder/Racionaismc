import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function AlbumModal({ album, onClose }){
  const modalRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if(!album) return

    // Animação de entrada
    if(contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.8, filter: 'blur(20px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }
      )
    }

    function onKey(e){ 
      if(e.key === 'Escape') onClose() 
    }
    window.addEventListener('keydown', onKey)

    // Focus trap
    const prev = document.activeElement
    const node = modalRef.current
    if(node){
      const focusable = node.querySelectorAll('a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])')
      const first = focusable[0]
      first?.focus()

      function onTab(e){
        if(e.key !== 'Tab') return
        const focusableArr = Array.from(focusable)
        if(focusableArr.length === 0) return
        const idx = focusableArr.indexOf(document.activeElement)
        if(e.shiftKey && idx === 0){
          e.preventDefault(); focusableArr[focusableArr.length-1].focus()
        } else if(!e.shiftKey && idx === focusableArr.length -1){
          e.preventDefault(); focusableArr[0].focus()
        }
      }
      node.addEventListener('keydown', onTab)

      return () => {
        node.removeEventListener('keydown', onTab)
        prev?.focus()
      }
    }

    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, album])

  if(!album) return null
  
  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if(e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 modal-backdrop" onClick={onClose}></div>
      
      <div 
        ref={modalRef}
        className="relative glass-strong p-8 rounded-xl max-w-4xl w-full z-10 border border-red/20 shadow-2xl"
      >
        <button 
          onClick={onClose} 
          aria-label="Fechar" 
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass-strong border border-red/30 text-red hover:bg-red/20 hover:border-red transition-all flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div ref={contentRef} className="grid md:grid-cols-2 gap-8">
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={album.src} 
              alt={album.title} 
              className="w-full h-full min-h-[300px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-heading text-3xl md:text-4xl text-red mb-2">
                {album.title}
              </h3>
              <p className="text-red-light/80 text-lg mb-4">{album.year}</p>
              <p className="text-white-cream/80 mb-6 leading-relaxed">{album.description}</p>
              
              <div className="mb-6">
                <h4 className="text-red font-heading text-xl mb-3">Faixas</h4>
                <ol className="space-y-2">
                  {album.tracks.map((t, i) => (
                    <li key={i} className="text-white-cream/70 flex items-center gap-3">
                      <span className="text-red/50 text-sm">{String(i + 1).padStart(2, '0')}</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            
            <div>
              <a 
                href={album.link} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary w-full text-center block"
              >
                Ouvir no Spotify
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
