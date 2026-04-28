import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Search } from 'lucide-react';
import propiedades from '../data/propiedades_reales.json';
import './CategoryPage.css'; // Reusing CategoryPage styles for consistency
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    document.title = `Búsqueda: ${query} | La Serena Propiedades`;
    setInputValue(query);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: inputValue });
  };

  const filteredProperties = propiedades.filter(p => {
    if (!query) return true;
    const keywordLower = query.toLowerCase().trim();
    const searchableText = `${p.title} ${p.description} ${p.location}`.toLowerCase();
    return searchableText.includes(keywordLower);
  });

  return (
    <div className="category-page search-page">
      <div className="category-hero" style={{ height: '300px' }}>
        <div className="category-hero-overlay" />
        <div className="container category-hero-content">
          <h1 className="category-title" style={{ fontSize: '2.5rem' }}>Búsqueda de Propiedades</h1>
          
          <form className="search-page-form" onSubmit={handleSearch}>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ej: vista al mar, piscina, amoblado..." 
              className="search-page-input"
              autoFocus
            />
            <button type="submit" className="search-page-btn">
              <Search size={20} />
            </button>
          </form>

        </div>
      </div>

      <div className="container category-content">
        <div className="category-results-info">
          {query ? (
            <span>Resultados para: <strong>"{query}"</strong> ({filteredProperties.length} propiedades)</span>
          ) : (
            <span>Ingresa una palabra clave para buscar propiedades.</span>
          )}
        </div>

        {filteredProperties.length === 0 ? (
          <div className="no-results">
            <h2>No encontramos propiedades que coincidan con "{query}".</h2>
            <p className="text-muted" style={{marginBottom: '2rem'}}>Intenta con otras palabras clave o revisa nuestro catálogo completo.</p>
            <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
          </div>
        ) : (
          <div className="property-grid">
            {filteredProperties.map(property => {
              const cleanPrice = property.price
                .replace(/[\n\t\r]+/g, ' ')
                .replace('Año corrido', '')
                .replace('En Venta', '')
                .replace('Verano', '')
                .trim();

              return (
                <div key={property.id} className="property-card">
                  <div className="property-card-image">
                    <img src={property.image} alt={property.title} />
                    <span className="property-badge">{property.operation}</span>
                  </div>
                  <div className="property-card-content">
                    <div className="property-price">{cleanPrice}</div>
                    <h3 className="property-card-title">{property.title}</h3>
                    <div className="property-location">
                      <MapPin size={16} />
                      <span>{property.location}</span>
                    </div>
                    <div className="property-features">
                      {property.bedrooms && (
                        <span title="Dormitorios"><Bed size={16} /> {property.bedrooms}</span>
                      )}
                      {property.bathrooms && (
                        <span title="Baños"><Bath size={16} /> {property.bathrooms}</span>
                      )}
                      {property.area && (
                        <span title="Metros cuadrados"><Maximize size={16} /> {property.area}</span>
                      )}
                    </div>
                    <Link to={`/propiedad/${property.id}`} className="property-btn">
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
