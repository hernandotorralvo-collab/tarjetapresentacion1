import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import Masonry from 'react-responsive-masonry';
import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import samigalery3 from '../../assets/Imagen3.png';
import samigalery4 from '../../assets/Imagen4.jpg';
import samigalery5 from '../../assets/Imagen5.jpg';
import samigalery6 from '../../assets/Imagen6.jpg';
import samigalery7 from '../../assets/Imagen7.png';
import samigalery8 from '../../assets/Imagen8.png';
import samigalery11 from '../../assets/Imagen11.png';
import samigalery12 from '../../assets/Imagen12.png';
import samigalery13 from '../../assets/Imagen13.png';
import samigalery14 from '../../assets/Imagen14.png';
import samigalery15 from '../../assets/imagen15.png';
import samigalery16 from '../../assets/Imagen16.jpg';


export function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState('Todo');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const categories = ['Todo', 'Eventos en Vivo', 'Estudio'];

  const images = [
    { src: samigalery3, category: 'Estudio', alt: 'Saxophonist performing' },
    { src: samigalery4, category: 'Estudio', alt: 'Saxophonist performing' },
    { src: samigalery5, category: 'Estudio', alt: 'Saxophonist performing' },
    { src: samigalery6, category: 'Estudio', alt: 'Saxophonist performing' },
    { src: samigalery7, category: 'Estudio', alt: 'Saxophonist performing' },
    { src: samigalery8, category: 'Estudio', alt: 'Saxophonist performing' },
    { src: samigalery16, category: 'Estudio', alt: 'Saxophonist performing' },
    { src: samigalery11, category: 'Eventos en Vivo', alt: 'Saxophonist performing' },
    { src: samigalery12, category: 'Eventos en Vivo', alt: 'Saxophonist performing' },
    { src: samigalery13, category: 'Eventos en Vivo', alt: 'Saxophonist performing' },
    { src: samigalery14, category: 'Eventos en Vivo', alt: 'Saxophonist performing' },
    { src: samigalery15, category: 'Eventos en Vivo', alt: 'Saxophonist performing' },
    
  ];

  const filteredImages = selectedCategory === 'Todo'
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <section id="gallery" ref={ref} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2, fontWeight: 700 }}>
            <span className="text-accent">Galería</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Momentos capturados de presentaciones alrededor del país
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-accent text-background'
                  : 'border border-accent/30 text-foreground hover:border-accent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <Masonry columnsCount={3} gutter="1rem" className="masonry-grid">
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="cursor-pointer group relative overflow-hidden"
              onClick={() => setLightboxImage(image.src)}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-all duration-300" />
            </motion.div>
          ))}
        </Masonry>
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-accent hover:text-accent/80 transition-colors"
              onClick={() => setLightboxImage(null)}
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightboxImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
