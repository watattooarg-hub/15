import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface EnvelopeSplashScreenProps {
  eventTitle: string;
  names: string;
  primaryColor?: string;
  accentColor?: string;
  onOpen: () => void;
}

export const EnvelopeSplashScreen: React.FC<EnvelopeSplashScreenProps> = ({
  eventTitle,
  names,
  primaryColor = '#2E7D32',
  accentColor = '#8DBA7A',
  onOpen,
}) => {
  const [stage, setStage] = useState<'envelope' | 'opening' | 'done'>('envelope');

  const handleOpen = () => {
    if (stage !== 'envelope') return;
    setStage('opening');
    onOpen(); // triggers audio play & sets audio playing state
    setTimeout(() => {
      setStage('done');
    }, 1300);
  };

  if (stage === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF3E8]/95 backdrop-blur-md px-4 overflow-hidden select-none"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Ambient radial glow */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 320,
            height: 320,
            background: `radial-gradient(circle, ${primaryColor}20 0%, transparent 70%)`,
          }}
          animate={
            stage === 'opening'
              ? { scale: [1, 3], opacity: [0.6, 0] }
              : { scale: [0.9, 1.15, 0.9], opacity: [0.3, 0.5, 0.3] }
          }
          transition={
            stage === 'opening'
              ? { duration: 1.2 }
              : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
          }
        />

        {/* Ambient floating sparkles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 3 + (i % 3) * 1.5,
              height: 3 + (i % 3) * 1.5,
              backgroundColor: i % 2 === 0 ? primaryColor : accentColor,
            }}
            initial={{
              x: (Math.random() - 0.5) * 300,
              y: (Math.random() - 0.5) * 300,
              opacity: 0,
            }}
            animate={{
              y: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 250],
              opacity: [0, 0.7, 0],
              scale: [0.6, 1.3, 0.6],
            }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Envelope Container */}
        <motion.div
          className="relative flex flex-col items-center cursor-pointer"
          onClick={handleOpen}
          whileHover={{ scale: stage === 'envelope' ? 1.03 : 1 }}
          whileTap={{ scale: stage === 'envelope' ? 0.98 : 1 }}
          animate={
            stage === 'opening'
              ? { y: [0, -25, 40], opacity: [1, 1, 0], scale: [1, 1.05, 0.9] }
              : { y: [0, -6, 0] }
          }
          transition={
            stage === 'opening'
              ? { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          {/* Main Envelope Body */}
          <div
            className="relative h-44 w-72 sm:h-52 sm:w-84 rounded-xl shadow-2xl overflow-visible border transition-all"
            style={{
              backgroundColor: '#F4ECE1',
              borderColor: `${primaryColor}40`,
              boxShadow: `0 20px 45px -10px ${primaryColor}25`,
            }}
          >
            {/* Inner Letter Card sliding out */}
            <motion.div
              className="absolute inset-x-4 top-4 bottom-4 rounded-lg flex flex-col items-center justify-center p-4 border text-center"
              style={{
                backgroundColor: '#FFFDF9',
                borderColor: `${accentColor}40`,
                boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
              }}
              animate={
                stage === 'opening'
                  ? { y: -110, opacity: 1, scale: 1.04 }
                  : { y: 0, opacity: 0.85 }
              }
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="font-cormorant text-xs uppercase tracking-[0.3em] font-semibold"
                style={{ color: primaryColor }}
              >
                MIS XV AÑOS
              </span>
              <h2
                className="font-cormorant text-2xl sm:text-3xl font-bold mt-1"
                style={{ color: primaryColor }}
              >
                {names}
              </h2>
              <div
                className="w-12 h-px my-1"
                style={{ backgroundColor: primaryColor, opacity: 0.4 }}
              />
              <span
                className="font-script text-lg sm:text-xl text-[#7A4E2E]"
              >
                {eventTitle}
              </span>
            </motion.div>

            {/* Envelope Bottom Triangle / Fold */}
            <div
              className="absolute inset-x-0 bottom-0 h-28 pointer-events-none rounded-b-xl"
              style={{
                background: `linear-gradient(180deg, transparent, #EFE4D6)`,
                clipPath: 'polygon(0 100%, 100% 100%, 50% 18%)',
                borderBottom: `1px solid ${primaryColor}20`,
              }}
            />

            {/* Envelope Flap Top */}
            <motion.div
              className="absolute inset-x-0 top-0 h-28 origin-top pointer-events-none rounded-t-xl"
              style={{
                background: `linear-gradient(180deg, #F9F2E7, #ECE0D0)`,
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                borderTop: `1px solid ${primaryColor}30`,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))',
              }}
              animate={
                stage === 'opening'
                  ? { rotateX: 180, opacity: 0 }
                  : { rotateX: 0 }
              }
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />

            {/* Wax Seal with Heart Icon */}
            <motion.div
              className="absolute top-1/2 left-1/2 flex items-center justify-center rounded-full shadow-xl border cursor-pointer z-20"
              style={{
                width: 48,
                height: 48,
                transform: 'translate(-50%, -50%)',
                backgroundColor: primaryColor,
                borderColor: `${accentColor}80`,
                boxShadow: `0 0 25px ${primaryColor}60`,
              }}
              animate={
                stage === 'opening'
                  ? { scale: [1, 1.4, 0], rotate: 180, opacity: [1, 1, 0] }
                  : { scale: [1, 1.05, 1] }
              }
              transition={
                stage === 'opening'
                  ? { duration: 0.5 }
                  : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              <Heart className="w-5 h-5 text-[#FAF3E8] fill-[#FAF3E8]" />
            </motion.div>
          </div>

          {/* Action Callout Button */}
          <motion.button
            type="button"
            className="mt-8 flex items-center gap-2 rounded-full px-7 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] shadow-lg transition-transform hover:scale-105"
            style={{
              backgroundColor: primaryColor,
              color: '#FAF3E8',
              boxShadow: `0 8px 25px ${primaryColor}40`,
            }}
            animate={{
              boxShadow: [
                `0 8px 20px ${primaryColor}30`,
                `0 8px 30px ${primaryColor}60`,
                `0 8px 20px ${primaryColor}30`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-[#8DBA7A]" />
            <span>Toca para abrir</span>
          </motion.button>
        </motion.div>

        {/* Footer brand stamp */}
        <motion.p
          className="absolute bottom-6 font-cormorant text-xs uppercase tracking-[0.3em] opacity-40"
          style={{ color: primaryColor }}
        >
          Invitación Digital
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};
