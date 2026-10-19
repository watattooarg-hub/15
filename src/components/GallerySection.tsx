import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react';
import { Ornament } from './Ornaments';

interface PhotoItem {
  url: string;
  caption: string;
}

interface GallerySectionProps {
  title?: string;
  photos: PhotoItem[];
  primaryColor?: string;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  title = 'Galería',
  photos,
  primaryColor = '#2E7D32',
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-[#F4ECE1] overflow-hidden text-center">
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <Camera className="w-4 h-4 text-[#2E7D32]" />
            <span
              className="font-montserrat text-xs uppercase tracking-[0.3em] font-semibold"
              style={{ color: primaryColor }}
            >
              RECUERDOS INOLVIDABLES
            </span>
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-[#1a2e1a]">
            {title}
          </h2>
          <Ornament variant="divider" color={primaryColor} size={50} className="mt-2" />
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 w-full">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.url}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden shadow-md cursor-pointer border border-white/60 bg-white"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={photo.url}
                  alt={photo.caption || `Foto de Ambar ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Hover overlay with icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-cormorant text-lg text-white font-medium drop-shadow">
                      {photo.caption || 'Ambar — Mis XV'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Cerrar vista completa"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Siguiente foto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image Container */}
            <div
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={photos[selectedIndex].url}
                src={photos[selectedIndex].url}
                alt={photos[selectedIndex].caption || 'Foto en tamaño completo'}
                className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/20"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="mt-4 text-center">
                <p className="font-cormorant text-xl text-white font-medium">
                  {photos[selectedIndex].caption || 'Ambar — Mis XV'}
                </p>
                <p className="font-montserrat text-xs text-white/50 tracking-widest mt-1">
                  {selectedIndex + 1} / {photos.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
