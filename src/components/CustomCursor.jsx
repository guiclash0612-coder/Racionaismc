import React, { useEffect } from 'react'

export default function CustomCursor(){
  useEffect(() => {
    // Verificar se é dispositivo touch
    if(('ontouchstart' in window) || window.matchMedia('(hover: none)').matches) {
      document.body.style.cursor = 'auto'
      document.documentElement.style.cursor = 'auto'
      return
    }

    // Ocultar cursor padrão completamente - SEM cursor branco
    document.body.style.cursor = 'none'
    document.documentElement.style.cursor = 'none'
    const allElements = document.querySelectorAll('*')
    allElements.forEach(el => {
      if(!el.closest('#custom-cursor') && el.style) {
        el.style.cursor = 'none'
      }
    })

    // Criar cursor customizado vermelho
    const cursor = document.createElement('div')
    cursor.id = 'custom-cursor'
    Object.assign(cursor.style, {
      position: 'fixed',
      width: '8px',
      height: '8px',
      background: '#B30000',
      borderRadius: '50%',
      pointerEvents: 'none',
      transform: 'translate(-50%, -50%)',
      zIndex: '10000',
      boxShadow: '0 0 12px rgba(179, 0, 0, 0.8)',
      transition: 'width 0.1s ease, height 0.1s ease, box-shadow 0.1s ease, background 0.1s ease',
      willChange: 'transform',
      left: '0px',
      top: '0px'
    })

    document.body.appendChild(cursor)

    // Função de movimento otimizada - SEM delay
    let rafId = null
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Animate cursor position using RAF for smooth 60fps - sem delay
    const animateCursor = () => {
      // Interpolação mais rápida para menos delay
      cursorX += (mouseX - cursorX) * 0.3
      cursorY += (mouseY - cursorY) * 0.3
      
      cursor.style.left = cursorX + 'px'
      cursor.style.top = cursorY + 'px'
      
      rafId = requestAnimationFrame(animateCursor)
    }

    animateCursor()

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Enlarge on interactive elements
    const handleMouseEnter = (e) => {
      const target = e.target.closest('a, button, .btn-primary, input, textarea, [role="button"], [data-magnetic], .discography-card, .gallery-item, .video-slide-card')
      if(target){
        cursor.style.width = '24px'
        cursor.style.height = '24px'
        cursor.style.background = 'rgba(179, 0, 0, 0.3)'
        cursor.style.boxShadow = '0 0 20px rgba(179, 0, 0, 1), 0 0 40px rgba(179, 0, 0, 0.5)'
        cursor.style.border = '2px solid #B30000'
      }
    }

    const handleMouseLeave = (e) => {
      const target = e.target.closest('a, button, .btn-primary, input, textarea, [role="button"], [data-magnetic], .discography-card, .gallery-item, .video-slide-card')
      if(target){
        cursor.style.width = '8px'
        cursor.style.height = '8px'
        cursor.style.background = '#B30000'
        cursor.style.boxShadow = '0 0 12px rgba(179, 0, 0, 0.8)'
        cursor.style.border = 'none'
      }
    }

    // Handle mouse down/up para feedback visual
    const handleMouseDown = () => {
      cursor.style.width = '6px'
      cursor.style.height = '6px'
    }

    const handleMouseUp = () => {
      const isOverInteractive = document.elementFromPoint(mouseX, mouseY)?.closest('a, button, .btn-primary, input, textarea, [role="button"], [data-magnetic]')
      if(isOverInteractive) {
        cursor.style.width = '24px'
        cursor.style.height = '24px'
      } else {
        cursor.style.width = '8px'
        cursor.style.height = '8px'
      }
    }

    window.addEventListener('mouseover', handleMouseEnter, { passive: true })
    window.addEventListener('mouseout', handleMouseLeave, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      document.body.style.cursor = ''
      document.documentElement.style.cursor = ''
      allElements.forEach(el => {
        if(el && el.style) {
          el.style.cursor = ''
        }
      })
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseEnter)
      window.removeEventListener('mouseout', handleMouseLeave)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      cursor.remove()
    }
  }, [])
  
  return null
}
