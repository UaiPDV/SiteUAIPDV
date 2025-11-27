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

const icons: Record<string, React.ReactNode> = {
    sales: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 15h6M4 6h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" />
        </svg>
    ),
    stock: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h12M9 3v2m4 6h8m-4-2v2m-4 6h8m-4-2v2m-4 6h8m-4-2v2M3 9h12M3 13h12M3 17h12" />
        </svg>
    ),
    mobile: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h10M7 11h10M7 15h5m7-8v10a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h10" />
        </svg>
    ),
    payment: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8V4m0 0L9 7m3-3 3 3m0 5 3-3m-3 3-3-3m0 9v-4m0 4-3-3m3 3 3-3M3 7h6m-6 4h6m-6 4h6" />
        </svg>
    ),
    cloud: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10m16-7v7M8 7v10m8-5v5" />
        </svg>
    ),
    security: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    )
};

export const SegmentoBarRestaurante = ({ content }: { content: any }) => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative isolate overflow-hidden bg-gray-900 text-white">
                <div className="absolute inset-0">
                    <img
                        src={content.hero.bgImage}
                        alt="Atendimento em restaurante"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/1920x1080?text=Bar+e+Restaurante';
                            e.currentTarget.onerror = null;
                        }}
                    />
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>
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
                            className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-white text-gray-900 font-semibold shadow-lg shadow-black/30 hover:bg-gray-100 transition"
                            target="_blank"
                            rel="noreferrer"
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

            {/* Solution Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.35em] text-brand-blue">
                            {content.solution.kicker}
                        </p>
                        <h2 className="mt-4 text-3xl font-semibold text-gray-900">
                            {content.solution.title}
                        </h2>
                        <p className="mt-4 text-gray-600">
                            {content.solution.text}
                        </p>
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {content.solution.cards.map((card: any, idx: number) => (
                            <FadeSection key={idx} delay={idx * 50}>
                                <article className="rounded-3xl border border-gray-200 p-6 shadow-sm h-full">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                                        {icons[card.iconType]}
                                    </span>
                                    <h3 className="mt-4 text-xl font-semibold text-gray-900">
                                        {card.title}
                                    </h3>
                                    <p className="mt-2 text-gray-600">
                                        {card.desc}
                                    </p>
                                </article>
                            </FadeSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Management Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="rounded-3xl bg-white p-10 shadow-xl shadow-gray-200/70">
                            <h2 className="text-3xl font-semibold text-gray-900">
                                {content.management.title}
                            </h2>
                            <p className="mt-4 text-gray-600">
                                {content.management.text}
                            </p>
                            <a
                                href="https://api.whatsapp.com/send?l=pt_BR&phone=553193585185"
                                className="mt-8 inline-flex rounded-full bg-brand-blue px-6 py-3 text-white font-semibold hover:bg-brand-blue-dark transition"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {content.management.cta}
                            </a>
                        </div>
                        <div className="grid gap-6">
                            <img
                                src={content.management.image1}
                                alt="Caixa integrado ao POS"
                                className="rounded-3xl border border-white shadow-lg"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/600x400?text=Gest%C3%A3o+1';
                                    e.currentTarget.onerror = null;
                                }}
                            />
                            <img
                                src={content.management.image2}
                                alt="Integração com diversos dispositivos"
                                className="rounded-3xl border border-white shadow-lg"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/600x400?text=Gest%C3%A3o+2';
                                    e.currentTarget.onerror = null;
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Connected Processes */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900">
                                {content.processes.title}
                            </h3>
                            <p className="mt-4 text-gray-600">
                                {content.processes.text}
                            </p>
                        </div>
                        
                        {/* Splitting the steps into two columns for the grid layout */}
                        <ul className="space-y-6">
                            {content.processes.steps.slice(0, 3).map((step: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <div className="mt-1 h-10 w-10 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-semibold flex-shrink-0">
                                        {step.number}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            {step.title}
                                        </h4>
                                        <p className="text-gray-600">
                                            {step.text}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <ul className="space-y-6">
                            {content.processes.steps.slice(3, 6).map((step: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <div className="mt-1 h-10 w-10 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-semibold flex-shrink-0">
                                        {step.number}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            {step.title}
                                        </h4>
                                        <p className="text-gray-600">
                                            {step.text}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Equipment Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto">
                        <p className="text-xs uppercase tracking-[0.35em] text-brand-blue">
                            {content.equipment.kicker}
                        </p>
                        <h2 className="mt-4 text-3xl font-semibold text-gray-900">
                            {content.equipment.title}
                        </h2>
                        <p className="mt-4 text-gray-600">
                            {content.equipment.text}
                        </p>
                    </div>
                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {content.equipment.cards.map((card: any, idx: number) => (
                            <FadeSection key={idx} delay={idx * 50}>
                                <article className="rounded-3xl border border-gray-200 p-6 bg-white shadow-sm h-full">
                                    <img
                                        src={card.img}
                                        alt={card.title}
                                        className="rounded-2xl w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://placehold.co/400x300?text=Equipamento';
                                            e.currentTarget.onerror = null;
                                        }}
                                    />
                                    <h3 className="mt-4 text-xl font-semibold text-gray-900">
                                        {card.title}
                                    </h3>
                                    <p className="mt-2 text-gray-600">
                                        {card.desc}
                                    </p>
                                </article>
                            </FadeSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Digital Sales */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-6">
                            <p className="text-xs uppercase tracking-[0.35em] text-brand-blue">
                                {content.digital.kicker}
                            </p>
                            <h2 className="text-3xl font-semibold text-gray-900">
                                {content.digital.title}
                            </h2>
                            <p className="text-gray-600">
                                {content.digital.text}
                            </p>
                            <div className="grid gap-6 sm:grid-cols-2">
                                {content.digital.features.map((feat: any, idx: number) => (
                                    <div key={idx} className="rounded-2xl border border-gray-200 p-5">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {feat.title}
                                        </h3>
                                        <p className="mt-2 text-gray-600">
                                            {feat.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-4">
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-2 font-semibold text-brand-blue hover:text-brand-blue-dark transition"
                                >
                                    {content.digital.cta}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="grid gap-6">
                            {content.digital.images.map((img: string, idx: number) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt="Vendas digitais"
                                    className="rounded-3xl border border-white shadow-lg"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/400x600?text=App+Vendas';
                                        e.currentTarget.onerror = null;
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Cloud Section */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                            {content.cloud.kicker}
                        </p>
                        <h2 className="mt-4 text-3xl font-semibold">
                            {content.cloud.title}
                        </h2>
                        <p className="mt-4 text-white/80">
                            {content.cloud.text}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            {content.cloud.tags.map((tag: string, idx: number) => (
                                <span key={idx} className="inline-flex items-center rounded-full border border-white/30 px-4 py-2 text-sm font-semibold">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <img
                        src={content.cloud.image}
                        alt="Equipe colaborando"
                        className="rounded-3xl shadow-2xl shadow-black/40 border border-white/10"
                        onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/600x400?text=Cloud+Team';
                            e.currentTarget.onerror = null;
                        }}
                    />
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto">
                        <p className="text-xs uppercase tracking-[0.35em] text-brand-blue">
                            {content.testimonials.kicker}
                        </p>
                        <h2 className="mt-4 text-3xl font-semibold text-gray-900">
                            {content.testimonials.title}
                        </h2>
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {content.testimonials.cards.map((card: any, idx: number) => (
                            <FadeSection key={idx} delay={idx * 100}>
                                <article className="rounded-3xl border border-gray-200 p-6 shadow-sm h-full">
                                    <p className="text-gray-700">
                                        {card.quote}
                                    </p>
                                    <h3 className="mt-6 text-lg font-semibold text-gray-900">
                                        {card.author}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {card.role}
                                    </p>
                                </article>
                            </FadeSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="rounded-3xl bg-white p-10 shadow-lg shadow-gray-200/80">
                            <h2 className="text-3xl font-semibold text-gray-900">
                                {content.finalCta.title}
                            </h2>
                            <p className="mt-4 text-gray-600">
                                {content.finalCta.text}
                            </p>
                            <ul className="mt-8 space-y-4">
                                {content.finalCta.steps.map((step: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="mt-1 h-5 w-5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                            {idx + 1}
                                        </span>
                                        <p className="text-gray-700">
                                            {step}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-3xl bg-brand-blue text-white p-10 shadow-xl">
                            <h3 className="text-2xl font-semibold">
                                {content.finalCta.cardTitle}
                            </h3>
                            <p className="mt-4 text-white/80">
                                {content.finalCta.cardText}
                            </p>
                            <div className="mt-8 space-y-4">
                                <a
                                    href="https://api.whatsapp.com/send?l=pt_BR&phone=553193585185"
                                    className="flex items-center justify-center rounded-full bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 transition"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {content.finalCta.buttons.whatsapp}
                                </a>
                                <a
                                    href="tel:553193585185"
                                    className="flex items-center justify-center rounded-full bg-white text-brand-blue px-6 py-3 font-semibold hover:bg-gray-100 transition"
                                >
                                    {content.finalCta.buttons.call}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};