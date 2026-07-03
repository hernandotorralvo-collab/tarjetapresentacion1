import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Instagram, Mail, Phone, MapPin, Facebook, Music, Youtube } from 'lucide-react';
import { TikTok } from './figma/TikTokIcon';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Armar el mensaje
    const messageText = `Hola, me interesa contratar tus servicios.

*Datos de Contacto:*
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
Tipo de Evento: ${formData.eventType}
Fecha del Evento: ${formData.date}

*Mensaje:*
${formData.message}`;

    // Encodear el mensaje para URL
    const encodedMessage = encodeURIComponent(messageText);
    
    // Redirigir a WhatsApp
    window.open(`https://wa.me/573008442980?text=${encodedMessage}`, '_blank');
    
    // Mostrar confirmación
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    
    // Limpiar formulario
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      date: '',
      message: '',
    });
  };

  return (
    <section id="contact" ref={ref} className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2, fontWeight: 700 }}>
            <span className="text-accent">Contacto</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Creemos juntos algo memorable
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input-background border border-accent/20 focus:border-accent focus:outline-none transition-colors text-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input-background border border-accent/20 focus:border-accent focus:outline-none transition-colors text-foreground"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm mb-2">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-input-background border border-accent/20 focus:border-accent focus:outline-none transition-colors text-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="eventType" className="block text-sm mb-2">Tipo de Evento</label>
                  <select
                    id="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input-background border border-accent/20 focus:border-accent focus:outline-none transition-colors text-foreground"
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="wedding">Boda</option>
                    <option value="serenade">Serenata</option>
                    <option value="corporate">Evento Corporativo</option>
                    <option value="private">Evento Privado</option>
                    <option value="religious">Evento Religioso</option>
                    <option value="group">Contratar Grupo Musical</option>
                    <option value="sound">Alquiler de Sonido</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm mb-2">Fecha del Evento</label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-input-background border border-accent/20 focus:border-accent focus:outline-none transition-colors text-foreground"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2">Mensaje</label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-input-background border border-accent/20 focus:border-accent focus:outline-none transition-colors text-foreground resize-none"
                  placeholder="Cuéntame sobre tu evento..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-8 py-4 bg-accent text-background hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20"
              >
                {submitted ? '¡Mensaje Enviado!' : 'Enviar Mensaje'}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-foreground/80">
                  <Mail className="text-accent" size={20} />
                  <span>SAXOFONISTASAMIR@GMAIL.COM</span>
                </div>
                <div className="flex items-center gap-4 text-foreground/80">
                  <Phone className="text-accent" size={20} />
                  <span>+57 300 844 2980</span>
                </div>
                <div className="flex items-center gap-4 text-foreground/80">
                  <MapPin className="text-accent" size={20} />
                  <span>Montería, Córdoba, Colombia</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl mb-6">Sígueme</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/samir_saxofonista_eventos?utm_source=qr&igsh=cmFtbHY3aWVmYzhu"
                  className="w-12 h-12 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-background transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.youtube.com/@samirsaxofonista"
                  className="w-12 h-12 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-background transition-all"
                  aria-label="Youtube"
                >
                  <Youtube size={20} />
                </a>
                  <a
                  href="https://www.facebook.com/SAMIRSAXOFONISTA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-accent/50 flex items-center justify-center text-accent hover:bg-accent hover:text-background transition-all"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.tiktok.com/@samir.saxofonista"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-accent/50 flex items-center justify-center text-accent hover:bg-accent hover:text-background transition-all"
                  aria-label="TikTok"
                >
                  <TikTok size={20} />
                </a>
              </div>
            </div>

          
          </motion.div>
        </div>
      </div>
    </section>
  );
}
