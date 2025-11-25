import React, { useState } from 'react';
import { content } from './data/content';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Mobilidade } from './pages/Mobilidade';
import { Solutions } from './pages/Solutions';
import { Videos } from './pages/Videos';
import { Delivery } from './pages/Delivery';
import { SegmentoBarRestaurante } from './pages/SegmentoBarRestaurante';
import { SegmentoDistribuidora } from './pages/SegmentoDistribuidora';
import { SegmentoHortifruti } from './pages/SegmentoHortifruti';
import { SegmentoEventos } from './pages/SegmentoEventos';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
      switch(currentPage) {
          case 'home': return <Home content={content.home} />;
          case 'mobilidade': return <Mobilidade content={content.mobilidade} />;
          case 'solutions': return <Solutions content={content.solutions} />;
          case 'videos': return <Videos content={content.videos} />;
          case 'delivery': return <Delivery content={content.delivery} />;
          case 'segmento-bar-restaurante': return <SegmentoBarRestaurante content={content.segmentoBarRestaurante} />;
          case 'segmento-distribuidora': return <SegmentoDistribuidora content={content.segmentoDistribuidora} />;
          case 'segmento-hortifruti': return <SegmentoHortifruti content={content.segmentoHortifruti} />;
          case 'segmento-eventos-festas': return <SegmentoEventos content={content.segmentoEventos} />;
          default: return <Home content={content.home} />;
      }
  };

  return (
    <Layout onNavigate={setCurrentPage} currentPage={currentPage}>
      {renderPage()}
    </Layout>
  );
}