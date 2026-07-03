import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface Video {
  id: string;
  embedId: string;
}

const defaultVideos: Video[] = [
  { id: '1', embedId: '8kc4SP13wY0' },
  { id: '2', embedId: 'A6urCoOM-rw' },
  { id: '3', embedId: 'itHsRRs8NOA' },
  { id: '4', embedId: 'p3OBhPJlm_U' },
  { id: '5', embedId: 'tNlAqkLOsTM' },
];

export function Media() {
  const ref = useRef(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videos] = useState<Video[]>(defaultVideos);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      const card = trackRef.current.querySelector('.video-card') as HTMLElement;
      if (card) {
        setCardWidth(card.offsetWidth);
      }
    }
  }, []);

  const handleMove = (direction: number) => {
    setCurrent((prev) => (prev + direction + videos.length) % videos.length);
  };

  const handleGoTo = (index: number) => {
    setCurrent(index);
  };

  const getCardClass = (index: number) => {
    const rel = (index - current + videos.length) % videos.length;
    if (rel === 0) return 'center-card';
    if (rel === 1) return 'right-card';
    if (rel === videos.length - 1) return 'left-card';
    return '';
  };

  const handleThumbnailClick = (embedId: string) => {
    setSelectedVideo(embedId);
  };

  return (
    <section id="media" ref={ref} className="py-24 bg-card relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2, fontWeight: 700 }}>
            <span className="text-accent">Media</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Explora nuestro carrusel de videos
          </p>
        </motion.div>

        {/* Player */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="aspect-video bg-black rounded border border-accent/20 overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        )}

        {/* Carousel */}
        <style>{`
          .carousel-wrap { padding: 2rem 0; }
          .carousel-viewport { overflow: hidden; position: relative; }
          .carousel-track { display: flex; gap: 20px; transition: transform 0.45s cubic-bezier(.4,0,.2,1); }
          .video-card {
            flex: 0 0 calc(33.333% - 14px);
            background: #000;
            border-radius: 0.625rem;
            overflow: hidden;
          }
          .video-card.center-card { transform: perspective(900px) rotateY(0deg) scale(1.04); z-index: 2; }
          .video-card.left-card { transform: perspective(900px) rotateY(8deg) scale(0.96); opacity: 0.82; }
          .video-card.right-card { transform: perspective(900px) rotateY(-8deg) scale(0.96); opacity: 0.82; }
          .video-thumb { position: relative; width: 100%; aspect-ratio: 16/9; cursor: pointer; }
          .video-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
          .play-btn { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.28); transition: background 0.2s; }
          .play-btn:hover { background: rgba(0,0,0,0.45); }
          .play-icon { width: 54px; height: 54px; border-radius: 50%; background: rgba(255,255,255,0.93); display: flex; align-items: center; justify-content: center; color: #d4af37; }
          .nav-btn {
            position: absolute; top: 50%; transform: translateY(-50%);
            width: 36px; height: 36px; border-radius: 50%; border: 0.5px solid rgba(212, 175, 55, 0.2);
            background: rgba(10, 10, 15, 0.8); cursor: pointer; display: flex; align-items: center; justify-content: center;
            z-index: 10; transition: background 0.15s; color: #d4af37;
          }
          .nav-btn:hover { background: rgba(42, 42, 56, 0.9); }
          .nav-prev { left: -18px; }
          .nav-next { right: -18px; }
          .dots { display: flex; justify-content: center; gap: 7px; margin-top: 14px; }
          .dot { width: 9px; height: 9px; border-radius: 50%; background: rgba(212, 175, 55, 0.2); cursor: pointer; transition: background 0.2s; }
          .dot.active { background: #d4af37; }
          .relative { position: relative; }
        `}</style>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="carousel-wrap">
            <div className="relative">
              <button
                className="nav-btn nav-prev"
                onClick={() => handleMove(-1)}
                aria-label="Anterior"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="carousel-viewport">
                <div
                  className="carousel-track"
                  ref={trackRef}
                  style={{
                    transform: `translateX(-${current * (cardWidth + 20)}px)`,
                  }}
                >
                  {videos.map((video, index) => (
                    <div
                      key={video.id}
                      className={`video-card ${getCardClass(index)}`}
                      data-id={video.embedId}
                    >
                      <div
                        className="video-thumb"
                        onClick={() => handleThumbnailClick(video.embedId)}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`}
                          alt={`Video ${index + 1}`}
                        />
                        <div className="play-btn">
                          <div className="play-icon">
                            <Play size={24} fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="nav-btn nav-next"
                onClick={() => handleMove(1)}
                aria-label="Siguiente"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="dots">
              {videos.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === current ? 'active' : ''}`}
                  onClick={() => handleGoTo(index)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
