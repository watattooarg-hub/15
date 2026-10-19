import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Send, Music, AlertCircle, Utensils, MessageSquare, Sparkles, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Ornament } from './Ornaments';
import { rsvpService } from '../services/rsvpService';

export interface RsvpResponse {
  id: string;
  name: string;
  phone?: string;
  attending: 'yes' | 'no';
  guestCount: number;
  dietary: string;
  dietaryNotes?: string;
  songRequest?: string;
  message?: string;
  submittedAt: string;
}

interface RsvpSectionProps {
  title?: string;
  subtitle?: string;
  deadline?: string;
  deadlineTime?: string;
  confirmMessage?: string;
  showDietary?: boolean;
  showSongRequest?: boolean;
  whatsappNumber?: string;
  primaryColor?: string;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  title = 'Confirma tu asistencia',
  subtitle = 'Me encantaría contar contigo en este día tan especial',
  deadline = '2026-11-04',
  deadlineTime = '14:00',
  confirmMessage = 'Nos vemos en la fiesta',
  showDietary = true,
  showSongRequest = true,
  whatsappNumber = '5491123226307',
  primaryColor = '#2E7D32',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [dietary, setDietary] = useState('Ninguna');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [songRequest, setSongRequest] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [savedData, setSavedData] = useState<RsvpResponse | null>(null);

  const DEADLINE_ISO = '2026-11-04T14:00:00-03:00';
  const isDeadlinePassed = new Date().getTime() >= new Date(DEADLINE_ISO).getTime();

  useEffect(() => {
    const existing = rsvpService.getCurrentGuestRsvp();
    if (existing) {
      setSavedData(existing);
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDeadlinePassed) return;
    if (!name.trim() || !attending) return;

    const rsvpItem: RsvpResponse = {
      id: savedData?.id || Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      attending,
      guestCount: attending === 'yes' ? guestCount : 0,
      dietary: dietary === 'Otro' ? (dietaryNotes.trim() || 'Otro') : dietary,
      dietaryNotes: dietaryNotes.trim(),
      songRequest: songRequest.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    setSavedData(rsvpItem);
    await rsvpService.save(rsvpItem);

    // Trigger celebration confetti if attending
    if (attending === 'yes') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2E7D32', '#8DBA7A', '#FAF3E8', '#7A4E2E', '#c52020'],
      });
    }

