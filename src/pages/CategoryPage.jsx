import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize } from 'lucide-react';
import propiedades from '../data/propiedades_reales.json';
import './CategoryPage.css';

const CategoryPage = ({ title, description, filterFn }) => {
  useEffect(() => {
    document.title = `${title} | La Serena Propiedades`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;
    window.scrollTo(0, 0);
  }, [title, description]);

  const filteredProperties = propiedades.filter(filterFn);

  return (
    <div className="category-page">
      <div className="category-hero">
        <div className="category-hero-overlay" />
        <div className="container category-hero-content">
          <h1 className="category-title">{title}</h1>
          <p className="category-description">{description}</p>
        </div>
      </div>

      <div className="container category-content">
        <div className="category-results-info">
          <span>Mostrando {filteredProperties.length} propiedades</span>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="no-results">
            <h2>No se encontraron propiedades en esta categoría.</h2>
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
                        <span title="Dormitorios">
                          <Bed size={16} /> {property.bedrooms}
                        </span>
                      )}
                      {property.bathrooms && (
                        <span title="Baños">
                          <Bath size={16} /> {property.bathrooms}
                        </span>
                      )}
                      {property.area && (
                        <span title="Metros cuadrados">
                          <Maximize size={16} /> {property.area}
                        </span>
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

export default CategoryPage;
