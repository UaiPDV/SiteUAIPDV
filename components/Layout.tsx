import React, { useState, useEffect } from 'react';
import { content } from '../data/content';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Layout = ({ children, onNavigate, currentPage }: LayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = content.common;

  // Logic to handle transparent navbar on Home page only
  const isTransparentNav = currentPage === 'home' && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
      onNavigate(page);
      setIsMobileMenuOpen(false);
      window.scrollTo(0, 0);
  };

  const navLinks = [
      { label: t.navHome, id: "home" },
      { label: t.navMobilidade, id: "mobilidade" },
      { label: t.navSolutions, id: "solutions" },
      { label: t.navVideos, id: "videos" },
      { label: t.navDelivery, id: "delivery" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          !isTransparentNav ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button onClick={() => handleNavClick('home')} className="flex items-center outline-none">
            <div className="bg-white w-12 h-12 rounded-full p-1 shadow-sm flex items-center justify-center border border-gray-200">
              <img 
                src="img/logo.png" 
                alt="UAI PDV" 
                className="h-full w-full object-contain"
                onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/100x100?text=UAI+PDV';
                    e.currentTarget.onerror = null;
                }} 
              />
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`font-medium transition-colors ${
                  !isTransparentNav 
                    ? `text-gray-900 hover:text-brand-blue ${currentPage === link.id ? 'text-brand-blue font-bold' : ''}` 
                    : 'text-white hover:text-gray-200'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Dropdown: Acesso */}
            <div className="relative group">
              <button
                className={`font-medium transition-colors flex items-center gap-1 ${
                    !isTransparentNav ? 'text-gray-900 hover:text-brand-blue' : 'text-white hover:text-gray-200'
                }`}
              >
                {t.navAccess}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className="absolute left-0 top-full pt-3 w-60 hidden group-hover:block hover:block">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-4 pb-2 pt-3 border-b border-gray-100">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">Portais</p>
                    </div>
                    <div className="py-2">
                        <a href="https://web.invoicy.com.br/login.aspx" target="_blank" rel="noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Acesso Fiscal</a>
                        <a href="http://webmail.uaipdv.com.br/" target="_blank" rel="noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Web Mail</a>
                        <a href="http://uai.tabletcloud.com.br/" target="_blank" rel="noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Acesso Gerencial</a>
                    </div>
                  </div>
              </div>
            </div>

             {/* Dropdown: Segmentos */}
             <div className="relative group">
              <button
                 className={`font-medium transition-colors flex items-center gap-1 ${
                    !isTransparentNav ? 'text-gray-900 hover:text-brand-blue' : 'text-white hover:text-gray-200'
                }`}
              >
                {t.navSegments}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className="absolute left-0 top-full pt-3 w-60 hidden group-hover:block hover:block">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-4 pb-2 pt-3 border-b border-gray-100">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">Setores</p>
                    </div>
                    <div className="py-2">
                        <button onClick={() => handleNavClick('segmento-bar-restaurante')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bar e Restaurante</button>
                        <button onClick={() => handleNavClick('segmento-distribuidora')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Distribuidora</button>
                        <button onClick={() => handleNavClick('segmento-hortifruti')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hortifruti</button>
                        <button onClick={() => handleNavClick('segmento-eventos-festas')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Eventos e Festas</button>
                    </div>
                  </div>
              </div>
            </div>

            <a
              href="#"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-brand-blue hover:bg-brand-blue-dark transition-colors"
            >
              {t.navCta}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`transition-colors ${!isTransparentNav ? 'text-gray-900' : 'text-white'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Nav Panel */}
      <div className={`fixed inset-0 z-50 ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} 
            onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <span className="text-sm font-semibold text-gray-900">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-base font-medium text-gray-900">
                <div className="space-y-3">
                    {navLinks.map(link => (
                         <button key={link.id} onClick={() => handleNavClick(link.id)} className="block w-full text-left">{link.label}</button>
                    ))}
                </div>
                <div>
                     <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400 mb-3">Acesso</p>
                     <div className="space-y-2">
                        <a href="https://web.invoicy.com.br/login.aspx" className="block text-sm text-gray-600">Acesso Fiscal</a>
                        <a href="http://webmail.uaipdv.com.br/" className="block text-sm text-gray-600">Web Mail</a>
                     </div>
                </div>
                <div>
                     <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400 mb-3">Segmentos</p>
                     <div className="space-y-2">
                        <button onClick={() => handleNavClick('segmento-bar-restaurante')} className="block w-full text-left text-sm text-gray-600">Bar e Restaurante</button>
                        <button onClick={() => handleNavClick('segmento-distribuidora')} className="block w-full text-left text-sm text-gray-600">Distribuidora</button>
                        <button onClick={() => handleNavClick('segmento-hortifruti')} className="block w-full text-left text-sm text-gray-600">Hortifruti</button>
                        <button onClick={() => handleNavClick('segmento-eventos-festas')} className="block w-full text-left text-sm text-gray-600">Eventos e Festas</button>
                     </div>
                </div>
            </nav>
            <div className="border-t border-gray-100 px-6 py-5">
                <a href="#" className="flex items-center justify-center w-full px-4 py-3 rounded-full bg-brand-blue text-white text-sm font-semibold shadow-sm hover:bg-brand-blue-dark">
                    {t.navCta}
                </a>
            </div>
        </div>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">{t.footerText}</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
             <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
             </a>
             <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" clipRule="evenodd" /></svg>
             </a>
          </div>
        </div>
      </footer>
    </div>
  );
};