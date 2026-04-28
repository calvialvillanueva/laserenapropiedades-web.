import React, { useEffect } from 'react';
import './InfoPages.css';

const FAQ = () => {
  useEffect(() => {
    document.title = "Preguntas Frecuentes | La Serena Propiedades";
  }, []);

  const faqs = [
    {
      q: "¿Cuáles son los requisitos para arrendar una propiedad?",
      a: "Generalmente solicitamos: 3 últimas liquidaciones de sueldo, certificado de cotizaciones de AFP (12 meses), Dicom Platinum 360, y que el sueldo líquido sea al menos 3 veces el valor del arriendo. En algunos casos se puede requerir un aval con los mismos antecedentes."
    },
    {
      q: "¿Qué comisión cobra la corredora por arriendo y venta?",
      a: "Por concepto de arriendo, la comisión es del 50% del valor de un mes de arriendo (se paga una sola vez). Por venta, la comisión estándar es del 2% del valor total de venta, aplicable tanto al comprador como al vendedor."
    },
    {
      q: "¿Cómo agendo una visita a una propiedad?",
      a: "Puedes agendar directamente desde nuestra página web usando el botón 'Agendar Visita' en la ficha de cada propiedad, o bien contactándonos a través de nuestro botón de WhatsApp indicando el código o enlace de la propiedad."
    },
    {
      q: "¿Dejan las propiedades reservadas si pago un adelanto?",
      a: "Sí, aceptamos reservas de propiedades mediante el pago de una garantía estipulada. Esto saca la propiedad del mercado mientras se redactan y firman los contratos correspondientes."
    }
  ];

  return (
    <div className="info-page">
      <div className="info-hero">
        <div className="container">
          <h1 className="info-title">Preguntas Frecuentes</h1>
          <p className="info-subtitle">Resolvemos tus dudas sobre nuestros procesos inmobiliarios.</p>
        </div>
      </div>
      
      <div className="container info-content">
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="faq-contact">
          <p>¿Tienes otra duda? Escríbenos a nuestro WhatsApp o envíanos un correo.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
