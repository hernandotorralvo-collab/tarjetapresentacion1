import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setShow(true), 3000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-card border border-accent/30 p-6 shadow-2xl"
        >
          <button
            onClick={handleDecline}
            className="absolute top-2 right-2 text-foreground/60 hover:text-foreground"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <h3 className="mb-2">Aviso de Cookies</h3>
          <p className="text-sm text-foreground/70 mb-4">
            Utilizamos cookies para mejorar tu experiencia de navegación y analizar el tráfico del sitio. Al hacer clic en "Aceptar", consientes nuestro uso de cookies.
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2 bg-accent text-background hover:bg-accent/90 transition-colors text-sm"
            >
              Aceptar
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 px-4 py-2 border border-accent/30 text-foreground hover:border-accent transition-colors text-sm"
            >
              Rechazar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
