import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import samiPortrait from '../../assets/Imagen1.jpg';

function AnimatedCounter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * (end - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <div ref={ref}>{count}{suffix}</div>;
}

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: 12, suffix: '+', label: 'Años de Experiencia' },
    { value: 200, suffix: '+', label: 'Eventos Realizados' },
    { value: 50, suffix: '+', label: 'Ciudades Visitadas' },
  ];

  return (
    <section id="about" ref={ref} className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-accent/30 -rotate-3" />
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={samiPortrait}
                  alt="Samir Berrocal Portrait"
                  className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 backdrop-blur-sm flex items-center justify-center border border-accent/50">
                <span className="text-accent text-4xl">♪</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-serif mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2, fontWeight: 700 }}>
              Acerca de <span className="text-accent">Samir</span>
            </h2>
            <div className="space-y-4 text-foreground/80 text-lg mb-8">
              <p>
                Saxofonista profesional con más de 12 años de experiencia en el mundo de la música, Licenciado en Artística - Música con énfasis instrumental en saxofón y Especialista en Pedagogía Musical. Samir ha cautivado a todo el público en general con sus emotivas interpretaciones de saxofón.
              </p>
              <p>
                Su singular fusión de balada, bolero, bachata, salsa, merengue, porro, vallenato, reggaetón, jazz, música cristiana, rancheras, tropicales y música contemporánea crea momentos inolvidables en cada presentación.
              </p>
              <p>
                Formado también como docente de música y director de grupos musicales como orquestas, grupos folclóricos, duetos, tríos, cuartetos y sextetos de música tropical, jazz o sacra, conjuntos vallenatos y bandas folclóricas.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center border border-accent/20 p-4 hover:border-accent/50 transition-colors"
                >
                  <div className="text-3xl text-accent mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-foreground/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
