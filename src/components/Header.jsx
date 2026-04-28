import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Determine current season in Southern Hemisphere
  const getSeason = () => {
    const month = new Date().getMonth(); // 0 = Jan, 11 = Dec
    if (month >= 2 && month <= 4) return 'Otoño';
    if (month >= 5 && month <= 7) return 'Invierno';
    if (month >= 8 && month <= 10) return 'Primavera';
    return 'Verano';
  };
  const currentSeason = getSeason();

  return (
    <header className="header glass">
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src="/images/logo-horizontal.png" alt="La Serena Propiedades" height="65" />
        </Link>
        
        <nav className="desktop-nav">
          <ul className="nav-list">
            <li><NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Inicio</NavLink></li>
            <li><NavLink to="/arriendo-la-serena" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Arriendos</NavLink></li>
            <li><NavLink to="/venta-propiedades-la-serena" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Ventas</NavLink></li>
            <li><NavLink to="/arriendo-verano-la-serena" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>{currentSeason}</NavLink></li>
            <li><NavLink to="/blog" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Blog</NavLink></li>
          </ul>
        </nav>

        <div className="header-actions">
          <Link to="/search" className="btn btn-outline search-btn">
            <Search size={18} />
            <span>Buscar</span>
          </Link>
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-header">
            <img src="/images/logo-horizontal.png" alt="La Serena Propiedades" height="50" />
            <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              <li><NavLink to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Inicio</NavLink></li>
              <li><NavLink to="/arriendo-la-serena" className="mobile-nav-link">Arriendos</NavLink></li>
              <li><NavLink to="/venta-propiedades-la-serena" className="mobile-nav-link">Ventas</NavLink></li>
              <li><NavLink to="/arriendo-verano-la-serena" className="mobile-nav-link">{currentSeason}</NavLink></li>
              <li><NavLink to="/blog" className="mobile-nav-link">Blog</NavLink></li>
              <li className="mobile-nav-separator"></li>
              <li><Link to="/quienes-somos" className="mobile-nav-link">Quiénes Somos</Link></li>
              <li><Link to="/servicios" className="mobile-nav-link">Nuestros Servicios</Link></li>
              <li><Link to="/preguntas-frecuentes" className="mobile-nav-link">Preguntas Frecuentes</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
