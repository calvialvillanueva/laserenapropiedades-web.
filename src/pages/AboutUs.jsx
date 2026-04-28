import React, { useEffect } from 'react';
import './InfoPages.css';

const AboutUs = () => {
  useEffect(() => {
    document.title = "Quiénes Somos | La Serena Propiedades";
  }, []);

  return (
    <div className="info-page">
      <div className="info-hero">
        <div className="container">
          <h1 className="info-title">Nuestra Historia</h1>
          <p className="info-subtitle">Más de dos décadas conectando familias con sus hogares ideales en la Cuarta Región.</p>
        </div>
      </div>
      
      <div className="container info-content">
        <div className="info-section">
          <h2>Trayectoria y Compromiso</h2>
          <p>
            <strong>La Serena Propiedades</strong> es una empresa familiar nacida en el año 1999. Desde nuestros inicios, nos hemos dedicado a ofrecer un servicio cercano, transparente y altamente profesional en el mercado inmobiliario de la Región de Coquimbo.
          </p>
          <p>
            Buscamos siempre mejorar nuestros servicios, apoyados por un equipo de profesionales capacitados para otorgar la atención y los resultados que usted merece. Conocemos cada rincón de La Serena, Coquimbo y sus alrededores, lo que nos permite asesorar con exactitud y conocimiento de causa.
          </p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>Nuestra Misión</h3>
            <p>Brindar un servicio integral de corretaje de propiedades, priorizando la seguridad y confianza de nuestros clientes, facilitando procesos que muchas veces pueden resultar complejos.</p>
          </div>
          <div className="info-card">
            <h3>Nuestra Visión</h3>
            <p>Consolidarnos como la corredora de propiedades líder y más confiable de la IV Región, destacando por nuestra ética, modernización constante y calidad humana.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
