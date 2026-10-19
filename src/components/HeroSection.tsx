import React from 'react';
import { motion } from 'motion/react';
import { Ornament } from './Ornaments';
import { Sparkles, Calendar, Clock } from 'lucide-react';

interface HeroSectionProps {
  names: string;
  eventTitle: string;
  subtitle: string;
  quote: string;
  initials: string;
  backgroundImage: string;
  overlay?: number;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  names,
  eventTitle,
  subtitle,
  quote,
  initials,
  backgroundImage,
  overlay = 45,
  primaryColor = '#2E7D32',
  secondaryColor = '#7A4E2E',
  accentColor = '#8DBA7A',
}) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />
      
      {/* Dark overlay & Vignette */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlay / 100 }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#FAF3E8] via-transparent to-black/60"
        aria-hidden="true"
      />

      {/* Ornaments in the 4 corners of the viewport/section */}
      <Ornament
        variant="corner-tl"
        color={accentColor}
        size={80}
        className="absolute left-3 top-3 sm:left-8 sm:top-8 pointer-events-none z-10"
      />
      <Ornament
        variant="corner-tr"
        color={accentColor}
        size={80}
        className="absolute right-3 top-3 sm:right-8 sm:top-8 pointer-events-none z-10"
      />
      <Ornament
        variant="corner-bl"
        color={accentColor}
        size={80}
        className="absolute left-3 bottom-3 sm:left-8 sm:bottom-8 pointer-events-none z-10"
      />
      <Ornament
        variant="corner-br"
        color={accentColor}
        size={80}
        className="absolute right-3 bottom-3 sm:right-8 sm:bottom-8 pointer-events-none z-10"
      />

      {/* Hero Content Container with glass panel styling */}
      <motion.div
        className="relative z-10 max-w-2xl mx-auto flex flex-col items-center px-6 py-10 sm:px-12 rounded-3xl backdrop-blur-sm border border-white/15 bg-black/25 shadow-2xl text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Monogram / XV Emblem */}
        <motion.div
          className="relative mb-5 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-[#8DBA7A]/50 bg-black/30 shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="absolute inset-1 rounded-full border border-dashed border-[#FAF3E8]/30" />
          <span className="font-cormorant text-2xl sm:text-3xl font-light uppercase tracking-widest text-[#FAF3E8]">
            {initials}
          </span>
          <div className="absolute -bottom-1 text-[#8DBA7A]">
            <Sparkles className="w-3.5 h-3.5 fill-[#8DBA7A]" />
          </div>
        </motion.div>

        {/* Small Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center gap-2 mb-2"
        >
          <span className="h-px w-6 bg-[#8DBA7A]/60" />
          <span className="font-montserrat text-xs sm:text-sm uppercase tracking-[0.35em] text-[#8DBA7A] font-medium">
            MIS XV AÑOS
          </span>
          <span className="h-px w-6 bg-[#8DBA7A]/60" />
        </motion.div>

        {/* Celebrant Name */}
        <motion.h1
          className="font-cormorant text-5xl sm:text-7xl font-bold tracking-tight text-[#FAF3E8] drop-shadow-md my-1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65, duration: 0.9 }}
        >
          {names}
        </motion.h1>

        {/* Event Title ("Ambifest") in romantic script font */}
        <motion.p
          className="font-script text-3xl sm:text-5xl text-[#FAF3E8] mb-4 drop-shadow"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {eventTitle}
        </motion.p>

        {/* Divider Ornament */}
        <Ornament variant="divider" color="#8DBA7A" size={50} className="my-1" />

        {/* Subtitle / Quote */}
        {subtitle && (
          <motion.p
            className="font-merriweather italic text-sm sm:text-base text-[#FAF3E8]/90 max-w-lg mb-4 leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.8 }}
          >
            "{subtitle}"
          </motion.p>
        )}

        {/* Emotional Quote */}
        {quote && (
          <motion.p
            className="font-cormorant text-base sm:text-lg text-[#8DBA7A] max-w-md mb-6 leading-normal tracking-wide whitespace-pre-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {quote}
          </motion.p>
        )}

        {/* Date and Time pill */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-5 py-2.5 rounded-full bg-white/10 border border-[#8DBA7A]/40 backdrop-blur-md text-xs sm:text-sm text-[#FAF3E8]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.8 }}
        >
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#8DBA7A]" />
            <span className="font-medium tracking-wide">Viernes 4 de Diciembre de 2026</span>
          </div>
          <span className="hidden sm:inline text-[#8DBA7A]">•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#8DBA7A]" />
            <span className="font-medium tracking-wide">21:00 hs</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-6 flex flex-col items-center gap-2 pointer-events-none z-10 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="relative w-5 h-9 rounded-full border border-white/50 flex items-start justify-center p-1">
          <motion.div
            className="w-1.5 h-2 rounded-full bg-[#8DBA7A]"
            animate={{ y: [0, 14, 0], opacity: [0.9, 0.2, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="font-montserrat text-[10px] uppercase tracking-[0.3em] text-[#8DBA7A]">
          DESLIZA
        </span>
      </motion.div>
    </section>
  );
};
