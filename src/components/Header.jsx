import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import './Header.css'; // Let's pretend we have this or just rely on index.css

const Header = () => {
  return (
    <header className="header glass">
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src="/images/logo-horizontal.png" alt="La Serena Propiedades" height="65" />
        </Link>
        
        <nav className="desktop-nav">
          <ul className="nav-list">
            <li><NavLink to="/arriendo-la-serena" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Arriendos</NavLink></li>
            <li><NavLink to="/venta-propiedades-la-serena" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Ventas</NavLink></li>
            <li><NavLink to="/arriendo-verano-la-serena" className={({isActive}) => `nav-link highlight ${isActive ? 'active' : ''}`}>Verano 2026</NavLink></li>
            <li><NavLink to="/blog" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Blog</NavLink></li>
          </ul>
        </nav>

        <div className="header-actions">
          <Link to="/search" className="btn btn-outline search-btn">
            <Search size={18} />
            <span>Buscar</span>
          </Link>
          <button className="mobile-menu-btn">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
