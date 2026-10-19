import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Ban, Check, Shirt } from 'lucide-react';
import { Ornament } from './Ornaments';

interface DressCodeSectionProps {
  title?: string;
  customLabel?: string;
  description?: string;
  additionalNotes?: string;
  colors?: string[];
  avoidColors?: string[];
  primaryColor?: string;
}

export const DressCodeSection: React.FC<DressCodeSectionProps> = ({
  title = 'Código de vestimenta',
  customLabel = 'Elegante',
  description = 'Te pedimos vestir elegante para esta noche tan especial.',
  additionalNotes = 'EVITAR EL VERDE EN TODAS SUS GAMAS',
  colors = ['#c52020', '#b35ed4', '#4f3ed0', '#1a1a2e'],
  avoidColors = ['#6dd0a1', '#4dc77b', '#39a253', '#e8dede', '#ddcda2'],
  primaryColor = '#2E7D32',
}) => {
  return (
    <section className="relative py-20 px-4 sm:px-6 bg-[#FAF3E8] overflow-hidden text-center">
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="w-14 h-14 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/20 flex items-center justify-center mb-3">
            <Shirt className="w-6 h-6 text-[#2E7D32]" />
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-[#1a2e1a]">
            {title}
          </h2>
          <Ornament variant="divider" color={primaryColor} size={50} className="mt-2" />
        </motion.div>

        {/* Dress Code Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full rounded-3xl bg-[#FFFDF9] border border-[#2E7D32]/20 p-8 sm:p-12 shadow-xl shadow-[#2E7D32]/5 flex flex-col items-center"
        >
          {/* Label Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/30 mb-5">
            <Sparkles className="w-4 h-4 text-[#2E7D32]" />
            <span className="font-cormorant text-xl font-bold uppercase tracking-[0.2em] text-[#2E7D32]">
              {customLabel}
            </span>
          </div>

          {/* Description */}
          <p className="font-merriweather text-base sm:text-lg text-[#1a2e1a]/85 max-w-lg mb-8 leading-relaxed">
            {description}
          </p>

          {/* Warning / Prohibited Note */}
          {additionalNotes && (
            <div className="w-full max-w-md p-4 rounded-2xl bg-amber-500/10 border border-amber-600/30 flex items-center justify-center gap-2.5 mb-8">
              <Ban className="w-5 h-5 text-amber-700 shrink-0" />
              <span className="font-montserrat text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-900">
                {additionalNotes}
              </span>
            </div>
          )}

          {/* Color Palettes Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-[#2E7D32]/10">
            {/* Suggested colors */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 mb-4">
                <Check className="w-4 h-4 text-[#2E7D32]" />
                <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.15em] text-[#2E7D32]">
                  Colores sugeridos
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {colors.map((c, i) => (
                  <div
                    key={i}
                    className="relative group w-11 h-11 rounded-full shadow-md transition-transform hover:scale-110 border-2 border-white"
                    style={{ backgroundColor: c }}
                  >
                    <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black/80 text-white text-[10px] px-2 py-0.5 rounded font-mono whitespace-nowrap z-20">
                      {c}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avoid colors */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 mb-4">
                <Ban className="w-4 h-4 text-red-600" />
                <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.15em] text-red-700">
                  Colores a evitar (Gama de verdes)
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {avoidColors.map((c, i) => (
                  <div
                    key={i}
                    className="relative group w-11 h-11 rounded-full shadow-sm transition-transform hover:scale-110 border-2 border-red-300 overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: c }}
                  >
                    {/* Diagonal red line */}
                    <div className="absolute w-full h-0.5 bg-red-600 rotate-45" />
                    <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black/80 text-white text-[10px] px-2 py-0.5 rounded font-mono whitespace-nowrap z-20">
                      Evitar
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
