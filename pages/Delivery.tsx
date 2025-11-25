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

export const Delivery = ({ content }: { content: any }) => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative py-24 sm:py-32 bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-blue/20 to-transparent"></div>
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-2xl">
                            <span className="inline-block py-1 px-3 rounded-full bg-brand-blue/20 text-brand-blue text-sm font-bold mb-6 border border-brand-blue/30">
                                NOVIDADE
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                {content.heroTitle}
                            </h1>
                            <p className="text-lg text-white/80 mb-8 leading-relaxed">
                                {content.heroSubtitle}
                            </p>
                            <a href="#" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-brand-blue text-white font-bold hover:bg-brand-blue-dark transition-all transform hover:scale-105 shadow-lg shadow-brand-blue/30">
                                {content.heroCta}
                            </a>
                        </div>
                        <div className="relative lg:ml-auto">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 rotate-2 hover:rotate-0 transition-transform duration-500">
                                <img 
                                    src={content.heroImage} 
                                    alt="Delivery Dashboard" 
                                    className="w-full object-cover" 
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/800x600?text=Delivery+Dashboard';
                                        e.currentTarget.onerror = null;
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">{content.featuresTitle}</h2>
                        <p className="mt-4 text-gray-600">Ferramentas essenciais para você vender mais e entregar mais rápido.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {content.features.map((feature: any, idx: number) => (
                            <FadeSection key={idx} delay={idx * 100}>
                                <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-lg transition-shadow hover:border-brand-blue/20 group h-full">
                                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                            </FadeSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integration Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
                        <div className="grid lg:grid-cols-2">
                            <div className="p-10 lg:p-16 flex flex-col justify-center">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.integrationsTitle}</h2>
                                <p className="text-lg text-gray-600 mb-8">{content.integrationsText}</p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">✓</span>
                                        iFood e Rappi
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">✓</span>
                                        WhatsApp Business
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">✓</span>
                                        Entregadores Próprios
                                    </li>
                                </ul>
                            </div>
                            <div className="relative min-h-[300px] lg:min-h-full">
                                <img 
                                    src={content.integrationImage} 
                                    alt="Integrações" 
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/800x600?text=Integra%C3%A7%C3%B5es';
                                        e.currentTarget.onerror = null;
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};