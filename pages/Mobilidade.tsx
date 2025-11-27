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

export const Mobilidade = ({ content }: { content: any }) => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative isolate overflow-hidden py-24 sm:py-32 bg-gray-950 text-white">
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="text-sm uppercase tracking-[0.3em] text-white/70">{content.heroKicker}</p>
                        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">{content.heroTitle}</h1>
                        <p className="mt-6 text-lg sm:text-xl text-white/80">{content.heroSubtitle}</p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <a
                                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-brand-blue text-white font-semibold hover:bg-brand-blue-dark transition"
                                href="https://api.whatsapp.com/send?l=pt_BR&phone=553193585185"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {content.heroPrimaryCta}
                            </a>
                             <a
                                className="inline-flex items-center justify-center rounded-full px-6 py-3 border border-white/40 text-white font-semibold hover:bg-white/10 transition"
                                href="#"
                                onClick={(e) => { e.preventDefault(); /* Handle navigation if needed */ }}
                            >
                                {content.heroSecondaryCta}
                            </a>
                        </div>

                        {/* Platform Icons */}
                        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-8">
                            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity select-none cursor-default">
                                <img 
                                    src="img/solucao/img-down-windows.svg" 
                                    alt="Windows" 
                                    className="h-8 w-8" 
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/50x50?text=Win';
                                        e.currentTarget.onerror = null;
                                    }}
                                />
                                <span className="text-sm font-medium">Windows</span>
                            </div>
                            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity select-none cursor-default">
                                <img 
                                    src="img/solucao/img-down-android.svg" 
                                    alt="Play Store" 
                                    className="h-8 w-8" 
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/50x50?text=And';
                                        e.currentTarget.onerror = null;
                                    }}
                                />
                                <span className="text-sm font-medium">Play Store</span>
                            </div>
                            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity select-none cursor-default">
                                <img 
                                    src="img/solucao/img-down-ios.svg" 
                                    alt="App Store" 
                                    className="h-8 w-8" 
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/50x50?text=iOS';
                                        e.currentTarget.onerror = null;
                                    }}
                                />
                                <span className="text-sm font-medium">App Store</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Autonomy Section (Gradient) */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-10 text-white">
                        <div className="max-w-2xl">
                             <p className="text-sm uppercase tracking-[0.3em] text-white/60">{content.autonomyTitle}</p>
                             <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">{content.autonomySubtitle}</h2>
                        </div>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {content.autonomy.map((feature: any, idx: number) => (
                                <FadeSection key={idx} delay={idx * 100}>
                                     <article className="bg-white/10 rounded-3xl p-6 backdrop-blur border border-white/10">
                                        <div className="rounded-2xl overflow-hidden bg-white/5 mb-4">
                                            <img 
                                                src={feature.image} 
                                                alt={feature.title} 
                                                className="w-full h-48 object-contain mix-blend-screen" 
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://placehold.co/400x300?text=Autonomia';
                                                    e.currentTarget.onerror = null;
                                                }}
                                            />
                                        </div>
                                        <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                                        <p className="mt-3 text-white/80">{feature.description}</p>
                                     </article>
                                </FadeSection>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlight Section (Mini PDV) */}
            <section className="py-16 sm:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-sm uppercase tracking-widest text-brand-blue">{content.highlightKicker}</p>
                        <h2 className="mt-4 text-3xl sm:text-4xl font-bold">{content.highlightTitle}</h2>
                        <p className="mt-6 text-gray-600">{content.highlightText}</p>
                        <div className="mt-8">
                            <a
                                className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-brand-blue text-white font-semibold hover:bg-brand-blue-dark transition"
                                href="#"
                                target="_blank"
                                rel="noopener"
                            >
                                {content.highlightCta}
                            </a>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 blur-3xl bg-brand-blue/20 -z-10"></div>
                        <div className="rounded-3xl bg-white shadow-2xl p-6">
                            <img
                                className="w-full rounded-2xl object-cover"
                                alt="Mini PDV"
                                src={content.highlightImage}
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/600x400?text=Mini+PDV';
                                    e.currentTarget.onerror = null;
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Chatbot Section */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-sm uppercase tracking-widest text-brand-blue">Chatbot</p>
                        <h2 className="mt-4 text-3xl font-bold">{content.chatbotTitle}</h2>
                        <p className="mt-6 text-gray-600">{content.chatbotText}</p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 blur-3xl bg-brand-blue/20 -z-10"></div>
                        <div className="rounded-3xl bg-gray-50 p-6 shadow-2xl">
                            <img
                                className="w-full rounded-2xl object-contain"
                                alt="Chatbot"
                                src={content.chatbotImage}
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/400x400?text=Chatbot';
                                    e.currentTarget.onerror = null;
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

             {/* Indoor Media Section */}
            <section className="py-16 sm:py-24 bg-gray-900 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-sm uppercase tracking-widest text-white/70">Comunicação visual</p>
                        <h2 className="mt-4 text-3xl font-bold">{content.indoorTitle}</h2>
                        <p className="mt-6 text-white/80">{content.indoorText}</p>
                        <a
                            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 bg-white text-gray-900 font-semibold hover:bg-gray-100 transition"
                            href="https://api.whatsapp.com/send?l=pt_BR&phone=553193585185"
                            target="_blank"
                            rel="noopener"
                        >
                            {content.indoorCta}
                        </a>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 blur-3xl bg-white/10 -z-10"></div>
                        <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                            <img
                                className="w-full h-full object-cover"
                                alt="Mídia indoor"
                                src={content.indoorImage}
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/600x400?text=M%C3%ADdia+Indoor';
                                    e.currentTarget.onerror = null;
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};