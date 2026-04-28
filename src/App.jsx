import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PropertyDetail from './pages/PropertyDetail';
import CategoryPage from './pages/CategoryPage';
import Blog from './pages/Blog';
import SearchPage from './pages/SearchPage';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import FAQ from './pages/FAQ';
import WhatsAppButton from './components/WhatsAppButton';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/propiedad/:id" element={<PropertyDetail />} />
            <Route 
              path="/arriendo-la-serena" 
              element={
                <CategoryPage 
                  title="Arriendos en La Serena" 
                  description="Encuentra las mejores propiedades en arriendo en La Serena y la Región de Coquimbo. Departamentos, casas y parcelas disponibles." 
                  filterFn={(p) => p.operation === 'Arriendo' && p.id !== 'arriendo-abril-diciembre'} 
                />
              } 
            />
            <Route 
              path="/venta-propiedades-la-serena" 
              element={
                <CategoryPage 
                  title="Propiedades en Venta" 
                  description="Explora nuestro catálogo exclusivo de casas, parcelas y departamentos en venta con alta plusvalía." 
                  filterFn={(p) => p.operation === 'Venta'} 
                />
              } 
            />
            <Route 
              path="/arriendo-verano-la-serena" 
              element={
                <CategoryPage 
                  title="Arriendos de Verano" 
                  description="Planifica tus vacaciones perfectas. Arriendos de temporada cerca de la playa y centros turísticos." 
                  filterFn={(p) => p.operation === 'Arriendo' && p.id === 'arriendo-abril-diciembre'} 
                />
              } 
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/quienes-somos" element={<AboutUs />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/preguntas-frecuentes" element={<FAQ />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
