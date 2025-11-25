import React, { useState, useRef, useEffect } from 'react'
import useIntersection from '../hooks/useIntersection'

export default function LazyImage({ src, alt, className, ...props }){
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef(null)
  const visible = useIntersection(containerRef, '100px')

  useEffect(() => {
    if(visible && !loaded){
      const img = new Image()
      img.onload = () => setLoaded(true)
      img.src = src
    }
  }, [visible, loaded, src])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className || ''}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-card/30"></div>
      )}
      {visible && (
        <img 
          src={src} 
          alt={alt} 
          className={`transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}
    </div>
  )
}
