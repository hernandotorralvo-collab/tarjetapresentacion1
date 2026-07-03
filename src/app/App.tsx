import { useEffect, useRef, useState } from 'react';
import fondo from '../assets/fondo.mp3'; 
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Media } from './components/Media';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CookieConsent } from './components/CookieConsent';

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current && !audioStarted) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => {});
        setAudioStarted(true);
      }
      document.removeEventListener('click', startAudio);
    };

    document.addEventListener('click', startAudio);
    return () => document.removeEventListener('click', startAudio);
  }, [audioStarted]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);

      if (!audioStarted) {
        audioRef.current.play().catch(() => {});
        setAudioStarted(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Audio de fondo */}
      <audio ref={audioRef} loop>
        <source src={fondo} type="audio/mpeg" /> {/* 👈 Usa la variable importada */}
      </audio>

      {/* Botón flotante de silencio */}
      <button
        onClick={toggleMute}
        title={muted ? 'Activar sonido' : 'Silenciar'}
        style={{
          position: 'fixed',
          bottom: '80px',
          left: '20px',
          zIndex: 9999,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#1a1a1a',
          border: '2px solid rgba(255,255,255,0.2)',
          color: 'white',
          fontSize: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {muted ? '🔇' : '🔊'}
      </button>

      <LoadingScreen />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Media />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </div>
  );
}