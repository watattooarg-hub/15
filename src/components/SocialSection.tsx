import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Hash, Copy, Check, Sparkles, Video } from 'lucide-react';
import { Ornament } from './Ornaments';

interface SocialSectionProps {
  title?: string;
  hashtag?: string;
  instagramUrl?: string;
  instagramUser?: string;
  tiktokUrl?: string;
  tiktokUser?: string;
  primaryColor?: string;
}

export const SocialSection: React.FC<SocialSectionProps> = ({
  title = 'Los Mejores Momentos',
  hashtag = '#XVambi',
  instagramUrl = 'https://www.instagram.com/ambii.85/',
  instagramUser = '@ambii.85',
  tiktokUrl = 'https://www.tiktok.com/@ambii.85?_r=1&_t=ZS-9AYnqgX0b4b',
  tiktokUser = '@ambii.85',
  primaryColor = '#2E7D32',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyHashtag = () => {
    navigator.clipboard.writeText(hashtag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
            <Instagram className="w-6 h-6 text-[#2E7D32]" />
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-[#1a2e1a]">
            {title}
          </h2>
          <Ornament variant="divider" color={primaryColor} size={50} className="mt-2" />
        </motion.div>

        {/* Hashtag & Social Media Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full rounded-3xl bg-[#FFFDF9] border border-[#2E7D32]/20 p-8 sm:p-12 shadow-xl shadow-[#2E7D32]/5 flex flex-col items-center"
        >
          <p className="font-merriweather text-sm sm:text-base text-[#1a2e1a]/85 max-w-lg mb-8 leading-relaxed font-light">
            Durante la noche, comparte tus fotos y videos usando nuestro hashtag oficial para que podamos revivir juntos cada momento.
          </p>

          {/* Hashtag interactive pill */}
          <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#FAF3E8] border border-[#2E7D32]/30 mb-8 shadow-inner">
            <Hash className="w-5 h-5 text-[#2E7D32]" />
            <span className="font-cormorant text-2xl sm:text-3xl font-bold tracking-wider text-[#2E7D32]">
              {hashtag.replace(/^#/, '')}
            </span>
            <button
              type="button"
              onClick={handleCopyHashtag}
              className="ml-2 p-1.5 rounded-full hover:bg-[#2E7D32]/10 text-[#7A4E2E] transition-colors"
              title="Copiar hashtag"
            >
              {copied ? <Check className="w-4 h-4 text-[#2E7D32]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Social Network Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-md">
            {/* Instagram */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[160px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md hover:opacity-95 active:scale-95 transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>

            {/* TikTok */}
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[160px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#000000] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md hover:bg-neutral-800 active:scale-95 transition-all"
            >
              <Video className="w-4 h-4 text-[#25F4EE]" />
              <span>TikTok</span>
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs text-[#7A4E2E]/80">
            <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>Etiqueta a Ambar ({instagramUser}) en tus publicaciones</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
