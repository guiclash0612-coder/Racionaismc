import React, { useState, useEffect, useRef } from 'react'

export default function Contact(){
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState({ name: false, email: false, message: false })
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    // Animação suave com Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible')
        }
      })
    }, { threshold: 0.1 })

    if(titleRef.current) {
      titleRef.current.classList.add('fade-in')
      observer.observe(titleRef.current)
    }

    if(formRef.current) {
      formRef.current.classList.add('fade-in')
      observer.observe(formRef.current)
    }

    return () => {
      if(titleRef.current) observer.unobserve(titleRef.current)
      if(formRef.current) observer.unobserve(formRef.current)
    }
  }, [])

  function submit(e){
    e.preventDefault()
    setTimeout(() => {
      setSent(true)
    }, 400)
  }

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 md:py-32 bg-black relative overflow-x-hidden"
    >
      {/* Background sutil */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red/50 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Título estilizado */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-heading text-red mb-4 tracking-tight"
          >
            Conecte-se com o Legado
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red to-transparent mx-auto mb-6"></div>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Entre em contato e faça parte da história.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {sent ? (
            <div className="success-message glass-strong p-12 rounded-2xl border border-red/20 text-center shadow-2xl fade-in-visible">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red/20 to-red/10 flex items-center justify-center border border-red/30">
                <svg className="w-10 h-10 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-heading text-red mb-3">Mensagem Enviada!</h3>
              <p className="text-white/70 text-lg">Obrigado pelo contato. Retornaremos em breve.</p>
            </div>
          ) : (
            <form 
              ref={formRef}
              onSubmit={submit} 
              className="contact-form space-y-6"
            >
              {/* Input Nome - Elegante */}
              <div className="relative group">
                <input 
                  required 
                  value={form.name} 
                  onChange={e => setForm({...form, name: e.target.value})}
                  onFocus={() => setFocused({...focused, name: true})}
                  onBlur={() => setFocused({...focused, name: false})}
                  className={`contact-input ${focused.name || form.name ? 'contact-input-focused' : ''}`}
                  placeholder=" "
                />
                <label className={`contact-label ${focused.name || form.name ? 'contact-label-focused' : ''}`}>
                  Nome
                </label>
              </div>

              {/* Input Email - Elegante */}
              <div className="relative group">
                <input 
                  type="email" 
                  required 
                  value={form.email} 
                  onChange={e => setForm({...form, email: e.target.value})}
                  onFocus={() => setFocused({...focused, email: true})}
                  onBlur={() => setFocused({...focused, email: false})}
                  className={`contact-input ${focused.email || form.email ? 'contact-input-focused' : ''}`}
                  placeholder=" "
                />
                <label className={`contact-label ${focused.email || form.email ? 'contact-label-focused' : ''}`}>
                  Email
                </label>
              </div>

              {/* Textarea Mensagem - Elegante */}
              <div className="relative group">
                <textarea 
                  required 
                  value={form.message} 
                  onChange={e => setForm({...form, message: e.target.value})}
                  onFocus={() => setFocused({...focused, message: true})}
                  onBlur={() => setFocused({...focused, message: false})}
                  className={`contact-input min-h-[160px] resize-none ${focused.message || form.message ? 'contact-input-focused' : ''}`}
                  placeholder=" "
                ></textarea>
                <label className={`contact-label contact-label-textarea ${focused.message || form.message ? 'contact-label-focused' : ''}`}>
                  Mensagem
                </label>
              </div>

              {/* Botão com efeito magnético */}
              <button 
                type="submit"
                className="contact-submit-btn w-full relative overflow-hidden group"
                data-magnetic
              >
                <span className="relative z-10">Enviar Mensagem</span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-light via-red to-red-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
