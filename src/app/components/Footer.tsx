import { motion } from 'motion/react';
import { Instagram, Mail, Phone, MapPin, Facebook, Music2 } from 'lucide-react';


export function Footer() {
  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-accent/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-serif text-accent mb-4">SAMIR BERROCAL</h3>
            <p className="text-foreground/60 text-sm">
              Actuaciones de saxofón de primera calidad para momentos inolvidables
            </p>
          </div>

        
          <div>
            <h4 className="mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>Nota Celestial</li>
              <li>Scherzo Band</li>
              <li>Orquesta La 21</li>
              <li>Son Mocari</li>
              <li>Grupo Vallenato</li>
              <li>Alquiler de Sonido</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Contacto</h4>
            <div className="space-y-3 text-sm text-foreground/70">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                <a href="mailto:SAXOFONISTASAMIR@GMAIL.COM" className="hover:text-accent transition-colors">
                  SAXOFONISTASAMIR@GMAIL.COM
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-accent" />
                <a href="tel:+573008442980" className="hover:text-accent transition-colors">
                  +57 300 844 2980
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-accent" />
                <span>Montería, Córdoba, Colombia</span>
              </div>
              <div className="flex gap-3 mt-4">
               
              
                
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-accent/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1">
              <p className="text-sm text-foreground/60">
                © 2026 Samir Berrocal. Todos los derechos reservados.
              </p>
            </div>

            
            </div>

            
           
        </div>
      </div>
      
    </footer>
  
  );
}