    setSubmitted(true);
  };

  const handleSendWhatsApp = () => {
    if (!savedData) return;
    const isAttending = savedData.attending === 'yes';
    let text = `¡Hola Ambar! 💖 Confirmo mi respuesta para tus 15 (*Ambifest*):\n\n`;
    text += `👤 *Nombre:* ${savedData.name}\n`;
    if (savedData.phone) {
      text += `📱 *Teléfono:* ${savedData.phone}\n`;
    }
    text += `✨ *¿Asistiré?:* ${isAttending ? '¡Sí, con mucho gusto!' : 'Lamentablemente no podré ir'}\n`;
    if (isAttending) {
      text += `🎟️ *Pases:* ${savedData.guestCount}\n`;
      if (savedData.dietary && savedData.dietary !== 'Ninguna') {
        text += `🍽️ *Restricción alimentaria:* ${savedData.dietary}\n`;
      }
      if (savedData.songRequest) {
        text += `🎵 *Canción para la fiesta:* ${savedData.songRequest}\n`;
      }
    }
    if (savedData.message) {
      text += `💌 *Mensaje:* ${savedData.message}\n`;
    }

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleEdit = () => {
    if (isDeadlinePassed) return;
    if (savedData) {
      setName(savedData.name);
      setPhone(savedData.phone || '');
      setAttending(savedData.attending);
      setGuestCount(savedData.guestCount || 1);
      setDietary(savedData.dietary || 'Ninguna');
      setDietaryNotes(savedData.dietaryNotes || '');
      setSongRequest(savedData.songRequest || '');
      setMessage(savedData.message || '');
    }
    setSubmitted(false);
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
          <span
            className="font-montserrat text-xs uppercase tracking-[0.3em] font-semibold mb-2"
            style={{ color: primaryColor }}
          >
            CONFIRMACIÓN DE ASISTENCIA
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-[#1a2e1a]">
            {title}
          </h2>
          <p className="font-merriweather italic text-sm sm:text-base text-[#1a2e1a]/80 mt-2 max-w-md">
            {subtitle}
          </p>
          <Ornament variant="divider" color={primaryColor} size={50} className="mt-2" />
        </motion.div>

        {/* Deadline Notice */}
        <div className={`mb-8 px-5 py-2.5 rounded-full border flex items-center gap-2 text-xs sm:text-sm ${
          isDeadlinePassed
            ? 'bg-red-50 border-red-300 text-red-800'
            : 'bg-[#FAF3E8] border-[#2E7D32]/20 text-[#7A4E2E]'
        }`}>
          <AlertCircle className={`w-4 h-4 ${isDeadlinePassed ? 'text-red-600' : 'text-[#2E7D32]'}`} />
          <span>
            {isDeadlinePassed ? (
              <strong>El período de confirmación finalizó el 4 de Noviembre de 2026 a las {deadlineTime} hs.</strong>
            ) : (
              <>Fecha límite de confirmación: <strong>4 de Noviembre de 2026</strong> a las <strong>{deadlineTime} hs (Argentina)</strong></>
            )}
          </span>
        </div>

        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full rounded-3xl bg-[#FFFDF9] border border-[#2E7D32]/20 p-8 sm:p-12 shadow-xl shadow-[#2E7D32]/5 text-left"
        >
          {isDeadlinePassed ? (
            <div className="flex flex-col items-center text-center py-8 px-2">
              <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mb-4 text-red-600 shadow-inner">
                <AlertCircle className="w-8 h-8" />
              </div>
              <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-red-700 font-bold mb-1">
                CONFIRMACIONES CERRADAS
              </span>
              <h3 className="font-cormorant text-3xl font-bold text-[#1a2e1a] mb-3">
                Plazo de Confirmación Finalizado
              </h3>
              <p className="font-merriweather text-sm sm:text-base text-[#1a2e1a]/85 max-w-md leading-relaxed mb-4">
                El período de confirmación cerró el <strong>4 de Noviembre de 2026 a las 14:00 hs (hora argentina)</strong>. La página ya no acepta más respuestas.
              </p>
              <p className="text-xs text-[#7A4E2E] max-w-sm mb-6">
                Si necesitas comunicarte por un caso particular o consultar disponibilidad, por favor contacta directamente a la familia o a Ambar.
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola! Me comunico respecto a los 15 de Ambar.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md hover:bg-[#20bd5a] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Contactar a los Organizadores</span>
              </a>
            </div>
          ) : submitted && savedData ? (
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#2E7D32]/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-[#2E7D32]" />
              </div>
              <h3 className="font-cormorant text-3xl font-bold text-[#1a2e1a] mb-1">
                ¡Gracias, {savedData.name}!
              </h3>
              {savedData.phone && (
                <div className="flex items-center gap-1.5 text-xs text-[#7A4E2E] font-medium mb-3">
                  <Phone className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>{savedData.phone}</span>
                </div>
              )}
              <p className="font-merriweather text-base text-[#2E7D32] font-semibold mb-4">
                {savedData.attending === 'yes' ? confirmMessage : 'Hemos registrado que no podrás asistir.'}
              </p>
              <p className="text-xs text-[#1a2e1a]/70 max-w-sm mb-8 leading-relaxed">
                Tu confirmación ha sido guardada en el sistema. Puedes enviar un comprobante directo por WhatsApp a Ambar.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md hover:bg-[#20bd5a] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Enviar por WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleEdit}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-full border border-[#2E7D32]/30 text-xs text-[#1a2e1a] hover:bg-[#2E7D32]/5 transition-colors"
                >
                  Modificar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-montserrat uppercase tracking-wider font-semibold text-[#1a2e1a] mb-2">
                  Nombre y Apellido *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Camila Morales"
                  className="w-full px-4 py-3 rounded-xl border border-[#2E7D32]/25 bg-white text-sm text-[#1a2e1a] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/50 transition-all placeholder:text-[#1a2e1a]/40"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-montserrat uppercase tracking-wider font-semibold text-[#1a2e1a] mb-2 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Número de Teléfono / WhatsApp *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej. 11 2345-6789 o +54 9 11 2345-6789"
                  className="w-full px-4 py-3 rounded-xl border border-[#2E7D32]/25 bg-white text-sm text-[#1a2e1a] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/50 transition-all placeholder:text-[#1a2e1a]/40"
                />
              </div>

              {/* Attendance Radio Buttons */}
              <div>
                <label className="block text-xs font-montserrat uppercase tracking-wider font-semibold text-[#1a2e1a] mb-2">
                  ¿Asistirás a la fiesta? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`flex items-center justify-center gap-2.5 p-4 rounded-xl border transition-all ${
                      attending === 'yes'
                        ? 'border-[#2E7D32] bg-[#2E7D32]/10 text-[#2E7D32] font-semibold ring-2 ring-[#2E7D32]/30 shadow-sm'
                        : 'border-[#2E7D32]/20 bg-white text-[#1a2e1a]/80 hover:bg-[#2E7D32]/5'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                    <span className="text-sm">¡Sí, asistiré!</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`flex items-center justify-center gap-2.5 p-4 rounded-xl border transition-all ${
                      attending === 'no'
                        ? 'border-red-500 bg-red-50 text-red-600 font-semibold ring-2 ring-red-300 shadow-sm'
                        : 'border-[#2E7D32]/20 bg-white text-[#1a2e1a]/80 hover:bg-red-50/50'
                    }`}
                  >
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="text-sm">No podré asistir</span>
                  </button>
                </div>
              </div>

              {attending === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-6 pt-2"
                >
                  {/* Guest Passes */}
                  <div>
                    <label className="block text-xs font-montserrat uppercase tracking-wider font-semibold text-[#1a2e1a] mb-2">
                      Cantidad de pases a confirmar
                    </label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuestCount(num)}
                          className={`w-12 h-12 rounded-xl border flex items-center justify-center font-cormorant text-xl font-bold transition-all ${
                            guestCount === num
                              ? 'border-[#2E7D32] bg-[#2E7D32] text-white shadow-md'
                              : 'border-[#2E7D32]/20 bg-white text-[#1a2e1a] hover:bg-[#2E7D32]/10'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dietary Restrictions */}
                  {showDietary && (
                    <div>
                      <label className="block text-xs font-montserrat uppercase tracking-wider font-semibold text-[#1a2e1a] mb-2 flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-[#2E7D32]" />
                        <span>Restricciones alimentarias / Menú especial</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['Ninguna', 'Celíaco', 'Vegetariano', 'Vegano', 'Otro'].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setDietary(item)}
                            className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                              dietary === item
                                ? 'border-[#2E7D32] bg-[#2E7D32]/15 text-[#2E7D32] font-semibold'
                                : 'border-[#2E7D32]/20 bg-white text-[#1a2e1a]/80 hover:bg-[#2E7D32]/5'
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>

                      {dietary === 'Otro' && (
                        <input
                          type="text"
                          value={dietaryNotes}
                          onChange={(e) => setDietaryNotes(e.target.value)}
                          placeholder="Especificar alergias o requerimientos..."
                          className="mt-2 w-full px-4 py-2.5 rounded-xl border border-[#2E7D32]/25 bg-white text-xs text-[#1a2e1a] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/50"
                        />
                      )}
                    </div>
                  )}

                  {/* Song Request */}
                  {showSongRequest && (
                    <div>
                      <label className="block text-xs font-montserrat uppercase tracking-wider font-semibold text-[#1a2e1a] mb-2 flex items-center gap-1.5">
                        <Music className="w-3.5 h-3.5 text-[#2E7D32]" />
                        <span>¿Qué canción no puede faltar en la fiesta?</span>
                      </label>
                      <input
                        type="text"
                        value={songRequest}
                        onChange={(e) => setSongRequest(e.target.value)}
                        placeholder="Ej. Un Verano Sin Ti - Bad Bunny / Taylor Swift..."
                        className="w-full px-4 py-3 rounded-xl border border-[#2E7D32]/25 bg-white text-sm text-[#1a2e1a] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/50 placeholder:text-[#1a2e1a]/40"
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {/* Message for the Birthday Girl */}
              <div>
                <label className="block text-xs font-montserrat uppercase tracking-wider font-semibold text-[#1a2e1a] mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Mensaje de dedicatoria para Ambar</span>
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="¡Escribe un lindo deseo para Ambar en sus 15!"
                  className="w-full px-4 py-3 rounded-xl border border-[#2E7D32]/25 bg-white text-sm text-[#1a2e1a] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/50 placeholder:text-[#1a2e1a]/40 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!name.trim() || !attending}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] shadow-lg transition-all ${
                  !name.trim() || !attending
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#2E7D32] text-[#FAF3E8] hover:bg-[#256629] active:scale-98 shadow-[#2E7D32]/30 cursor-pointer'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Confirmar mi asistencia</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
