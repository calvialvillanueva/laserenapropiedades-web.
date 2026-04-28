import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import propiedades from '../data/propiedades_reales.json';
import './Home.css';

const Home = () => {
  const [filters, setFilters] = useState({ operation: 'Todos', type: 'Todos', sector: 'Todos' });
  const [activeFilters, setActiveFilters] = useState({ operation: 'Todos', type: 'Todos', sector: 'Todos' });

  const handleSearch = () => {
    setActiveFilters(filters);
    // Smooth scroll to the results section
    document.getElementById('properties-grid-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const displayedProperties = propiedades.filter(p => {
    // Operation Filter
    if (activeFilters.operation !== 'Todos' && p.operation !== activeFilters.operation) return false;
    
    // Type Filter
    if (activeFilters.type !== 'Todos') {
       const titleLower = p.title.toLowerCase();
       if (activeFilters.type === 'Departamento' && !titleLower.includes('depto') && !titleLower.includes('departamento')) return false;
       if (activeFilters.type === 'Casa' && !titleLower.includes('casa')) return false;
       if (activeFilters.type === 'Parcela' && !titleLower.includes('parcela')) return false;
    }

    // Sector Filter
    if (activeFilters.sector !== 'Todos') {
       const locLower = p.location.toLowerCase();
       if (activeFilters.sector === 'La Serena' && !locLower.includes('serena')) return false;
       if (activeFilters.sector === 'Coquimbo' && !locLower.includes('coquimbo')) return false;
       if (activeFilters.sector === 'Ovalle' && !locLower.includes('ovalle')) return false;
    }

    return true;
  });

  return (
    <div className="page-home">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url('/assets/propiedades/arriendo-diario.jpg')` }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content animate-fade-in-up">
          <h1 className="title-xl text-white mb-2" style={{ textTransform: 'uppercase' }}>
            Encuentra tu Propiedad Ideal en <span className="text-gold" style={{ color: 'var(--secondary)' }}>La Serena</span>
          </h1>
          <p className="hero-subtitle mb-4">Arriendo y venta de departamentos, casas y parcelas en la IV Región.</p>
          
          <div className="search-bar glass">
            <div className="search-inputs">
              <div className="search-group">
                <label>Operación</label>
                <select 
                  value={filters.operation} 
                  onChange={(e) => setFilters({...filters, operation: e.target.value})}
                >
                  <option value="Todos">Todos</option>
                  <option value="Arriendo">Arriendo</option>
                  <option value="Venta">Venta</option>
                </select>
              </div>
              <div className="search-group">
                <label>Tipo</label>
                <select 
                  value={filters.type} 
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="Todos">Todos</option>
                  <option value="Departamento">Departamento</option>
                  <option value="Casa">Casa</option>
                  <option value="Parcela">Parcela</option>
                </select>
              </div>
              <div className="search-group">
                <label>Sector</label>
                <select 
                  value={filters.sector} 
                  onChange={(e) => setFilters({...filters, sector: e.target.value})}
                >
                  <option value="Todos">Todas las comunas</option>
                  <option value="La Serena">La Serena</option>
                  <option value="Coquimbo">Coquimbo</option>
                  <option value="Ovalle">Ovalle</option>
                </select>
              </div>
            </div>
            <button className="btn btn-secondary btn-search" onClick={handleSearch}>
              Buscar Propiedades
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties-grid-section" className="section bg-light">
        <div className="container">
          <div className="section-header text-center mb-4">
            <h2 className="title-lg">Propiedades Disponibles</h2>
            <p className="text-muted">
              {displayedProperties.length === 0 
                ? 'No se encontraron propiedades con esos filtros. Intenta una búsqueda más amplia.'
                : `Mostrando ${displayedProperties.length} propiedades según tu búsqueda.`}
            </p>
          </div>
          
          <div className="properties-grid">
            {displayedProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
