import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Copy, Check, Mail, Sparkles } from 'lucide-react';
import { Ornament } from './Ornaments';

interface GiftRegistrySectionProps {
  title?: string;
  message?: string;
  bankName?: string;
  beneficiary?: string;
  clabe?: string;
  primaryColor?: string;
}

export const GiftRegistrySection: React.FC<GiftRegistrySectionProps> = ({
  title = 'Mesa de regalos',
  message = 'Tu presencia es mi mejor regalo. Si deseas tener un detalle conmigo, te comparto algunas opciones.',
  bankName = 'MERCADO PAGO',
  beneficiary = 'Ambar Arguello Vera',
  clabe = 'ALIAS: ambar.arguello.05',
  primaryColor = '#2E7D32',
}) => {
  const [copied, setCopied] = useState(false);

  // Extract clean alias from string
  const rawAlias = clabe.replace(/^ALIAS:\s*/i, '').trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(rawAlias);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-[#F4ECE1] overflow-hidden text-center">
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="w-14 h-14 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/20 flex items-center justify-center mb-3">
            <Gift className="w-6 h-6 text-[#2E7D32]" />
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-[#1a2e1a]">
            {title}
          </h2>
          <Ornament variant="divider" color={primaryColor} size={50} className="mt-2" />
        </motion.div>

        {/* Message */}
        <p className="font-merriweather text-base sm:text-lg text-[#1a2e1a]/85 max-w-lg mb-10 leading-relaxed font-light">
          {message}
        </p>

        {/* Digital Envelope Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full rounded-3xl bg-[#FFFDF9] border border-[#2E7D32]/20 p-8 sm:p-10 shadow-xl shadow-[#2E7D32]/5 flex flex-col items-center relative overflow-hidden"
        >
          {/* Decorative subtle header badge */}
          <div className="flex items-center gap-2 mb-6 text-xs uppercase tracking-[0.2em] font-semibold text-[#7A4E2E]">
            <Mail className="w-4 h-4" />
            <span>Sobre Digital / Transferencia</span>
          </div>

          {/* Bank details grid */}
          <div className="w-full space-y-4 max-w-md text-left bg-[#FAF3E8]/70 p-5 rounded-2xl border border-[#2E7D32]/15">
            <div>
              <span className="block text-[11px] font-montserrat uppercase tracking-wider text-[#7A4E2E] font-medium">
                Entidad bancaria
              </span>
              <span className="font-cormorant text-xl font-bold text-[#1a2e1a]">
                {bankName}
              </span>
            </div>

            <div className="h-px bg-[#2E7D32]/10" />

            <div>
              <span className="block text-[11px] font-montserrat uppercase tracking-wider text-[#7A4E2E] font-medium">
                Titular de la cuenta
              </span>
              <span className="font-cormorant text-xl font-bold text-[#1a2e1a]">
                {beneficiary}
              </span>
            </div>

            <div className="h-px bg-[#2E7D32]/10" />

            <div>
              <span className="block text-[11px] font-montserrat uppercase tracking-wider text-[#7A4E2E] font-medium">
                Alias de Mercado Pago
              </span>
              <div className="flex items-center justify-between gap-3 mt-1">
                <span className="font-mono text-sm sm:text-base font-semibold text-[#2E7D32] bg-white px-3 py-1.5 rounded-lg border border-[#2E7D32]/25 select-all">
                  {rawAlias}
                </span>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2E7D32] text-[#FAF3E8] text-xs font-semibold uppercase tracking-wider transition-all hover:bg-[#256629] active:scale-95 shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Copy feedback toast */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 px-4 py-2 rounded-full bg-[#2E7D32] text-white text-xs font-medium flex items-center gap-2 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8DBA7A]" />
                <span>¡Alias copiado al portapapeles con éxito!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Lluvia de sobres note */}
          <p className="mt-8 text-xs text-[#1a2e1a]/65 max-w-sm text-center leading-relaxed font-merriweather italic">
            También contaremos con un buzón de sobres en la entrada del salón durante la recepción para quienes deseen entregar su detalle en mano.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
