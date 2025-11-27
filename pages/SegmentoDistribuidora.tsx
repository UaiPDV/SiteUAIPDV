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

export const SegmentoDistribuidora = ({ content }: { content: any }) => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative isolate overflow-hidden bg-gray-900 text-white">
                <img
                    src={content.hero.bgImage}
                    alt="Operação de distribuidora"
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/1920x1080?text=Distribuidora+Hero';
                        e.currentTarget.onerror = null;
                    }}
                />
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                        {content.hero.kicker}
                    </p>
                    <h1 className="mt-6 text-3xl sm:text-5xl font-bold leading-tight max-w-3xl">
                        {content.hero.title}
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-white/80">
                        {content.hero.subtitle}
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                        <a
                            href="https://api.whatsapp.com/send?l=pt_BR&phone=553193585185"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-white text-gray-900 font-semibold shadow-lg shadow-black/30 hover:bg-gray-100 transition"
                        >
                            {content.hero.ctaPrimary}
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center justify-center rounded-full px-6 py-3 border border-white/30 text-white font-semibold hover:bg-white/10 transition"
                        >
                            {content.hero.ctaSecondary}
                        </a>
                    </div>
                    <dl className="mt-12 grid gap-6 sm:grid-cols-3 text-white/80">
                        {content.hero.stats.map((stat: any, idx: number) => (
                            <div key={idx}>
                                <dt className="text-sm uppercase tracking-widest text-white/60">
                                    {stat.label}
                                </dt>
                                <dd className="mt-2 text-2xl font-semibold">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Hybrid System Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="text-xs uppercase tracking-[0.35em] text-brand-blue">
                            {content.hybrid.kicker}
                        </p>
                        <h2 className="mt-4 text-3xl font-semibold text-gray-900">
                            {content.hybrid.title}
                        </h2>
                        <p className="mt-4 text-gray-600">
                            {content.hybrid.description}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2">
                        {content.hybrid.cards.map((card: any, idx: number) => (
                            <FadeSection key={idx} delay={idx * 100}>
                                <article className="rounded-3xl bg-white p-8 shadow-lg shadow-gray-200/70 h-full">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="w-full rounded-2xl border border-gray-100"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://placehold.co/600x400?text=Sistema+Hibrido';
                                            e.currentTarget.onerror = null;
                                        }}
                                    />
                                    <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                                        {card.title}
                                    </h3>
                                    <p className="mt-4 text-gray-600">
                                        {card.description}
                                    </p>
                                    <a
                                        href="https://api.whatsapp.com/send?l=pt_BR&phone=553193585185"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 bg-brand-blue text-white font-semibold hover:bg-brand-blue-dark transition"
                                    >
                                        {card.cta}
                                    </a>
                                </article>
                            </FadeSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-gray-900 text-white p-10 shadow-2xl">
                        <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                            {content.pricing.kicker}
                        </p>
                        <h2 className="mt-6 text-3xl font-semibold">
                            {content.pricing.title}
                        </h2>
                        <p className="mt-4 text-white/80 max-w-3xl">
                            {content.pricing.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-2">
                        {content.features.map((feature: any, idx: number) => (
                            <FadeSection key={idx} delay={idx * 50}>
                                <div className="rounded-3xl bg-white p-8 shadow h-full">
                                    <p className="text-sm font-semibold text-brand-blue">
                                        {feature.number}
                                    </p>
                                    <h3 className="mt-3 text-2xl font-semibold text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-2 text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </FadeSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Parallax Background */}
            <section
                className="relative isolate h-64 md:h-80 bg-fixed bg-center bg-cover"
                style={{
                    backgroundImage: `url(${content.parallaxBg})`
                }}
            >
               <div className="absolute inset-0 bg-black/20"></div>
            </section>

            {/* Segments Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-3">
                        {content.segments.map((segment: any, idx: number) => (
                            <FadeSection key={idx} delay={idx * 100}>
                                <article className="rounded-3xl border border-gray-200 overflow-hidden h-full flex flex-col">
                                    <img
                                        src={segment.image}
                                        alt={segment.title}
                                        className="h-64 w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://placehold.co/400x300?text=Segmento';
                                            e.currentTarget.onerror = null;
                                        }}
                                    />
                                    <div className="p-6 text-center flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {segment.title}
                                        </h3>
                                        <p className="mt-2 text-gray-600">
                                            {segment.description}
                                        </p>
                                    </div>
                                </article>
                            </FadeSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Band */}
            <section className="py-16 bg-brand-blue text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold">
                            {content.ctaBand.title}
                        </h2>
                    </div>
                    <a
                        href="https://api.whatsapp.com/send?l=pt_BR&phone=553193585185"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-white text-brand-blue font-semibold hover:bg-gray-100 transition"
                    >
                        {content.ctaBand.cta}
                    </a>
                </div>
            </section>

            {/* Payment Integration */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.35em] text-brand-blue">
                            {content.payment.kicker}
                        </p>
                    </div>
                    <div className="mt-10 space-y-4">
                        {content.payment.accordions.map((acc: any, idx: number) => (
                            <details key={idx} className="rounded-3xl border border-gray-200 bg-white p-6 group" open={idx === 0}>
                                <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-gray-900 outline-none marker:content-none list-none">
                                    <span>{acc.title}</span>
                                    <span className="text-brand-blue transform group-open:rotate-180 transition-transform">
                                        &#x25BC;
                                    </span>
                                </summary>
                                <p className="mt-4 text-gray-600">
                                    {acc.description}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Equipment - Mini PDV */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-10">
                        {content.equipment.miniPdv.title}
                    </h2>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {content.equipment.miniPdv.cards.map((card: any, idx: number) => (
                            <div key={idx} className="rounded-3xl bg-white p-8 shadow h-full flex flex-col">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {card.title}
                                </h3>
                                <p className="mt-2 text-gray-600 flex-1">
                                    {card.desc}
                                </p>
                                <img
                                    src={card.img}
                                    alt={card.title}
                                    className="mt-6 h-64 w-full rounded-2xl object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/300x400?text=Mini+PDV';
                                        e.currentTarget.onerror = null;
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Equipment - PC */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-10">
                        {content.equipment.pc.title}
                    </h2>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {content.equipment.pc.cards.map((card: any, idx: number) => {
                            if (card.type === 'info') {
                                return (
                                    <div key={idx} className="rounded-3xl bg-gray-900 text-white p-8 shadow h-full flex flex-col justify-center">
                                        <h3 className="text-xl font-semibold">{card.title}</h3>
                                        <p className="mt-2 text-white/80">{card.desc}</p>
                                    </div>
                                );
                            } else if (card.type === 'image') {
                                return (
                                    <div key={idx} className="rounded-3xl bg-white p-8 shadow h-full">
                                        <img
                                            src={card.img}
                                            alt="PC"
                                            className="h-64 w-full rounded-2xl object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://placehold.co/300x400?text=PC';
                                                e.currentTarget.onerror = null;
                                            }}
                                        />
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={idx} className="rounded-3xl bg-white p-8 shadow h-full flex flex-col justify-center">
                                        <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
                                        <p className="mt-2 text-gray-600">{card.desc}</p>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </section>

            {/* Equipment - POS */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-10">
                        {content.equipment.pos.title}
                    </h2>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {content.equipment.pos.cards.map((card: any, idx: number) => {
                             if (card.type === 'text') {
                                return (
                                    <div key={idx} className="rounded-3xl bg-white p-8 shadow h-full flex flex-col justify-center">
                                        <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
                                        <p className="mt-2 text-gray-600">{card.desc}</p>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={idx} className="rounded-3xl bg-white p-8 shadow h-full text-center">
                                        <img
                                            src={card.img}
                                            alt="POS"
                                            className={`mx-auto h-64 ${card.fit === 'contain' ? 'object-contain' : 'object-cover rounded-2xl'}`}
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://placehold.co/300x400?text=POS';
                                                e.currentTarget.onerror = null;
                                            }}
                                        />
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </section>

            {/* Partners */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold text-gray-900">
                            {content.partners.title}
                        </h2>
                        <p className="mt-4 text-gray-600">
                            {content.partners.description}
                        </p>
                    </div>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {content.partners.logos.map((logo: string, idx: number) => (
                            <div key={idx} className="rounded-3xl border border-gray-200 p-6 flex items-center justify-center hover:border-brand-blue/30 transition-colors">
                                <img
                                    src={logo}
                                    alt={`Parceiro ${idx + 1}`}
                                    className="h-16 object-contain"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/150x80?text=Logo';
                                        e.currentTarget.onerror = null;
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};