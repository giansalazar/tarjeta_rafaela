import { useState } from 'react'
import './App.css'
import fotoPerfil from './assets/foto1.webp' 

function App() {
  const [selectedService, setSelectedService] = useState(null);

  const contactData = {
    name: "Giancarlo Salazar Rivera",
    title: "Desarrollo Web & Diseño Digital",
    phone: "+524871137531",
    email: "gsrdesign10@gmail.com",
    location: "Rioverde, SLP, México",
    whatsappMsg: "Hola Giancarlo, solicito información sobre el servicio de: ",
    services: [
      { 
        title: "Sitios Web", 
        desc: "Desarrollo de páginas web de alta gama, optimizadas para velocidad, SEO y conversión. Diseñadas para proyectar una imagen profesional y sólida de tu empresa." 
      },
      { 
        title: "Tarjetas Digitales Pro", 
        desc: "Lleva tu networking al siguiente nivel. Una tarjeta interactiva con botones de llamada, WhatsApp y redes sociales, siempre disponible en tu celular." 
      },
      { 
        title: "Invitaciones Digitales", 
        desc: "Experiencias digitales para eventos exclusivos. Incluyen confirmación vía WhatsApp, mapa con GPS, cuenta regresiva y galería de fotos." 
      },
      { 
        title: "Estrategia de Interfaz (UX)", 
        desc: "Análisis profundo de cómo tus clientes interactúan con tu sitio para mejorar la navegación, reducir el abandono y aumentar tus ventas digitales." 
      }
    ]
  };

  const handleCall = () => window.location.href = `tel:${contactData.phone}`;
  
  const handleWhatsApp = (serviceTitle = "") => {
    const msg = serviceTitle ? `${contactData.whatsappMsg} ${serviceTitle}` : contactData.whatsappMsg;
    const url = `https://wa.me/${contactData.phone.replace('+', '')}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="elegant-wrapper">
      <div className="elegant-card">
        <header className="elegant-header">
          <div className="frame">
            <img src={fotoPerfil} alt={contactData.name} className="elegant-avatar" />
          </div>
          <h1 className="elegant-name">{contactData.name}</h1>
          <p className="elegant-subtitle">{contactData.title}</p>
        </header>

        <main className="elegant-body">
          <div className="services-nav">
            <p className="section-title">Nuestros Servicios</p>
            <div className="elegant-grid">
              {contactData.services.map((service, index) => (
                <button 
                  key={index} 
                  className="elegant-tag" 
                  onClick={() => setSelectedService(service)}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>

          <div className="elegant-divider"></div>

          <div className="contact-minimal">
            <div className="contact-link" onClick={handleCall}>
              <span className="dot"></span> {contactData.phone}
            </div>
            <div className="contact-link">
              <span className="dot"></span> {contactData.email}
            </div>
          </div>
        </main>

        <footer className="elegant-footer">
          <button className="gold-button" onClick={() => handleWhatsApp()}>
            Agendar Consultoría
          </button>
        </footer>
      </div>

      {/* Modal Desplegable */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="elegant-modal" onClick={(e) => e.stopPropagation()}>
            <button className="x-close" onClick={() => setSelectedService(null)}>&times;</button>
            <h3 className="modal-title">{selectedService.title}</h3>
            <p className="modal-desc">{selectedService.desc}</p>
            <button className="modal-cta" onClick={() => handleWhatsApp(selectedService.title)}>
              Preguntar por este servicio
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App