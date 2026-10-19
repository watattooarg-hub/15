import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Ornament } from './Ornaments';

interface CountdownSectionProps {
  title?: string;
  targetDate?: string;
  completedMessage?: string;
  primaryColor?: string;
  accentColor?: string;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  title = 'Cuenta regresiva',
  targetDate = '2026-12-04T21:00:00-03:00',
  completedMessage = '¡Hoy es mi gran día!',
  primaryColor = '#2E7D32',
  accentColor = '#8DBA7A',
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isCompleted: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { label: 'DÍAS', value: timeLeft.days, max: 365 },
    { label: 'HORAS', value: timeLeft.hours, max: 24 },
    { label: 'MINUTOS', value: timeLeft.minutes, max: 60 },
    { label: 'SEGUNDOS', value: timeLeft.seconds, max: 60 },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-[#FAF3E8] overflow-hidden text-center">
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Section title & flourish */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-10"
        >
          <span
            className="font-montserrat text-xs uppercase tracking-[0.3em] font-semibold mb-2"
            style={{ color: primaryColor }}
          >
            FALTA MUY POCO
          </span>
          <h2
            className="font-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-[#1a2e1a]"
          >
            {title}
          </h2>
          <Ornament variant="divider" color={primaryColor} size={50} className="mt-2" />
        </motion.div>

        {timeLeft.isCompleted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 rounded-2xl bg-white shadow-xl border border-[#2E7D32]/20 max-w-md"
          >
            <h3 className="font-cormorant text-3xl font-bold text-[#2E7D32]">
              {completedMessage}
            </h3>
            <p className="mt-2 font-merriweather text-sm text-[#1a2e1a]/80">
              ¡Acompáñame a celebrar esta noche tan esperada!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex flex-col items-center"
          >
            {/* Countdown Grid Cards with circular rings */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl">
              {timeUnits.map((unit) => {
                const fraction = Math.min(1, Math.max(0, unit.value / unit.max));
                const strokeDash = 226;
                const strokeOffset = strokeDash - strokeDash * fraction;

                return (
                  <div
                    key={unit.label}
                    className="flex flex-col items-center justify-center p-5 sm:p-7 rounded-2xl bg-[#FFFDF9] border border-[#2E7D32]/15 shadow-lg shadow-[#2E7D32]/5 transition-transform hover:-translate-y-1"
                  >
                    <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-2">
                      {/* Circular Progress Ring */}
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          fill="none"
                          stroke={primaryColor}
                          strokeWidth="2"
                          opacity="0.1"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          fill="none"
                          stroke={primaryColor}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray={strokeDash}
                          strokeDashoffset={strokeOffset}
                          style={{
                            transition: 'stroke-dashoffset 1s ease',
                          }}
                        />
                      </svg>
                      <span className="font-cormorant text-3xl sm:text-4xl font-bold text-[#2E7D32]">
                        {String(unit.value).padStart(2, '0')}
                      </span>
                    </div>

                    <span className="font-montserrat text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#7A4E2E]">
                      {unit.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
