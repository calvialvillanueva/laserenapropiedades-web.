import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize } from 'lucide-react';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  // Limpieza del precio sacando tabs y saltos de linea
  const cleanPrice = property.price.replace(/[\n\t\r]+/g, ' ').replace('Año corrido', '').replace('En Venta', '').replace('Verano', '').trim();

  return (
    <div className="property-card glass">
      <div className="property-image-wrapper">
        <img src={property.image} alt={property.title} className="property-image" loading="lazy" />
        <div className="property-badges">
          <span className="badge badge-operation">{property.operation}</span>
          <span className="badge badge-type">Propiedad</span>
        </div>
      </div>
      
      <div className="property-content">
        <div className="property-price">
          <span className="amount">{cleanPrice}</span>
        </div>
        
        <h3 className="property-title">
          <Link to={`/propiedad/${property.id}`}>{property.title}</Link>
        </h3>
        
        <div className="property-location">
          <MapPin size={16} />
          <span>{property.location}</span>
        </div>
        
        <div className="property-features">
          {property.bedrooms && (
            <div className="feature">
              <Bed size={18} />
              <span>{property.bedrooms} Dorms</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="feature">
              <Bath size={18} />
              <span>{property.bathrooms} Baños</span>
            </div>
          )}
          {property.area && (
            <div className="feature">
              <Maximize size={18} />
              <span>{property.area}</span>
            </div>
          )}
        </div>
        
        <div className="property-footer">
          <Link to={`/propiedad/${property.id}`} className="btn btn-primary btn-full">Ver Detalles</Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
