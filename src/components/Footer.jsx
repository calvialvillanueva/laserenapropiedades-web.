import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/images/logo-vertical.png" alt="La Serena Propiedades" height="140" className="mb-3" />
          <p className="text-muted mb-4">
            Empresa familiar nacida en 1999. Buscamos siempre mejorar los servicios, apoyados por profesionales para otorgar el servicio que usted merece.
          </p>
          <div className="social-links">
            <a href="#" rel="noopener noreferrer"><Globe size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3 className="footer-title">Propiedades</h3>
          <ul>
            <li><Link to="/arriendo-la-serena">Arriendo en La Serena</Link></li>
            <li><Link to="/venta-propiedades-la-serena">Venta en La Serena</Link></li>
            <li><Link to="/arriendo-verano-la-serena">Arriendo de Temporada</Link></li>
            <li><Link to="/propiedades-coquimbo">Propiedades en Coquimbo</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3 className="footer-title">Enlaces Útiles</h3>
          <ul>
            <li><Link to="/quienes-somos">Quiénes Somos</Link></li>
            <li><Link to="/servicios">Nuestros Servicios</Link></li>
            <li><Link to="/blog">Blog Inmobiliario</Link></li>
            <li><Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3 className="footer-title">Contacto</h3>
          <ul>
            <li>
              <MapPin size={18} />
              <span>Angosta 64, Coquimbo, Chile</span>
            </li>
            <li>
              <Phone size={18} />
              <span>+56 9 9281 2427</span>
            </li>
            <li>
              <Mail size={18} />
              <span>Lunes a Viernes: 09:00 - 20:00</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} La Serena Propiedades. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
