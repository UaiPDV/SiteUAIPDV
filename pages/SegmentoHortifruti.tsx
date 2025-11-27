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

export const SegmentoHortifruti = ({ content }: { content: any }) => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative isolate overflow-hidden bg-gray-900 text-white">
                <div className="absolute inset-0">
                    <img 
                        src={content.hero.bgImage} 
                        alt="Hortifruti Background" 
                        className="h-full w-full object-cover opacity-60"
                        onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/1920x1080?text=Hero+Hortifruti';
                            e.currentTarget.onerror = null;
                        }}
                    />
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-white/70">
                                {content.hero.kicker}
                            </p>
                            <h1 className="mt-6 text-3xl sm:text-5xl font-bold leading-tight">
                                {content.hero.title}
                            </h1>
                            <p className="mt-6 text-lg text-white/80">
                                {content.hero.subtitle}
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
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
                        <div className="relative">
                            <div className="rounded-3xl bg-white/10 backdrop-blur border border-white/20 p-6 shadow-2xl">
                                <img 
                                    src={content.hero.deviceImage} 
                                    alt="Equipamentos para hortifruti" 
                                    className="mx-auto max-h-[420px] w-full object-contain"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/600x400?text=Device+Hortifruti';
                                        e.currentTarget.onerror = null;
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-brand-blue">
                                {content.overview.highlight}
                            </p>
                            <h2 className="mt-4 text-3xl font-semibold text-gray-900">
                                {content.overview.title}
                            </h2>
                            <p className="mt-4 text-gray-600">
                                {content.overview.description}
                            </p>
                            <ul className="mt-6 space-y-4 text-gray-700">
                                {content.overview.bullets.map((bullet: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        </span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div className="rounded-3xl bg-gray-50 p-6 shadow-inner">
                                <img 
                                    src={content.overview.image} 
                                    alt="PDV Completo" 
                                    className="w-full rounded-2xl object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/600x400?text=Overview';
                                        e.currentTarget.onerror = null;
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-sm uppercase tracking-[0.35em] text-brand-blue">
                        {content.features.kicker}
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold text-gray-900">
                        {content.features.title}
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-3xl">
                        {content.features.description}
                    </p>
                    <div className="mt-10 grid gap-8 md:grid-cols-2">
                        {content.features.cards.map((card: any, idx: number) => (
                            <FadeSection key={idx} delay={idx * 50}>
                                <article className="rounded-3xl bg-white p-8 shadow h-full">
                                    <img 
                                        src={card.img} 
                                        alt={card.title} 
                                        className="h-56 w-full rounded-2xl object-contain bg-gray-50 mb-6"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://placehold.co/400x300?text=Feature';
                                            e.currentTarget.onerror = null;
                                        }}
                                    />
                                    <h3 className="text-2xl font-semibold text-gray-900">
                                        {card.title}
                                    </h3>
                                    <p className="mt-3 text-gray-600">
                                        {card.desc}
                                    </p>
                                </article>
                            </FadeSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.35em] text-brand-blue">
                            {content.demo.kicker}
                        </p>
                        <p className="mt-4 text-3xl font-semibold text-gray-900">
                            {content.demo.title}
                        </p>
                    </div>
                    <div className="mt-10 grid gap-8 md:grid-cols-2">
                        {content.demo.cards.map((card: any, idx: number) => (
                            <FadeSection key={idx} delay={idx * 50}>
                                <article className="rounded-3xl border border-gray-200 p-6 shadow-sm h-full flex flex-col">
                                    <div className="rounded-2xl bg-gray-50 p-6 mb-6 flex-grow">
                                        <img 
                                            src={card.img} 
                                            alt={card.title} 
                                            className="h-64 w-full object-contain"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://placehold.co/400x300?text=Demo';
                                                e.currentTarget.onerror = null;
                                            }}
                                        />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-900">
                                        {card.title}
                                    </h3>
                                    <p className="mt-3 text-gray-600 mb-6">
                                        {card.desc}
                                    </p>
                                    <a 
                                        href={card.link} 
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`mt-auto inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition ${idx === 0 ? 'bg-brand-blue text-white hover:bg-brand-blue-dark' : 'border border-gray-300 text-gray-900 hover:bg-gray-50'}`}
                                    >
                                        {card.cta}
                                    </a>
                                </article>
                            </FadeSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reasons Section */}
            <section className="py-20 bg-brand-blue text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-semibold">
                        {content.reasons.title}
                    </h2>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {content.reasons.items.map((item: any, idx: number) => (
                            <FadeSection key={idx} delay={idx * 100}>
                                <article className="rounded-3xl bg-white/10 p-6 backdrop-blur h-full border border-white/10">
                                    <p className="text-sm font-semibold text-white/80">
                                        {item.label}
                                    </p>
                                    <h3 className="mt-2 text-2xl font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-white/80">
                                        {item.desc}
                                    </p>
                                </article>
                            </FadeSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modules Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.35em] text-brand-blue">
                            {content.modules.kicker}
                        </p>
                        <h2 className="mt-4 text-3xl font-semibold text-gray-900">
                            {content.modules.title}
                        </h2>
                        <p className="mt-4 text-gray-600">
                            {content.modules.subtitle}
                        </p>
                    </div>
                    <div className="mt-10 grid gap-8 md:grid-cols-3">
                        {content.modules.cards.map((card: any, idx: number) => (
                            <FadeSection key={idx} delay={idx * 50}>
                                <article className="rounded-3xl border border-gray-200 p-6 text-center h-full hover:border-brand-blue/30 transition-colors">
                                    <img 
                                        src={card.img} 
                                        alt={card.title} 
                                        className="mx-auto h-40 w-full rounded-2xl object-cover mb-6"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://placehold.co/300x200?text=Module';
                                            e.currentTarget.onerror = null;
                                        }}
                                    />
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {card.title}
                                    </h3>
                                    <p className="mt-3 text-gray-600">
                                        {card.desc}
                                    </p>
                                </article>
                            </FadeSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cloud Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-brand-blue">
                                {content.cloud.kicker}
                            </p>
                            <h2 className="mt-4 text-3xl font-semibold text-gray-900">
                                {content.cloud.title}
                            </h2>
                            <p className="mt-4 text-gray-600">
                                {content.cloud.description}
                            </p>
                        </div>
                        <div className="rounded-3xl bg-white p-6 shadow">
                            <img 
                                src={content.cloud.image} 
                                alt="Gestão em nuvem" 
                                className="w-full rounded-2xl object-contain"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/600x400?text=Cloud+Mgmt';
                                    e.currentTarget.onerror = null;
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-semibold text-gray-900">
                            {content.contact.title}
                        </h2>
                        <p className="mt-4 text-gray-600">
                            {content.contact.description}
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <a
                                href="https://api.whatsapp.com/send?l=pt_BR&phone=553193585185"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-brand-blue text-white font-semibold hover:bg-brand-blue-dark transition"
                            >
                                {content.contact.ctaPrimary}
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center justify-center rounded-full px-6 py-3 border border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition"
                            >
                                {content.contact.ctaSecondary}
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {content.contact.cards.map((card: any, idx: number) => (
                            <a 
                                key={idx} 
                                href={card.link}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-3xl border border-gray-200 p-6 text-center hover:border-brand-blue transition group"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-brand-blue">
                                    {card.title}
                                </h3>
                                <p className="mt-3 text-gray-600">
                                    {card.desc}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};