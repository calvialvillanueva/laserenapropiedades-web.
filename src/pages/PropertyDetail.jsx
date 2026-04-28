import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, ArrowLeft, Phone, Mail, X, ZoomIn, CheckCircle2, MessageSquare, Car, Users, Clock, Eye, Hash } from 'lucide-react';
import propiedades from '../data/propiedades_reales.json';
import PropertyCalendar from '../components/PropertyCalendar';
import './PropertyDetail.css';

// Map of known detail keys to icons
const DETAIL_ICONS = {
  'capacidad': Users,
  'personas': Users,
  'dormitorios': Bed,
  'baños': Bath,
  'estacionamiento': Car,
  'piso numero': Hash,
  'vista': Eye,
  'estancia mínima': Clock,
  'check in': Clock,
  'check out': Clock,
  'código de la propiedad': Hash,
};

const getIcon = (key) => {
  const lower = key.toLowerCase();
  for (const k in DETAIL_ICONS) {
    if (lower.includes(k)) return DETAIL_ICONS[k];
  }
  return CheckCircle2;
};

const PropertyDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [reservationData, setReservationData] = useState({
    checkIn: '',
    checkOut: '',
    adults: '1',
    children: '0',
  });

  const property = propiedades.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) {
    return (
      <div className="pd-not-found">
        <h2>Propiedad no encontrada</h2>
        <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
      </div>
    );
  }

  const cleanPrice = property.price
    .replace(/[\n\t\r]+/g, ' ')
    .replace('Año corrido', '')
    .replace('En Venta', '')
    .replace('Verano', '')
    .trim();

  // Separate description into narrative vs. specs vs. amenities
  const descriptionLines = property.description ? property.description.split('\n') : [];
  const mainDescLines = [];
  const specItems = [];   // key:value pairs that are numeric / short text
  const amenities = [];   // key:value pairs where value is 'Si' or 'true'

  const AMENITY_KEYS = ['cocina americana', 'estacionamiento', 'sab', 'toall', 'internet', 'piscina', 'seguridad', 'gym', 'bbq'];

  descriptionLines.forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0 && line.length < 120) {
      const key = line.substring(0, colonIdx).trim();
      const value = line.substring(colonIdx + 1).trim();
      if (key && value) {
        const isAmenity = AMENITY_KEYS.some(k => key.toLowerCase().includes(k));
        if (isAmenity) {
          amenities.push(key); // only keep label, value is always Si
        } else {
          specItems.push({ key, value });
        }
        return;
      }
    }
    if (line.trim()) mainDescLines.push(line.trim());
  });

  const MIN_STAY = property.minStay || 3; // Estancia mínima en noches

  // Compute today's date string (yyyy-mm-dd) for min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  // Compute min checkout date (checkIn + MIN_STAY days)
  const minCheckOut = (() => {
    if (!reservationData.checkIn) return todayStr;
    const d = new Date(reservationData.checkIn);
    d.setDate(d.getDate() + MIN_STAY);
    return d.toISOString().split('T')[0];
  })();

  const handleCheckInChange = (val) => {
    const d = new Date(val);
    d.setDate(d.getDate() + MIN_STAY);
    const autoCheckOut = d.toISOString().split('T')[0];
    setReservationData({
      ...reservationData,
      checkIn: val,
      // Reset checkout if it's before the new minimum
      checkOut: reservationData.checkOut < autoCheckOut ? autoCheckOut : reservationData.checkOut,
    });
  };

  const handleWhatsApp = () => {
    const phone = '56992812427';
    const msg = `Hola! Me interesa la propiedad "${property.title}".\n\nReserva:\n- Check In: ${reservationData.checkIn || 'Por definir'}\n- Check Out: ${reservationData.checkOut || 'Por definir'}\n- Adultos: ${reservationData.adults}\n- Niños: ${reservationData.children}\n\n¿Tienen disponibilidad?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="pd-page">
      {/* ── HERO ── */}
      <div className="pd-hero" style={{ backgroundImage: `url(${property.image})` }}>
        <div className="pd-hero-overlay" />
        <div className="pd-hero-content container">
          <Link to="/" className="pd-back-btn"><ArrowLeft size={16} /> Volver</Link>
          <span className="pd-badge">{property.operation}</span>
          <h1 className="pd-title">{property.title}</h1>
          <div className="pd-location">
            <MapPin size={16} />
            <span>{property.location}</span>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="container pd-grid">

        {/* LEFT COLUMN */}
        <div className="pd-main">

          {/* Price */}
          <div className="pd-price-bar">
            <span className="pd-price">{cleanPrice}</span>
          </div>

          {/* Quick Feature Pills */}
          <div className="pd-feature-pills">
            {property.bedrooms && (
              <div className="pd-pill">
                <div className="pd-pill-icon"><Bed size={18} /></div>
                <div className="pd-pill-text"><strong>{property.bedrooms}</strong><span>Dormitorios</span></div>
              </div>
            )}
            {property.bathrooms && (
              <div className="pd-pill">
                <div className="pd-pill-icon"><Bath size={18} /></div>
                <div className="pd-pill-text"><strong>{property.bathrooms}</strong><span>Baños</span></div>
              </div>
            )}
            {property.area && (
              <div className="pd-pill">
                <div className="pd-pill-icon"><Maximize size={18} /></div>
                <div className="pd-pill-text"><strong>{property.area}</strong><span>Área m²</span></div>
              </div>
            )}
          </div>

          {/* Photo Gallery */}
          {property.gallery && property.gallery.length > 0 && (
            <section className="pd-section">
              <h2 className="pd-section-title">Galería de Fotos</h2>
              <div className="pd-gallery">
                {property.gallery.map((src, i) => (
                  <div key={i} className="pd-gallery-item" onClick={() => setSelectedImage(src)}>
                    <img src={src} alt={`Vista ${i + 1}`} />
                    <div className="pd-gallery-overlay"><ZoomIn size={28} /></div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Description Hub */}
          <section className="pd-section">
            <h2 className="pd-section-title">Acerca de la Propiedad</h2>

            {/* Narrative */}
            <div className="pd-description-card">
              <p className="pd-description-text">{mainDescLines.join(' ')}</p>
            </div>

            {/* Key Specs Table */}
            {specItems.length > 0 && (
              <div className="pd-specs-table">
                {specItems.map((item, idx) => {
                  const Icon = getIcon(item.key);
                  return (
                    <div key={idx} className="pd-spec-row">
                      <div className="pd-spec-label">
                        <Icon size={15} className="pd-spec-icon" />
                        <span>{item.key}</span>
                      </div>
                      <strong className="pd-spec-value">{item.value}</strong>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Amenities Chips */}
            {amenities.length > 0 && (
              <div className="pd-amenities">
                <h4 className="pd-amenities-title">Incluye</h4>
                <div className="pd-amenities-chips">
                  {amenities.map((label, idx) => (
                    <span key={idx} className="pd-chip">
                      <CheckCircle2 size={14} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Availability Calendar */}
          {property.operation !== 'Venta' && (
            <section className="pd-section">
              <PropertyCalendar />
            </section>
          )}

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="pd-sidebar">

          {/* Action Card (Reservation or Visit) */}
          {property.operation === 'Venta' ? (
            <div className="pd-card pd-reservation-card">
              <div className="pd-card-header">
                <h3>Agendar Visita</h3>
              </div>
              <div className="pd-card-body">
                <p style={{ marginBottom: '15px', color: 'var(--text-secondary)' }}>
                  ¿Te interesa esta propiedad? Coordina una visita con uno de nuestros ejecutivos para conocer todos los detalles.
                </p>
                <div className="pd-form-row">
                  <div className="pd-form-group" style={{ width: '100%' }}>
                    <label>Fecha sugerida</label>
                    <input type="date" min={todayStr} />
                  </div>
                </div>
                <button className="pd-whatsapp-btn" onClick={() => {
                  const phone = '56992812427';
                  const msg = `Hola! Me interesa agendar una visita para la propiedad en venta: "${property.title}".`;
                  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
                }}>
                  <MessageSquare size={20} />
                  Contactar Ejecutivo
                </button>
              </div>
            </div>
          ) : (
            <div className="pd-card pd-reservation-card">
              <div className="pd-card-header">
                <h3>Reserva hoy día</h3>
              </div>
              <div className="pd-card-body">
                <div className="pd-minstay-badge">
                  <span>⏱ Estancia mínima: <strong>{MIN_STAY} noches</strong></span>
                </div>
                <div className="pd-form-row">
                  <div className="pd-form-group">
                    <label>Check In</label>
                    <input
                      type="date"
                      value={reservationData.checkIn}
                      min={todayStr}
                      onChange={e => handleCheckInChange(e.target.value)}
                    />
                  </div>
                  <div className="pd-form-group">
                    <label>Check Out</label>
                    <input
                      type="date"
                      value={reservationData.checkOut}
                      min={minCheckOut}
                      onChange={e => setReservationData({ ...reservationData, checkOut: e.target.value })}
                    />
                  </div>
                </div>
                <div className="pd-form-row">
                  <div className="pd-form-group">
                    <label>Adultos</label>
                    <select value={reservationData.adults} onChange={e => setReservationData({ ...reservationData, adults: e.target.value })}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                  <div className="pd-form-group">
                    <label>Niños</label>
                    <select value={reservationData.children} onChange={e => setReservationData({ ...reservationData, children: e.target.value })}>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3+</option>
                    </select>
                  </div>
                </div>
                <button className="pd-whatsapp-btn" onClick={handleWhatsApp}>
                  <MessageSquare size={20} />
                  Reservar por WhatsApp
                </button>
              </div>
            </div>
          )}

          {/* Contact Card */}
          <div className="pd-card pd-contact-card">
            <div className="pd-agent-header">
              <img src="/favicon.svg" alt="La Serena Propiedades" className="pd-agent-logo" />
              <div>
                <strong>La Serena Propiedades</strong>
                <span>Agencia Inmobiliaria</span>
              </div>
            </div>
            <div className="pd-card-body">
              <input type="text" placeholder="Nombre" className="pd-input" />
              <input type="email" placeholder="Correo electrónico" className="pd-input" />
              <input type="tel" placeholder="Teléfono" className="pd-input" />
              <textarea
                className="pd-input pd-textarea"
                rows="3"
                defaultValue={`Hola, estoy interesado en esta propiedad [${property.title}]`}
              />
              <button className="pd-send-btn">
                <Mail size={18} />
                Enviar mensaje
              </button>
              <a href="tel:+56992812427" className="pd-call-btn">
                <Phone size={18} />
                Llamar ahora
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX MODAL ── */}
      {selectedImage && (
        <div className="pd-modal" onClick={() => setSelectedImage(null)}>
          <div className="pd-modal-content" onClick={e => e.stopPropagation()}>
            <button className="pd-modal-close" onClick={() => setSelectedImage(null)}>
              <X size={28} />
            </button>
            <img src={selectedImage} alt="Vista ampliada" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
