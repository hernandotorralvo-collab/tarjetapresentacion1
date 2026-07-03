import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/+573007284507"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-accent text-background rounded-full flex items-center justify-center shadow-lg shadow-accent/30 hover:scale-110 transition-transform"
      aria-label="Contactar por WhatsApp"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <MessageCircle size={24} />
    </motion.a>
  );
}
