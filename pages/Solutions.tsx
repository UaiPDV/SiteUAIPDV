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

const FadeSection: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => {
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

export const Solutions = ({ content }: { content: any }) => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative isolate overflow-hidden py-24 sm:py-32 bg-gray-950 text-white min-h-[85vh] flex items-center">
                {/* Hero Glow */}
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_top,_#1d4ed8_0%,_transparent_60%)] opacity-70 blur-[60px] pointer-events-none" 
                    aria-hidden="true"
                ></div>
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-white/70 font-semibold">{content.heroKicker}</p>
                        <h1 className="mt-6 text-4xl sm:text-5xl font-bold leading-tight">{content.heroTitle}</h1>
                        <p className="mt-6 text-lg text-white/80 leading-relaxed">{content.heroSubtitle}</p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                             <a
                                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 bg-brand-blue text-white font-semibold hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/30"
                                href="https://api.whatsapp.com/send?l=pt_BR&phone=553193585185"
                            >
                                {content.heroPrimaryCta}
                            </a>
                            <a
                                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 border border-white/40 text-white font-semibold hover:bg-white/10 transition-all"
                                href="https://api.whatsapp.com/send?l=pt_BR&phone=553193585185"
                            >
                                {content.heroSecondaryCta}
                            </a>
                        </div>
                        <p className="mt-6 text-sm text-white/60 italic">{content.heroNote}</p>
                        
                        <div className="mt-8 flex flex-wrap gap-4">
                            {content.heroBadges.map((badge: any, idx: number) => (
                                <div key={idx} className="relative inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 border border-white/20 backdrop-blur">
                                    <div className="absolute inset-0 rounded-full border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] -z-10"></div>
                                    <img 
                                        src={badge.image} 
                                        alt={badge.label} 
                                        className="h-6 w-6 object-contain"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://placehold.co/50x50?text=Icon';
                                            e.currentTarget.onerror = null;
                                        }}
                                    />
                                    <span className="text-sm font-semibold">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 rounded-3xl bg-brand-blue/20 blur-3xl -z-10"></div>
                        <img
                            className="w-full rounded-3xl border border-white/10 shadow-2xl object-cover transform rotate-1 hover:rotate-0 transition-transform duration-700"
                            src={content.heroImage}
                            alt="UAI PDV Mais"
                            onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/600x400?text=Hero+Solutions';
                                e.currentTarget.onerror = null;
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Delivery Section */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-sm uppercase tracking-widest text-brand-blue font-semibold">{content.deliveryKicker}</p>
                        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">{content.deliveryTitle}</h2>
                        <p className="mt-4 text-lg text-gray-600 font-medium">{content.deliverySubtitle}</p>
                        <p className="mt-4 text-gray-600 leading-relaxed">{content.deliveryText}</p>
                        <ul className="mt-8 space-y-4">
                            {content.deliveryPoints.map((point: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700">
                                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue flex-shrink-0">
                                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-brand-blue/5 blur-3xl -z-10 rounded-full"></div>
                        <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-100 relative">
                            <img 
                                className="w-full object-cover" 
                                src={content.deliveryPrimaryImage} 
                                alt="App Delivery"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/600x400?text=Delivery+App';
                                    e.currentTarget.onerror = null;
                                }} 
                            />
                        </div>
                         {/* Secondary Image Overlay */}
                         <div className="absolute -bottom-12 -left-8 w-48 sm:w-64 rounded-2xl border-4 border-white shadow-xl bg-white hidden sm:block">
                            <img 
                                className="w-full object-cover rounded-xl" 
                                src={content.deliverySecondaryImage} 
                                alt="Menu Digital"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/300x400?text=Menu';
                                    e.currentTarget.onerror = null;
                                }} 
                            />
                        </div>
                    </div>
                </div>
            </section>

             {/* Payment Section */}
             <section className="py-16 sm:py-24 bg-gray-50 mt-12 sm:mt-0">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
                     <div className="order-2 lg:order-1">
                        <p className="text-sm uppercase tracking-widest text-brand-blue font-semibold">Smart POS</p>
                        <h2 className="mt-4 text-3xl font-bold text-gray-900">{content.paymentTitle}</h2>
                        <p className="mt-4 text-gray-600 text-lg">{content.paymentText}</p>
                        <div className="mt-8 space-y-4">
                            {content.paymentHighlights.map((hl: any, idx: number) => (
                                <FadeSection key={idx} delay={idx * 100}>
                                    <div className="rounded-2xl bg-white shadow-sm p-6 border border-gray-100 hover:border-brand-blue/30 transition-colors">
                                        <h3 className="text-lg font-semibold text-gray-900">{hl.title}</h3>
                                        <p className="mt-2 text-gray-600">{hl.description}</p>
                                    </div>
                                </FadeSection>
                            ))}
                        </div>
                     </div>
                     <div className="order-1 lg:order-2">
                         <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-100 transform hover:scale-[1.01] transition-transform duration-500">
                             <img 
                                className="w-full object-cover" 
                                src={content.paymentImage} 
                                alt="Pagamento Integrado"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/600x400?text=Pagamento';
                                    e.currentTarget.onerror = null;
                                }}
                             />
                         </div>
                     </div>
                </div>
             </section>

             {/* Integrations Section */}
             <section className="py-16 sm:py-24 bg-white">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <p className="text-sm uppercase tracking-widest text-brand-blue font-semibold">{content.integrationSubtitle}</p>
                        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">{content.integrationTitle}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {content.integrations.map((item: any, idx: number) => (
                             <FadeSection key={idx} delay={idx * 100}>
                                <article className="rounded-3xl border border-gray-100 p-8 shadow-sm bg-white hover:shadow-lg transition-shadow h-full flex flex-col">
                                    <span className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue font-bold mb-6 text-lg">
                                        {item.badge}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                </article>
                             </FadeSection>
                        ))}
                    </div>
                 </div>
             </section>

             {/* Table/Auto Service */}
            <section className="py-16 sm:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                         <p className="text-sm uppercase tracking-widest text-brand-blue font-semibold">Autoatendimento</p>
                        <h2 className="mt-4 text-3xl font-bold text-gray-900">{content.tableTitle}</h2>
                        <p className="mt-4 text-gray-600 text-lg leading-relaxed">{content.tableText}</p>
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-gray-100">
                        <img 
                            className="w-full object-cover" 
                            src={content.tableImage} 
                            alt="Pedidos na Mesa" 
                            onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/600x400?text=Autoatendimento';
                                e.currentTarget.onerror = null;
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* WhatsApp Section */}
            <section className="py-16 sm:py-24 bg-gray-900 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-sm uppercase tracking-widest text-white/70 font-semibold">WhatsApp Business</p>
                        <h2 className="mt-4 text-3xl font-bold">{content.whatsappTitle}</h2>
                        <p className="mt-4 text-white/80 text-lg leading-relaxed">{content.whatsappText}</p>
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative group">
                        <div className="absolute inset-0 bg-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         <img 
                            className="w-full object-cover" 
                            src={content.whatsappImage} 
                            alt="WhatsApp" 
                            onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/600x400?text=WhatsApp';
                                e.currentTarget.onerror = null;
                            }}
                         />
                    </div>
                </div>
            </section>

            {/* Trends Section */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[2.5rem] p-10 sm:p-16 text-white overflow-hidden relative">
                         {/* Background abstract elements */}
                         <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 blur-3xl rounded-full -mr-20 -mt-20"></div>
                         <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full -ml-20 -mb-20"></div>

                         <div className="relative z-10 max-w-4xl">
                            <p className="text-sm uppercase tracking-[0.3em] text-white/60 font-semibold">{content.trendsTitle}</p>
                            <h2 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight">Tecnologias que já aplicamos hoje</h2>
                            
                            <div className="mt-12 space-y-6">
                                {content.trendsList.map((trend: string, idx: number) => (
                                    <div key={idx} className="flex items-start gap-6 group">
                                        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white font-bold border border-white/10 group-hover:bg-brand-blue group-hover:border-brand-blue transition-colors">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <p className="text-white/90 text-lg pt-2 border-b border-white/10 pb-6 w-full group-hover:text-white transition-colors">
                                            {trend}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-12">
                                <a
                                    className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-white text-gray-900 font-bold hover:bg-gray-100 transition-all transform hover:translate-x-1"
                                    href="https://api.whatsapp.com/send?l=pt_BR&phone=553193585185"
                                >
                                    {content.trendsCta}
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </a>
                            </div>
                         </div>
                    </div>
                </div>
            </section>
        </>
    );
};