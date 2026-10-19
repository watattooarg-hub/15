import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Phone,
  MessageCircle,
  Download,
  Search,
  Filter,
  Plus,
  Trash2,
  Music,
  Utensils,
  ArrowLeft,
  Users,
  Calendar,
  Sparkles,
  LogOut,
  RefreshCw,
} from 'lucide-react';
import { RsvpResponse } from './RsvpSection';
import { Ornament } from './Ornaments';
import { rsvpService } from '../services/rsvpService';

interface MidasSecretSectionProps {
  onBackToInvite: () => void;
  primaryColor?: string;
  accentColor?: string;
}

export const MidasSecretSection: React.FC<MidasSecretSectionProps> = ({
  onBackToInvite,
  primaryColor = '#2E7D32',
  accentColor = '#8DBA7A',
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ambifest_midas_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [shake, setShake] = useState(false);

  // RSVPs State
  const [rsvps, setRsvps] = useState<RsvpResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'yes' | 'no' | 'dietary' | 'music'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New manual guest form state
  const [newGuest, setNewGuest] = useState({
    name: '',
    phone: '',
    attending: 'yes' as 'yes' | 'no',
    guestCount: 1,
    dietary: 'Ninguna',
    dietaryNotes: '',
    songRequest: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const loadRsvps = async () => {
    setIsLoading(true);
    try {
      const list = await rsvpService.getAll();
      setRsvps(list);
    } catch (e) {
      console.error('Error fetching RSVPs:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('¿Seguro que deseas vaciar toda la lista de confirmaciones y dejar el panel en cero?')) {
      await rsvpService.clearAll();
      setRsvps([]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadRsvps();
      // Auto-refresh every 12 seconds while in admin panel to capture new confirmations from guests
      const interval = setInterval(() => {
        loadRsvps();
      }, 12000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'Ambar$') {
      setIsAuthenticated(true);
      sessionStorage.setItem('ambifest_midas_auth', 'true');
      setAuthError('');
      loadRsvps();
    } else {
      setAuthError('Código incorrecto. Verifica mayúsculas y caracteres (Ambar$).');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ambifest_midas_auth');
    setPasswordInput('');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Seguro que deseas eliminar este registro de invitado?')) {
      const updated = await rsvpService.delete(id);
      setRsvps(updated);
    }
  };

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuest.name.trim()) return;

    const created: RsvpResponse = {
      id: Date.now().toString(),
      name: newGuest.name.trim(),
      phone: newGuest.phone.trim(),
      attending: newGuest.attending,
      guestCount: newGuest.attending === 'yes' ? newGuest.guestCount : 0,
      dietary: newGuest.dietary,
      dietaryNotes: newGuest.dietaryNotes.trim(),
      songRequest: newGuest.songRequest.trim(),
      message: newGuest.message.trim(),
      submittedAt: new Date().toISOString(),
    };

    const updated = await rsvpService.save(created);
    setRsvps(updated);

    setNewGuest({
      name: '',
      phone: '',
      attending: 'yes',
      guestCount: 1,
      dietary: 'Ninguna',
      dietaryNotes: '',
      songRequest: '',
      message: '',
    });
    setIsAddModalOpen(false);
  };

  const handleExportCSV = () => {
    if (rsvps.length === 0) return;
    const headers = [
      'Nombre y Apellido',
      'Telefono / WhatsApp',
      'Asistencia',
      'Cantidad de Personas / Pases',
      'Restriccion Alimentaria',
      'Detalle Dieta',
      'Cancion para DJ',
      'Mensaje Dedicatoria',
      'Fecha y Hora Registro',
    ];

    const rows = rsvps.map((r) => [
      `"${r.name}"`,
      `"${r.phone || ''}"`,
      r.attending === 'yes' ? 'SÍ ASISTE' : 'NO ASISTE',
      r.guestCount,
      `"${r.dietary || 'Ninguna'}"`,
      `"${r.dietaryNotes || ''}"`,
      `"${r.songRequest || ''}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      `"${new Date(r.submittedAt).toLocaleString('es-AR')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `invitados-ambifest-midas-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics
  const attendingList = rsvps.filter((r) => r.attending === 'yes');
  const declinedList = rsvps.filter((r) => r.attending === 'no');
  const totalPasses = attendingList.reduce((acc, curr) => acc + (curr.guestCount || 1), 0);
  const dietaryList = attendingList.filter((r) => r.dietary && r.dietary !== 'Ninguna');
  const musicList = attendingList.filter((r) => r.songRequest && r.songRequest.trim().length > 0);

  // Filtered
  const filtered = rsvps.filter((r) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      r.name.toLowerCase().includes(q) ||
      (r.phone && r.phone.toLowerCase().includes(q)) ||
      (r.songRequest && r.songRequest.toLowerCase().includes(q)) ||
      (r.dietary && r.dietary.toLowerCase().includes(q)) ||
      (r.message && r.message.toLowerCase().includes(q));

    if (!matchSearch) return false;

    if (selectedFilter === 'yes') return r.attending === 'yes';
    if (selectedFilter === 'no') return r.attending === 'no';
    if (selectedFilter === 'dietary') return r.attending === 'yes' && r.dietary && r.dietary !== 'Ninguna';
    if (selectedFilter === 'music') return r.songRequest && r.songRequest.trim().length > 0;
    return true;
  });

  // 1. Password Protection Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF3E8] flex flex-col items-center justify-center p-4 relative overflow-hidden text-center">
        {/* Ambient background decoration */}
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${primaryColor}15 0%, transparent 70%)`,
          }}
        />

        <motion.div
          className={`relative z-10 w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#2E7D32]/25 ${
            shake ? 'animate-bounce' : ''
          }`}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/30 flex items-center justify-center mx-auto mb-4 text-[#2E7D32] shadow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#7A4E2E] font-semibold">
            ACCESO CONFIDENCIAL • MIDAS
          </span>

          <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#1a2e1a] mt-1 mb-2">
            Portal Privado
          </h2>

          <p className="text-xs text-[#1a2e1a]/70 mb-6 font-merriweather">
            Ingresa el código de acceso para visualizar la lista completa de invitados, confirmaciones, teléfonos y detalles del evento.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative text-left">
              <label className="block text-xs font-montserrat uppercase tracking-wider font-semibold text-[#1a2e1a] mb-1.5 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>Código de Acceso</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder="Ingresa el código..."
                  className="w-full pl-4 pr-11 py-3 rounded-xl border border-[#2E7D32]/30 bg-[#FAF3E8]/40 text-sm font-mono text-[#1a2e1a] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/50"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <p className="text-xs text-red-600 mt-2 font-medium">
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#2E7D32] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] shadow-lg shadow-[#2E7D32]/30 hover:bg-[#256629] active:scale-98 transition-all cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Desbloquear Portal</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center">
            <button
              type="button"
              onClick={onBackToInvite}
              className="inline-flex items-center gap-1.5 text-xs text-[#7A4E2E] hover:text-[#2E7D32] font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la Invitación Digital</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. Authenticated Secret /MIDAS Dashboard
  return (
    <div className="min-h-screen bg-[#FAF3E8] text-[#1a2e1a] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Navbar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#2E7D32]/20 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2E7D32] text-[#FAF3E8] flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-montserrat text-[10px] uppercase tracking-[0.3em] font-bold text-[#2E7D32] bg-[#2E7D32]/10 px-2 py-0.5 rounded-md">
                  PORTAL SECRETO MIDAS
                </span>
                <span className="text-xs text-gray-400 font-mono">/midas</span>
              </div>
              <h1 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#1a2e1a]">
                Ambifest — Lista y Gestión de Confirmaciones
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={loadRsvps}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 active:scale-95 transition-all shadow-xs cursor-pointer"
              title="Actualizar lista en tiempo real"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#2E7D32]' : ''}`} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2E7D32] text-white text-xs font-semibold hover:bg-[#256629] transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Invitado</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#2E7D32]/30 text-[#2E7D32] text-xs font-semibold hover:bg-[#2E7D32]/5 transition-all shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Excel / CSV</span>
            </button>

            {rsvps.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold hover:bg-red-100 transition-all shadow-xs"
                title="Vaciar toda la lista"
              >
                <Trash2 className="w-4 h-4" />
                <span>Vaciar Lista</span>
              </button>
            )}

            <button
              type="button"
              onClick={onBackToInvite}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF3E8] border border-gray-200 text-[#1a2e1a] text-xs font-semibold hover:bg-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ver Invitación</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Total Passes */}
          <div className="p-5 rounded-2xl bg-white border border-[#2E7D32]/20 shadow-md flex flex-col justify-between">
            <span className="font-montserrat text-[11px] uppercase tracking-wider text-[#7A4E2E] font-semibold">
              Total Pases Confirmados
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-cormorant text-4xl font-bold text-[#2E7D32]">
                {totalPasses}
              </span>
              <span className="text-xs text-gray-500">personas</span>
            </div>
          </div>

          {/* Attending Yes */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-montserrat text-[11px] uppercase tracking-wider text-emerald-800 font-semibold">
                Asistirán (Sí)
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-cormorant text-4xl font-bold text-emerald-700">
                {attendingList.length}
              </span>
              <span className="text-xs text-emerald-600">familias/grupos</span>
            </div>
          </div>

          {/* Attending No */}
          <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-montserrat text-[11px] uppercase tracking-wider text-red-800 font-semibold">
                No Asisten (No)
              </span>
              <XCircle className="w-4 h-4 text-red-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-cormorant text-4xl font-bold text-red-600">
                {declinedList.length}
              </span>
              <span className="text-xs text-red-600">respuestas</span>
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-montserrat text-[11px] uppercase tracking-wider text-amber-800 font-semibold">
                Menús Especiales
              </span>
              <Utensils className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-cormorant text-4xl font-bold text-amber-700">
                {dietaryList.length}
              </span>
              <span className="text-xs text-amber-700">dietas/alergias</span>
            </div>
          </div>

          {/* Music Song Requests */}
          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 shadow-md flex flex-col justify-between col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="font-montserrat text-[11px] uppercase tracking-wider text-purple-800 font-semibold">
                Canciones para DJ
              </span>
              <Music className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-cormorant text-4xl font-bold text-purple-700">
                {musicList.length}
              </span>
              <span className="text-xs text-purple-700">sugerencias</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl bg-white border border-[#2E7D32]/20 shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, teléfono, canción, menú o dedicatoria..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/40"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedFilter === 'all'
                  ? 'bg-[#2E7D32] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos ({rsvps.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('yes')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedFilter === 'yes'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              Confirmados ({attendingList.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('no')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedFilter === 'no'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-red-50 text-red-800 hover:bg-red-100'
              }`}
            >
              Rechazados ({declinedList.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('dietary')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedFilter === 'dietary'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              Con Dieta ({dietaryList.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('music')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedFilter === 'music'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
              }`}
            >
              Con Canción ({musicList.length})
            </button>
          </div>
        </div>

        {/* Guest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full py-16 px-4 bg-white rounded-3xl border border-dashed border-[#2E7D32]/25 text-center">
              <Users className="w-10 h-10 text-[#2E7D32]/40 mx-auto mb-3" />
              <h3 className="font-cormorant text-2xl font-bold text-[#1a2e1a] mb-1">
                {rsvps.length === 0
                  ? 'Aún no hay confirmaciones registradas'
                  : 'No se encontraron invitados con los filtros actuales'}
              </h3>
              <p className="text-xs text-[#1a2e1a]/60 max-w-md mx-auto">
                {rsvps.length === 0
                  ? 'El panel está completamente limpio. A medida que tus invitados confirmen su asistencia desde la invitación digital, sus nombres, teléfonos y respuestas aparecerán aquí automáticamente en tiempo real.'
                  : 'Prueba cambiando los términos de búsqueda o el filtro seleccionado arriba.'}
              </p>
            </div>
          ) : (
            filtered.map((rsvp) => {
              const cleanPhone = rsvp.phone ? rsvp.phone.replace(/[^0-9+]/g, '') : '';
              const whatsappChatUrl = cleanPhone
                ? `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
                    `Hola ${rsvp.name}! Te escribimos de parte de Ambar por tu confirmación para Ambifest 💖`
                  )}`
                : null;

              return (
                <div
                  key={rsvp.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-[#2E7D32]/15 shadow-md hover:border-[#2E7D32]/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Header: Name, Phone underneath, Status badge */}
                    <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
                      <div>
                        {/* 1. Nombre y Apellido */}
                        <h3 className="font-cormorant text-2xl font-bold text-[#1a2e1a]">
                          {rsvp.name}
                        </h3>

                        {/* 2. Número de teléfono debajo de nombre y apellido */}
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="w-3.5 h-3.5 text-[#2E7D32]" />
                          <span className="font-mono text-xs font-semibold text-[#7A4E2E]">
                            {rsvp.phone || 'Sin teléfono registrado'}
                          </span>

                          {whatsappChatUrl && (
                            <a
                              href={whatsappChatUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md hover:bg-emerald-100 transition-colors"
                              title="Enviar mensaje por WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3 text-[#25D366]" />
                              <span>WhatsApp</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Status & Passes Badge */}
                      {rsvp.attending === 'yes' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{rsvp.guestCount} {rsvp.guestCount === 1 ? 'PASE' : 'PASES'}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-red-800 bg-red-100 border border-red-300">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>NO ASISTIRÁ</span>
                        </span>
                      )}
                    </div>

                    {/* Details: Dietary, Song Request, Dedication */}
                    {rsvp.attending === 'yes' && (
                      <div className="space-y-2 pt-1 text-xs">
                        {/* Dietary restriction */}
                        <div className="flex items-start gap-2 bg-[#FAF3E8]/80 p-2.5 rounded-xl border border-[#2E7D32]/10">
                          <Utensils className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-[#7A4E2E] mr-1">
                              Menú / Dieta:
                            </span>
                            <span className="font-medium text-[#1a2e1a]">
                              {rsvp.dietary || 'Ninguna'}
                            </span>
                            {rsvp.dietaryNotes && (
                              <p className="text-[11px] text-gray-500 mt-0.5 italic">
                                Nota: {rsvp.dietaryNotes}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Song request */}
                        {rsvp.songRequest && (
                          <div className="flex items-start gap-2 bg-purple-50/70 p-2.5 rounded-xl border border-purple-200/50">
                            <Music className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-purple-900 mr-1">
                                Canción solicitada para el DJ:
                              </span>
                              <span className="font-medium text-purple-800">
                                {rsvp.songRequest}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Dedication Message */}
                    {rsvp.message && (
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <span className="block text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-1">
                          Mensaje de dedicatoria para Ambar:
                        </span>
                        <p className="font-merriweather italic text-xs text-gray-700 leading-relaxed">
                          "{rsvp.message}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Timestamp and delete */}
                  <div className="flex items-center justify-between pt-4 mt-3 border-t border-gray-100 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span>{new Date(rsvp.submittedAt).toLocaleDateString('es-AR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDelete(rsvp.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Eliminar registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Manual Guest Add Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#2E7D32]/25 max-h-[90vh] overflow-y-auto text-left"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <h3 className="font-cormorant text-2xl font-bold text-[#1a2e1a] mb-1">
                Registrar Invitado Manualmente
              </h3>
              <p className="text-xs text-[#7A4E2E] mb-5">
                Ingresa una confirmación recibida por llamada o mensaje para sumar a las estadísticas.
              </p>

              <form onSubmit={handleAddGuest} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={newGuest.name}
                    onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                    placeholder="Ej. Lucas Bianchi"
                    className="w-full px-3 py-2 rounded-xl border text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">
                    Número de Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newGuest.phone}
                    onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                    placeholder="Ej. +54 9 11 1234-5678"
                    className="w-full px-3 py-2 rounded-xl border text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">
                    ¿Asiste?
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setNewGuest({ ...newGuest, attending: 'yes' })}
                      className={`flex-1 py-2 rounded-xl border font-bold ${
                        newGuest.attending === 'yes' ? 'bg-emerald-600 text-white' : 'bg-gray-50'
                      }`}
                    >
                      Sí Asiste
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewGuest({ ...newGuest, attending: 'no' })}
                      className={`flex-1 py-2 rounded-xl border font-bold ${
                        newGuest.attending === 'no' ? 'bg-red-600 text-white' : 'bg-gray-50'
                      }`}
                    >
                      No Asiste
                    </button>
                  </div>
                </div>

                {newGuest.attending === 'yes' && (
                  <>
                    <div>
                      <label className="block font-semibold uppercase tracking-wider mb-1">
                        Cantidad de Pases
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={newGuest.guestCount}
                        onChange={(e) =>
                          setNewGuest({ ...newGuest, guestCount: parseInt(e.target.value) || 1 })
                        }
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold uppercase tracking-wider mb-1">
                        Restricción Alimentaria
                      </label>
                      <select
                        value={newGuest.dietary}
                        onChange={(e) => setNewGuest({ ...newGuest, dietary: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm bg-white"
                      >
                        <option value="Ninguna">Ninguna</option>
                        <option value="Celíaco">Celíaco (Sin TACC)</option>
                        <option value="Vegetariano">Vegetariano</option>
                        <option value="Vegano">Vegano</option>
                        <option value="Otro">Otro requerimiento</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold uppercase tracking-wider mb-1">
                        Canción para el DJ
                      </label>
                      <input
                        type="text"
                        value={newGuest.songRequest}
                        onChange={(e) => setNewGuest({ ...newGuest, songRequest: e.target.value })}
                        placeholder="Canción o Artista"
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">
                    Mensaje / Dedicatoria
                  </label>
                  <textarea
                    rows={2}
                    value={newGuest.message}
                    onChange={(e) => setNewGuest({ ...newGuest, message: e.target.value })}
                    placeholder="Dedicatoria para Ambar..."
                    className="w-full px-3 py-2 rounded-xl border text-sm resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border text-gray-600 hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#2E7D32] text-white font-semibold hover:bg-[#256629]"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
