import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import './Blog.css';

const blogPosts = [
  {
    id: 1,
    title: "Por qué invertir en bienes raíces en La Serena este 2026",
    excerpt: "Descubre las razones principales por las que La Serena se ha posicionado como uno de los polos de inversión inmobiliaria más rentables del norte de Chile.",
    image: "/assets/blog/blog-1.jpg",
    date: "25 Abril, 2026",
    readTime: "5 min",
    category: "Inversión"
  },
  {
    id: 2,
    title: "Guía definitiva para encontrar el arriendo de verano perfecto",
    excerpt: "Evita estafas y asegura tus vacaciones soñadas en la Avenida del Mar con estos consejos clave de nuestros expertos inmobiliarios.",
    image: "/assets/blog/blog-2.jpg",
    date: "18 Abril, 2026",
    readTime: "4 min",
    category: "Consejos"
  },
  {
    id: 3,
    title: "Tendencias de decoración para departamentos costeros",
    excerpt: "Transforma tu propiedad en la playa en un oasis moderno y minimalista para atraer mejores arrendatarios y aumentar la plusvalía.",
    image: "/assets/blog/blog-3.jpg",
    date: "10 Abril, 2026",
    readTime: "6 min",
    category: "Decoración"
  }
];

const Blog = () => {
  useEffect(() => {
    document.title = "Blog Inmobiliario | La Serena Propiedades";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Lee nuestro blog para descubrir consejos, tendencias de mercado y oportunidades de inversión en bienes raíces en La Serena y Coquimbo.";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <div className="blog-hero-overlay" />
        <div className="container blog-hero-content">
          <h1 className="blog-title">Blog Inmobiliario</h1>
          <p className="blog-description">Noticias, consejos de inversión y tendencias del mercado en La Serena y la Región de Coquimbo.</p>
        </div>
      </div>

      <div className="container blog-content">
        <div className="blog-grid">
          {blogPosts.map(post => (
            <article key={post.id} className="blog-card">
              <div className="blog-card-image">
                <img src={post.image} alt={post.title} />
                <span className="blog-category">{post.category}</span>
              </div>
              <div className="blog-card-content">
                <div className="blog-meta">
                  <span><Calendar size={14} /> {post.date}</span>
                  <span><Clock size={14} /> {post.readTime}</span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <Link to={`/blog`} className="blog-read-more">
                  Leer artículo <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
