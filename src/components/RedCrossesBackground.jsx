import React from 'react'

/**
 * Componente de cruzes vermelhas decorativas espalhadas pelo site
 * Cruzes pequenas e discretas para adicionar visual ao fundo
 */
export default function RedCrossesBackground() {
  // Array com posições e propriedades das cruzes
  // Posições em porcentagem para funcionar em qualquer tamanho de tela
  const crosses = [
    { top: '8%', left: '5%', size: 16, rotate: 15, opacity: 0.25 },
    { top: '15%', left: '85%', size: 20, rotate: -10, opacity: 0.3 },
    { top: '25%', left: '15%', size: 14, rotate: 45, opacity: 0.2 },
    { top: '12%', left: '55%', size: 18, rotate: -25, opacity: 0.28 },
    { top: '35%', left: '70%', size: 22, rotate: 30, opacity: 0.25 },
    { top: '45%', left: '25%', size: 16, rotate: -40, opacity: 0.22 },
    { top: '55%', left: '90%', size: 19, rotate: 20, opacity: 0.26 },
    { top: '65%', left: '10%', size: 15, rotate: -35, opacity: 0.24 },
    { top: '75%', left: '60%', size: 17, rotate: 50, opacity: 0.23 },
    { top: '85%', left: '35%', size: 21, rotate: -15, opacity: 0.27 },
    { top: '92%', left: '75%', size: 13, rotate: 25, opacity: 0.2 },
    { top: '40%', left: '50%', size: 18, rotate: -30, opacity: 0.25 },
    { top: '20%', left: '30%', size: 16, rotate: 40, opacity: 0.24 },
    { top: '60%', left: '45%', size: 19, rotate: -20, opacity: 0.26 },
    { top: '80%', left: '15%', size: 14, rotate: 35, opacity: 0.22 },
  ]

  return (
    <div
      aria-hidden="true"
      className="red-crosses-background fixed inset-0 w-full h-full pointer-events-none"
      style={{ 
        overflow: 'hidden',
        zIndex: 1
      }}
    >
      {crosses.map((cross, i) => (
        <svg
          key={i}
          width={cross.size}
          height={cross.size}
          className="red-cross"
          style={{
            position: 'absolute',
            top: cross.top,
            left: cross.left,
            transform: `rotate(${cross.rotate}deg)`,
            opacity: cross.opacity,
            pointerEvents: 'none',
          }}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="12"
            y1="3"
            x2="12"
            y2="21"
            stroke="#B30000"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            stroke="#B30000"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </div>
  )
}

