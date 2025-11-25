import React, { useState, useEffect, useRef } from 'react';

// Fade in hook
const useFadeIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
        }
      });
    });
    const current = domRef.current;
    if (current) observer.observe(current);
    return () => { if(current) observer.disconnect(); };
  }, []);

  return { ref: domRef, isVisible };
};

const FadeSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    const { ref, isVisible } = useFadeIn();
    return (
        <div 
            ref={ref} 
            className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const StatCounter = ({ number, label }: { number: string, label: string }) => {
    const { ref, isVisible } = useFadeIn();
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        const target = parseInt(number.replace(/\D/g, ''), 10);
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isVisible, number]);

    return (
        <div ref={ref} className="text-center sm:text-left">
            <p className="text-4xl font-bold text-white">
                {number.includes('+') ? '+' : ''}{count}
            </p>
            <p className="mt-2 text-sm text-white/70 font-medium">{label}</p>
        </div>
    );
};

export const Home = ({ content }: { content: any }) => {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroSlides = content.heroSlides;

  // Hero Carousel Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Video Carousel Logic
  const videoTrackRef = useRef<HTMLDivElement>(null);
  
  const scrollVideos = (direction: 'left' | 'right') => {
    if (videoTrackRef.current) {
        const scrollAmount = 350;
        videoTrackRef.current.scrollBy({
            left: direction === 'right' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen bg-gray-900 text-white flex items-center">
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide: any, index: number) => (
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.title}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentHeroSlide ? 'opacity-100' : 'opacity-0'
              }`}
              onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/1920x1080?text=Slide+Hero';
                  e.currentTarget.onerror = null;
              }}
            />
          ))}
          <div className="absolute inset-0 bg-black/60"></div>
          {/* Subtle gradient for better text readability at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
            <p className="text-sm uppercase tracking-widest text-white/70 font-semibold">
              Automação Comercial Inteligente
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight min-h-[4rem] sm:min-h-[5rem] drop-shadow-sm">
              {heroSlides[currentHeroSlide].title}
            </h1>
            <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-white/90 min-h-[3.5rem] max-w-2xl mx-auto lg:mx-0">
              {heroSlides[currentHeroSlide].subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#" className="inline-flex items-center justify-center rounded-full px-8 py-3.5 bg-brand-blue text-white font-bold hover:bg-brand-blue-dark transition-all transform hover:scale-105 shadow-lg shadow-brand-blue/30">
                {content.heroCtaPrimary}
              </a>
              <a href="#" className="inline-flex items-center justify-center rounded-full px-8 py-3.5 border border-white/60 text-white font-bold hover:bg-white/10 transition-all backdrop-blur-sm">
                {content.heroCtaSecondary}
              </a>
            </div>
          </div>
        </div>

        {/* Indicators - Positioned absolutely relative to the section, not the container */}
        <div className="absolute bottom-8 lg:bottom-12 left-0 right-0 z-20 flex justify-center px-4">
            <div className="flex space-x-3 p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
            {heroSlides.map((_: any, index: number) => (
                <button 
                    key={index}
                    onClick={() => setCurrentHeroSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentHeroSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
            </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div>
                    <p className="text-sm uppercase tracking-widest text-brand-blue mb-2 font-semibold">Demonstrações</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{content.videosTitle}</h2>
                </div>
            </div>
            <div className="relative mt-12 group">
                <button 
                    onClick={() => scrollVideos('left')} 
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg text-gray-600 hover:text-brand-blue border border-gray-200 -ml-4 lg:-ml-6 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                    aria-label="Previous videos"
                >
                    &lsaquo;
                </button>
                <div ref={videoTrackRef} className="flex gap-6 overflow-x-auto no-scrollbar pb-4 snap-x">
                    {content.videos.map((video: any) => (
                        <div key={video.id} className="bg-white border border-gray-200 rounded-2xl p-6 w-80 md:w-96 flex-shrink-0 shadow-sm snap-center hover:shadow-md transition-shadow">
                            <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-900/10">
                                <iframe 
                                    src={video.link} 
                                    title={video.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">{video.title}</h3>
                            <p className="mt-2 text-gray-600 text-sm">{video.description}</p>
                        </div>
                    ))}
                </div>
                <button 
                    onClick={() => scrollVideos('right')} 
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg text-gray-600 hover:text-brand-blue border border-gray-200 -mr-4 lg:-mr-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next videos"
                >
                    &rsaquo;
                </button>
            </div>
          </div>
      </section>

      {/* Equipment Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
                <p className="text-sm uppercase tracking-widest text-brand-blue mb-2 font-semibold">Hardware Homologado</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{content.equipTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {content.equipments.map((item: any, idx: number) => (
                    <FadeSection key={item.id} delay={idx * 100}>
                        <article className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 h-full hover:shadow-md transition-shadow">
                            <div className="h-48 rounded-2xl overflow-hidden mb-6 bg-gray-100 flex items-center justify-center p-4">
                                <img 
                                    src={item.img} 
                                    alt={item.title} 
                                    className="h-full object-contain mix-blend-multiply" 
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/400x300?text=Equipamento';
                                        e.currentTarget.onerror = null;
                                    }}
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                            <p className="mt-3 text-gray-600">{item.desc}</p>
                        </article>
                    </FadeSection>
                ))}
            </div>
        </div>
      </section>

      {/* Segments Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center max-w-3xl mx-auto mb-12">
                <p className="text-sm uppercase tracking-widest text-brand-blue mb-2 font-semibold">Segmentos</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{content.segmentsTitle}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {content.segments.map((seg: any, idx: number) => (
                    <FadeSection key={seg.id} delay={idx * 50}>
                        <article className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center h-full hover:shadow-lg hover:border-brand-blue/30 transition-all cursor-pointer group">
                            <div className="w-16 h-16 rounded-full overflow-hidden mb-4 ring-2 ring-gray-100 group-hover:ring-brand-blue/20 transition-all">
                                <img 
                                    src={seg.img} 
                                    alt={seg.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/200x200?text=Seg';
                                        e.currentTarget.onerror = null;
                                    }} 
                                />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-brand-blue transition-colors">{seg.title}</h3>
                            <p className="mt-2 text-gray-600 text-sm">{seg.desc}</p>
                        </article>
                    </FadeSection>
                ))}
            </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Abstract background shape */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-widest text-brand-blue mb-2 font-semibold">Benefícios</p>
                <h2 className="text-3xl sm:text-4xl font-bold">{content.whyTitle}</h2>
                <p className="mt-4 text-white/80 text-lg">{content.whySubtitle}</p>
             </div>
             <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.benefits.map((ben: any, idx: number) => (
                    <article key={idx} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
                        <h3 className="text-xl font-semibold text-white">{ben.title}</h3>
                        <p className="mt-3 text-white/70 leading-relaxed">{ben.desc}</p>
                    </article>
                ))}
             </div>
        </div>
      </section>

      {/* Modules & Cloud Section */}
      <section className="py-16 sm:py-24 bg-white">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
            <div>
                 <p className="text-sm uppercase tracking-widest text-brand-blue mb-2 font-semibold">Módulos</p>
                 <h2 className="text-3xl font-bold text-gray-900">{content.modulesTitle}</h2>
                 <ul className="mt-8 space-y-6">
                    {content.modules.map((mod: any, idx: number) => (
                        <li key={idx} className="p-6 border border-gray-200 rounded-2xl hover:border-brand-blue/30 hover:shadow-md transition-all bg-white">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-blue inline-block"></span>
                                {mod.title}
                            </h3>
                            <p className="mt-2 text-gray-600 pl-4 border-l-2 border-gray-100">{mod.desc}</p>
                        </li>
                    ))}
                 </ul>
            </div>
            <div className="bg-gray-900 text-white rounded-3xl p-8 w-full max-w-xl mx-auto self-center lg:justify-self-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                
                <div className="relative z-10">
                    <p className="text-sm uppercase tracking-widest text-brand-blue mb-2 font-semibold">Nuvem</p>
                    <h3 className="text-3xl font-bold">{content.cloudTitle}</h3>
                    <p className="mt-4 text-white/80">{content.cloudText}</p>
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                        {content.stats.map((stat: any, idx: number) => (
                            <StatCounter key={idx} number={stat.number} label={stat.label} />
                        ))}
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                    <p className="text-sm uppercase tracking-widest text-brand-blue mb-2 font-semibold">Contato</p>
                    <h2 className="text-3xl font-bold text-gray-900">{content.formTitle}</h2>
                    <p className="mt-4 text-gray-600">{content.formSubtitle}</p>
                    
                    <form className="mt-8 grid grid-cols-1 gap-6" onSubmit={(e) => e.preventDefault()}>
                        <label className="block">
                            <span className="text-sm font-medium text-gray-900">Nome ou Apelido</span>
                            <input 
                                type="text" 
                                className="mt-2 block w-full rounded-xl border border-gray-300 bg-white text-gray-900 px-4 py-3 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-shadow hover:shadow-lg" 
                                placeholder="Digite aqui" 
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-gray-900">Telefone (com DDD)</span>
                            <input 
                                type="text" 
                                className="mt-2 block w-full rounded-xl border border-gray-300 bg-white text-gray-900 px-4 py-3 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-shadow hover:shadow-lg" 
                                placeholder="(31) 99999-0000" 
                            />
                        </label>
                         <label className="block">
                            <span className="text-sm font-medium text-gray-900">Sua dúvida?</span>
                            <textarea 
                                rows={4} 
                                className="mt-2 block w-full rounded-xl border border-gray-300 bg-white text-gray-900 px-4 py-3 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-shadow hover:shadow-lg" 
                                placeholder="Conte para nós" 
                            />
                        </label>
                        <button type="submit" className="inline-flex items-center justify-center rounded-full px-8 py-3.5 bg-brand-blue text-white font-semibold hover:bg-brand-blue-dark transition-all shadow-lg shadow-brand-blue/20 transform hover:-translate-y-0.5">
                            Enviar Mensagem
                        </button>
                    </form>
                </div>
                <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pronto para começar?</h3>
                    <p className="text-gray-600 leading-relaxed">Entre em contato e descubra como acelerar o seu ponto de venda com a UAI PDV.</p>
                    <ul className="mt-8 space-y-6 text-gray-700">
                        <li className="flex items-center gap-4 group cursor-pointer">
                            <span className="w-12 h-12 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </span>
                            <span className="font-medium">(31) 4002-8922</span>
                        </li>
                        <li className="flex items-center gap-4 group cursor-pointer">
                            <span className="w-12 h-12 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </span>
                            <span className="font-medium">suporte@uaipdv.com</span>
                        </li>
                        <li className="flex items-center gap-4 group cursor-pointer">
                            <span className="w-12 h-12 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </span>
                            <span className="font-medium">Belo Horizonte • MG</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};