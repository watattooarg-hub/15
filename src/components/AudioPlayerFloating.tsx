import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerFloatingProps {
  musicUrl: string;
  coverImage: string;
  autoPlayTrigger?: boolean;
  primaryColor?: string;
  accentColor?: string;
}

export const AudioPlayerFloating: React.FC<AudioPlayerFloatingProps> = ({
  musicUrl,
  coverImage,
  autoPlayTrigger = false,
  primaryColor = '#2E7D32',
  accentColor = '#8DBA7A',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle autoPlay when envelope opens
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !hasInteracted) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Autoplay prevented by browser:', err);
        });
    }
  }, [autoPlayTrigger, hasInteracted]);

  const togglePlay = () => {
    setHasInteracted(true);
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Audio play error:', err));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 select-none">
        {/* Main Floating Capsule */}
        <motion.div
          className="flex items-center gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#2E7D32]/30 shadow-2xl cursor-pointer transition-all hover:shadow-[#2E7D32]/20"
          onClick={togglePlay}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          {/* Spinning Vinyl Disk with Album Cover */}
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#2E7D32]/40 shadow-inner flex items-center justify-center bg-black">
            <img
              src={coverImage}
              alt="Música de fondo"
              className={`w-full h-full object-cover rounded-full ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            />
            {/* Center vinyl spindle hole */}
            <div className="absolute w-2.5 h-2.5 rounded-full bg-white border border-black shadow" />
          </div>

          {/* Equalizer animation & Title */}
          <div className="hidden sm:flex flex-col items-start pr-1">
            <span className="font-montserrat text-[10px] uppercase tracking-wider font-semibold text-[#7A4E2E]">
              Música de fondo
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-cormorant text-xs font-bold text-[#1a2e1a]">
                Ambifest XV
              </span>
              {/* Equalizer bars */}
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3 ml-1">
                  <motion.div
                    className="w-0.5 bg-[#2E7D32] rounded-full"
                    animate={{ height: ['20%', '100%', '30%'] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="w-0.5 bg-[#2E7D32] rounded-full"
                    animate={{ height: ['80%', '20%', '90%'] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="w-0.5 bg-[#2E7D32] rounded-full"
                    animate={{ height: ['40%', '90%', '20%'] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Play / Pause Toggle Button */}
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors shadow-sm"
            style={{
              backgroundColor: isPlaying ? primaryColor : '#FAF3E8',
              color: isPlaying ? '#FAF3E8' : primaryColor,
              border: `1px solid ${primaryColor}40`,
            }}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </div>

          {/* Mute button */}
          <button
            type="button"
            onClick={toggleMute}
            className="p-1 rounded-full text-[#7A4E2E] hover:text-[#2E7D32] hover:bg-[#2E7D32]/10 transition-colors"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </motion.div>
      </div>
    </>
  );
};
