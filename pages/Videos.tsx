import React, { useEffect, useRef, useState } from 'react';

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

export const Videos = ({ content }: { content: any }) => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 sm:py-32 bg-gradient-to-br from-[#04081c] via-[#050c27] to-[#01030c] text-white">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute -top-32 -right-24 w-96 h-96 bg-brand-blue/30 blur-[120px]"></div>
                    <div className="absolute -bottom-24 -left-28 w-80 h-80 bg-purple-500/20 blur-[120px]"></div>
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                         <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-semibold tracking-[0.3em] border border-white/10">
                            CENTRO DE VÍDEOS
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">{content.heroTitle}</h1>
                        <p className="text-lg text-white/80 max-w-2xl leading-relaxed">{content.heroSubtitle}</p>
                        
                        <div className="flex flex-wrap gap-4">
                            <a href="#video-gallery" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-brand-blue text-sm font-bold shadow-lg shadow-brand-blue/30 hover:bg-brand-blue-dark transition-all">
                                Assistir agora
                            </a>
                            <a href="#" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/30 text-sm font-semibold text-white/90 hover:bg-white/10 transition-all">
                                Preciso de suporte
                            </a>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                            {content.heroList.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/20">
                                        <img 
                                            src={item.icon} 
                                            alt="" 
                                            className="h-5 w-5 object-contain"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://placehold.co/50x50?text=Icon';
                                                e.currentTarget.onerror = null;
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-0 rounded-[40px] bg-white/10 blur-3xl transform rotate-3"></div>
                        <div className="relative rounded-[32px] border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                            <div className="rounded-3xl overflow-hidden bg-gray-900/50 aspect-[4/3]">
                                <img 
                                    src={content.heroImage} 
                                    alt="Platform Demo" 
                                    className="w-full h-full object-cover opacity-90"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/800x600?text=Platform+Demo';
                                        e.currentTarget.onerror = null;
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modules Section */}
            <section className="relative py-24 text-white bg-[#02060f]">
                <div className="absolute inset-0 bg-gradient-to-b from-[#04081c] to-[#02060f] opacity-80"></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mb-16">
                        <p className="text-sm uppercase tracking-[0.3em] text-white/70 font-semibold">Conheça</p>
                        <h2 className="mt-4 text-3xl font-semibold">{content.modulesTitle}</h2>
                        <p className="mt-3 text-white/70 max-w-2xl text-lg">
                            Visualize rapidamente onde cada módulo atua e como ele conecta a operação do PDV à retaguarda.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {content.modules.map((mod: any, idx: number) => (
                            <FadeSection key={idx} delay={idx * 100}>
                                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8 flex gap-6 hover:bg-white/10 transition-colors">
                                    <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                                        <img 
                                            src={mod.icon} 
                                            alt="" 
                                            className="h-8 w-8 object-contain"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://placehold.co/60x60?text=Mod';
                                                e.currentTarget.onerror = null;
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{mod.title}</h3>
                                        <p className="mt-2 text-white/70 text-sm leading-relaxed">{mod.desc}</p>
                                    </div>
                                </div>
                            </FadeSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="video-gallery" className="relative py-24 text-white overflow-hidden bg-[#010410]">
                 {/* Background Glows */}
                <div className="absolute -right-32 top-0 w-2/3 h-full bg-brand-blue/5 blur-[120px] pointer-events-none"></div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-white/60 font-semibold">Biblioteca</p>
                            <h2 className="mt-2 text-3xl font-semibold">{content.playTitle}</h2>
                        </div>
                        <p className="text-white/80 max-w-2xl text-lg">
                            Escolha um módulo para assistir e avance pela jornada do operador: abertura de caixa, lançamento, entrega e gestão completa em nuvem.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {content.videos.map((video: any, idx: number) => (
                            <FadeSection key={idx} delay={idx * 50}>
                                <article className="group rounded-3xl bg-[#0a0f1e] border border-white/5 p-6 shadow-xl hover:border-brand-blue/30 transition-all hover:-translate-y-1">
                                    <div className="aspect-video rounded-2xl overflow-hidden bg-black/40 ring-1 ring-white/10 mb-6 relative">
                                        <iframe 
                                            src={`https://www.youtube.com/embed/${video.youtube}`} 
                                            title={video.title}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-brand-blue transition-colors">{video.title}</h3>
                                    <p className="mt-2 text-white/60 leading-relaxed">{video.desc}</p>
                                </article>
                            </FadeSection>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};