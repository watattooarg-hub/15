import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Ornament } from './Ornaments';

interface LocationSectionProps {
  title?: string;
  venueName?: string;
  address?: string;
  date?: string;
  time?: string;
  image?: string;
  mapsUrl?: string;
  lat?: number;
  lng?: number;
  primaryColor?: string;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  title = 'Ubicación',
  venueName = 'LA PALOMA EVENTOS SALON 4',
  address = 'Avenida Valentin Vergara 5518 Ranelagh',
  date = 'Viernes 4 de Diciembre de 2026',
  time = '21:00 hrs',
  image = '/images/venue/venue_main.jpg',
  mapsUrl = 'https://maps.app.goo.gl/9WK8LR9H2LMfFBKn9',
  primaryColor = '#2E7D32',
}) => {
  return (
    <section className="relative py-20 px-4 sm:px-6 bg-[#FAF3E8] overflow-hidden text-center">
      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-8"
        >
          <h2 className="font-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-[#2E7D32]">
            {title}
          </h2>
          <div className="w-16 h-0.5 bg-[#2E7D32]/40 mt-3 mb-1" />
        </motion.div>

        {/* Venue Card with photo on top, rounded corners and fade effect */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full rounded-[2rem] bg-[#FFFDF9] border border-[#2E7D32]/15 shadow-xl shadow-[#2E7D32]/5 overflow-hidden text-left relative flex flex-col"
        >
          {/* Top Photo with Rounded Top Corners & Bottom Fade */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-t-[2rem]">
            <img
              src={image}
              alt={venueName}
              className="w-full h-full object-cover"
            />

            {/* Circular badge in top-right */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-md">
              <MapPin className="w-4 h-4" />
            </div>

            {/* Soft gradient fade at the bottom of the photo */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FFFDF9] via-[#FFFDF9]/85 to-transparent pointer-events-none" />
          </div>

          {/* Details Content beneath the faded photo */}
          <div className="p-6 sm:p-8 pt-0 flex flex-col items-start relative">
            {/* Subtle ornamental corner top-left */}
            <div className="w-8 h-8 border-t border-l border-[#2E7D32]/30 rounded-tl-xl mb-4 opacity-70" />

            {/* Venue Name */}
            <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#1a2e1a] tracking-wide mb-5">
              {venueName}
            </h3>

            {/* Date and Time */}
            <div className="flex items-start gap-3 mb-4 text-[#1a2e1a]/85">
              <Calendar className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
              <div className="text-sm sm:text-base font-merriweather font-light leading-relaxed">
                <span className="block font-medium">{date}</span>
                <span className="text-[#7A4E2E]">{time}</span>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 mb-6 text-[#1a2e1a]/85">
              <MapPin className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base font-merriweather font-light leading-relaxed">
                {address}
              </span>
            </div>

            {/* Button: Cómo llegar ↗ */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FAF3E8] border border-[#2E7D32]/30 text-[#2E7D32] text-xs sm:text-sm font-semibold tracking-wider hover:bg-[#2E7D32]/10 active:scale-95 transition-all shadow-xs"
            >
              <span>Cómo llegar</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Embedded Google Maps right below the card as requested */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="w-full mt-6 rounded-[2rem] overflow-hidden border border-[#2E7D32]/20 shadow-xl bg-white"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3275.852222129475!2d-58.20574758836036!3d-34.809659568291124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3286381af1269%3A0x9658768285fb1342!2sLa%20Paloma%20Eventos%2C%20Sal%C3%B3n%20Ranelagh%203!5e0!3m2!1ses-419!2sar!4v1792256385934!5m2!1ses-419!2sar"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Google Maps La Paloma Eventos"
            className="w-full h-[380px]"
          />
        </motion.div>
      </div>
    </section>
  );
};
