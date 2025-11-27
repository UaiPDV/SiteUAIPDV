
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

            {/* Financial Comparison Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">{content.financialComparison.title}</h2>
                        <p className="mt-4 text-gray-600">{content.financialComparison.subtitle}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Marketplace Card */}
                        <FadeSection delay={0}>
                            <div className="bg-white rounded-3xl p-8 border border-red-100 shadow-sm relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-4 -mt-4"></div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10">{content.financialComparison.marketplace.title}</h3>
                                <div className="text-red-500 font-bold text-4xl mb-1 relative z-10">{content.financialComparison.marketplace.fee}</div>
                                <p className="text-gray-500 text-sm mb-6 relative z-10">{content.financialComparison.marketplace.label}</p>
                                <ul className="space-y-3">
                                    {content.financialComparison.marketplace.cons.map((item: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3 text-gray-600">
                                            <span className="text-red-500 mt-0.5">✕</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeSection>

                        {/* UAI PDV Card */}
                        <FadeSection delay={100}>
                            <div className="bg-white rounded-3xl p-8 border-2 border-brand-blue shadow-xl relative overflow-hidden transform md:-translate-y-4 h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-bl-full -mr-8 -mt-8"></div>
                                <span className="absolute top-6 right-6 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full">RECOMENDADO</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10">{content.financialComparison.uaipdv.title}</h3>
                                <div className="text-brand-blue font-bold text-4xl mb-1 relative z-10">{content.financialComparison.uaipdv.fee}</div>
                                <p className="text-gray-500 text-sm mb-6 relative z-10">{content.financialComparison.uaipdv.label}</p>
                                <ul className="space-y-3">
                                    {content.financialComparison.uaipdv.pros.map((item: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3 text-gray-800 font-medium">
                                            <span className="text-green-500 mt-0.5">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeSection>
                    </div>
                </div>
            </section>

             {/* Marketing Tools Section */}
             <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                        <div>
                             <h2 className="text-3xl font-bold text-gray-900">{content.marketingTools.title}</h2>
                             <p className="mt-4 text-gray-600 text-lg">{content.marketingTools.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             {content.marketingTools.tools.map((tool: any, idx: number) => (
                                <FadeSection key={idx} delay={idx * 50}>
                                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-blue/30 transition-colors">
                                        <div className="text-3xl mb-3">{tool.icon}</div>
                                        <h3 className="font-bold text-gray-900 text-sm">{tool.title}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{tool.desc}</p>
                                    </div>
                                </FadeSection>
                             ))}
                        </div>
                     </div>
                </div>
            </section>

            {/* WhatsApp Automation Section */}
            <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
                 {/* Background decoration */}
                 <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                 <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                             <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider border border-green-500/30 mb-6">
                                {content.automation.badge}
                             </span>
                            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">{content.automation.title}</h2>
                            <p className="text-xl text-green-400 mt-2 font-medium">{content.automation.subtitle}</p>
                            <p className="mt-4 text-gray-300 leading-relaxed text-lg">
                                {content.automation.description}
                            </p>

                            <div className="mt-10 space-y-6">
                                {content.automation.messages.map((msg: any, idx: number) => (
                                    <FadeSection key={idx} delay={idx * 150}>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-900/50">
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                                </div>
                                            </div>
                                            <div className="bg-white/10 rounded-2xl rounded-tl-none p-4 border border-white/5 backdrop-blur-sm flex-1">
                                                <p className="text-xs text-green-400 font-bold uppercase mb-1 tracking-wide">{msg.status}</p>
                                                <p className="text-sm text-gray-200">{msg.text}</p>
                                            </div>
                                        </div>
                                    </FadeSection>
                                ))}
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                             <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gray-800">
                                <img 
                                    src={content.automation.image} 
                                    alt="WhatsApp Automation Interface" 
                                    className="w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/600x800/111827/FFF?text=WhatsApp+Automation+Preview';
                                        e.currentTarget.onerror = null;
                                    }} 
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">{content.faq.title}</h2>
                        <div className="space-y-4">
                            {content.faq.items.map((item: any, idx: number) => (
                                <details key={idx} className="group border border-gray-200 rounded-2xl bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                                        <h3 className="text-lg font-semibold">{item.question}</h3>
                                        <div className="white-circle bg-white p-1.5 rounded-full shadow-sm group-open:-rotate-180 transition-transform">
                                            <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </summary>
                                    <p className="mt-4 leading-relaxed text-gray-700">
                                        {item.answer}
                                    </p>
                                </details>
                            ))}
                        </div>
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
