import React, { useEffect } from 'react';
import { Home, Key, FileText, TrendingUp } from 'lucide-react';
import './InfoPages.css';

const Services = () => {
  useEffect(() => {
    document.title = "Nuestros Servicios | La Serena Propiedades";
  }, []);

  const services = [
    {
      icon: <Home size={40} className="service-icon" />,
      title: "Corretaje de Propiedades",
      description: "Gestionamos la venta y arriendo de su propiedad. Nos encargamos de la promoción, visitas, selección de clientes y redacción de contratos, asegurando un proceso rápido y seguro."
    },
    {
      icon: <Key size={40} className="service-icon" />,
      title: "Administración de Arriendos",
      description: "Relájese y deje su inversión en nuestras manos. Nos encargamos del cobro de rentas, pago de contribuciones, mantenciones y la relación directa con el arrendatario."
    },
    {
      icon: <FileText size={40} className="service-icon" />,
      title: "Asesoría Legal Inmobiliaria",
      description: "Contamos con abogados especialistas para el estudio de títulos, redacción de escrituras, promesas de compraventa y resolución de conflictos legales."
    },
    {
      icon: <TrendingUp size={40} className="service-icon" />,
      title: "Tasaciones Comerciales",
      description: "Determinamos el valor real de mercado de su propiedad mediante un análisis técnico y comparativo, fundamental para fijar un precio de venta competitivo."
    }
  ];

  return (
    <div className="info-page">
      <div className="info-hero">
        <div className="container">
          <h1 className="info-title">Nuestros Servicios</h1>
          <p className="info-subtitle">Soluciones integrales para todas sus necesidades inmobiliarias.</p>
        </div>
      </div>
      
      <div className="container info-content">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-box">
              {service.icon}
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
