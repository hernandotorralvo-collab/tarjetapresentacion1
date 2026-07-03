import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Music, Users, Music2, Sparkles, Guitar, Volume2 } from 'lucide-react';

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Music,
      title: 'Grupo Nota Celestial',
      description: 'Música de cámara para eventos religiosos, en formato de trío (voz, piano, saxofón) o cuarteto (voz, piano, saxofón, violín).',
    },
    {
      icon: Music2,
      title: 'Grupo Scherzo Band',
      description: 'Música tropical bailable y moderna para todo tipo de eventos. Este formato compacto te hará recordar para siempre los mejores momentos de tu celebración (voz, piano, bajo, batería, saxofón, trompeta).',
    },
    {
      icon: Users,
      title: 'Orquesta La 21',
      description: 'Música tropical bailable y moderna para todo tipo de eventos. Este formato de gran orquesta te impactará con su calidad sonora potente y te hará bailar de principio a fin (9-10 músicos).',
    },
    {
      icon: Sparkles,
      title: 'Grupo Folclórico Son Mocari',
      description: 'Ideal para tu hora loca. Transpórtate al Carnaval de Barranquilla en un instante con todo el sabor de la música folclórica del Caribe colombiano en formato de gaitas y tambores o banda folclórica sinuana.',
    },
    {
      icon: Guitar,
      title: 'Grupo Vallenato',
      description: 'Armar la parranda ya no será inconveniente. La agrupación vallenata interpreta todos los estilos modernos y clásicos de los aires del vallenato desde formatos típibajo hasta un gran conjunto de hasta 12 artistas.',
    },
    {
      icon: Volume2,
      title: 'Alquiler de Sonido Profesional',
      description: 'Toda una gama de equipos profesionales que se adaptan a tus necesidades específicas. Podrás armar tu combo de sonido desde pequeño, básico, compacto, reforzado, semiprofesional y profesional.',
    },
  ];

  return (
    <section id="services" ref={ref} className="py-24 bg-card relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2, fontWeight: 700 }}>
            <span className="text-accent">Servicios Adicionales</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Servicios musicales profesionales adaptados a sus necesidades específicas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 border border-accent/20 hover:border-accent transition-all duration-300 bg-background/50 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-all duration-300" />
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              <div className="absolute top-0 right-0 h-0 w-0.5 bg-accent transition-all duration-300 group-hover:h-full" />
              <div className="absolute bottom-0 left-0 h-0 w-0.5 bg-accent transition-all duration-300 group-hover:h-full" />

              <div className="relative z-10">
                <div className="w-14 h-14 mb-6 text-accent group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={56} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl mb-3">{service.title}</h3>
                <p className="text-foreground/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
