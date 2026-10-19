export interface EventConfig {
  event: {
    id: string;
    title: string;
    eventDate: string;
    eventTime: string;
    timezone: string;
    timeFormat: string;
    eventType: string;
    musicUrl: string;
    showBadge: boolean;
    coverImage: string;
  };
  hero: {
    names: string;
    subtitle: string;
    eventTitle: string;
    quote: string;
    showMonogram: boolean;
    initials: string;
    backgroundImage: string;
    overlay: number;
    showDate: boolean;
  };
  countdown: {
    title: string;
    completedMessage: string;
    targetDate: string;
  };
  gallery: {
    title: string;
    photos: Array<{
      url: string;
      caption: string;
    }>;
  };
  dressCode: {
    title: string;
    customLabel: string;
    description: string;
    additionalNotes: string;
    colors: string[];
    avoidColors: string[];
    showColorSwatches: boolean;
  };
  giftRegistry: {
    title: string;
    message: string;
    bankName: string;
    beneficiary: string;
    clabe: string;
    digitalEnvelope: boolean;
    showCashOption: boolean;
  };
  location: {
    title: string;
    venueName: string;
    address: string;
    date: string;
    time: string;
    image: string;
    mapsUrl: string;
    lat: number;
    lng: number;
  };
  rsvp: {
    title: string;
    subtitle: string;
    deadline: string;
    deadlineTime: string;
    confirmMessage: string;
    showDietary: boolean;
    showSongRequest: boolean;
    whatsappNumber?: string;
  };
  social: {
    title: string;
    hashtag: string;
    instagramUrl: string;
    instagramUser: string;
    tiktokUrl: string;
    tiktokUser: string;
  };
  globalStyles: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    primaryFont: string;
    secondaryFont: string;
  };
}

export const initialEventData: EventConfig = {
  event: {
    id: "fe23c7af-8a5e-46ac-adfe-b594d99c8a0e",
    title: "Ambifest",
    eventDate: "2026-12-04T00:00:00+00:00",
    eventTime: "21:00",
    timezone: "America/Buenos_Aires",
    timeFormat: "24h",
    eventType: "xv",
    musicUrl: "https://vfwnskfrtjvbnwqcwxtn.supabase.co/storage/v1/object/public/music/music/fe23c7af-8a5e-46ac-adfe-b594d99c8a0e/84ed74cb-a38c-4e9d-9ffb-af1cb1186861.mp3",
    showBadge: true,
    coverImage: "https://vfwnskfrtjvbnwqcwxtn.supabase.co/storage/v1/object/public/images/events/fe23c7af-8a5e-46ac-adfe-b594d99c8a0e/sections/0c6404d6b9538dce845b37eb14f5daaf4d41752066ab0f14b5654b840fd97953.webp"
  },
  hero: {
    names: "Ambar",
    subtitle: "Esta noche, el cuento de hadas se hace realidad...",
    eventTitle: "Ambifest",
    quote: "Me lo merezco por pedir deseos a las estrellas",
    showMonogram: true,
    initials: "xv",
    backgroundImage: "https://vfwnskfrtjvbnwqcwxtn.supabase.co/storage/v1/object/public/images/events/fe23c7af-8a5e-46ac-adfe-b594d99c8a0e/sections/0c6404d6b9538dce845b37eb14f5daaf4d41752066ab0f14b5654b840fd97953.webp",
    overlay: 45,
    showDate: true
  },
  countdown: {
    title: "Cuenta regresiva",
    completedMessage: "¡Hoy es mi gran día!",
    targetDate: "2026-12-04T21:00:00-03:00"
  },
  gallery: {
    title: "Galería",
    photos: [
      {
        url: "https://vfwnskfrtjvbnwqcwxtn.supabase.co/storage/v1/object/public/images/events/fe23c7af-8a5e-46ac-adfe-b594d99c8a0e/sections/390883f88118c50d57fd7e6f56499ac189ff1b8fe11c2d690271a47462b7f47f.webp",
        caption: "Ambar — Mis XV"
      },
      {
        url: "https://vfwnskfrtjvbnwqcwxtn.supabase.co/storage/v1/object/public/images/events/fe23c7af-8a5e-46ac-adfe-b594d99c8a0e/sections/a281e3914d9d1e43ab7d1d5f338745efe9c1ba8c07186db3064f80f367d97f13.webp",
        caption: "Noche de ensueño"
      },
      {
        url: "https://vfwnskfrtjvbnwqcwxtn.supabase.co/storage/v1/object/public/images/events/fe23c7af-8a5e-46ac-adfe-b594d99c8a0e/sections/0bcdbcc1eca0257c124f3ec3365c46c678eac059a2b79a36a6616f93f82f5888.webp",
        caption: "Momentos mágicos"
      },
      {
        url: "https://vfwnskfrtjvbnwqcwxtn.supabase.co/storage/v1/object/public/images/events/fe23c7af-8a5e-46ac-adfe-b594d99c8a0e/sections/744408dfcdafc13cdbeab6018077a2729054c45ad4e7048f06183dbb6799e6da.webp",
        caption: "Celebrando mis 15"
      },
      {
        url: "https://vfwnskfrtjvbnwqcwxtn.supabase.co/storage/v1/object/public/images/events/fe23c7af-8a5e-46ac-adfe-b594d99c8a0e/sections/de1c2f747cf90944d6e8791a5a1907243280334d28a14a9df6f88cd35fbeec58.webp",
        caption: "Los preparativos"
      },
      {
        url: "https://vfwnskfrtjvbnwqcwxtn.supabase.co/storage/v1/object/public/images/events/fe23c7af-8a5e-46ac-adfe-b594d99c8a0e/sections/0f25862d1f6edf30d6e3a5e26365baabd95ababc5ebbb635041f61a65a2a0743.webp",
        caption: "Un deseo a las estrellas"
      }
    ]
  },
  dressCode: {
    title: "Código de vestimenta",
    customLabel: "Elegante",
    description: "Te pedimos vestir elegante para esta noche tan especial.",
    additionalNotes: "EVITAR EL VERDE EN TODAS SUS GAMAS",
    colors: [
      "#c52020", // Rojo rubí
      "#b35ed4", // Lila / Violeta
      "#4f3ed0", // Azul real / Zafiro
      "#1a1a2e"  // Azul marino noche
    ],
    avoidColors: [
      "#6dd0a1", // Verde menta
      "#4dc77b", // Verde esmeralda
      "#39a253", // Verde bosque
      "#e8dede", // Blanco / Hueso
      "#ddcda2"  // Champagne claro
    ],
    showColorSwatches: true
  },
  giftRegistry: {
    title: "Mesa de regalos",
    message: "Tu presencia es mi mejor regalo. Si deseas tener un detalle conmigo, te comparto algunas opciones.",
    bankName: "MERCADO PAGO",
    beneficiary: "Ambar Arguello Vera",
    clabe: "ALIAS: ambar.arguello.05",
    digitalEnvelope: true,
    showCashOption: true
  },
  location: {
    title: "Ubicación",
    venueName: "LA PALOMA EVENTOS SALON 4",
    address: "Avenida Valentin Vergara 5518 Ranelagh",
    date: "Viernes 4 de Diciembre de 2026",
    time: "21:00 hs",
    image: "/images/venue/venue_main.jpg",
    mapsUrl: "https://maps.app.goo.gl/9WK8LR9H2LMfFBKn9",
    lat: -34.8097668,
    lng: -58.2033581
  },
  rsvp: {
    title: "Confirma tu asistencia",
    subtitle: "Me encantaría contar contigo en este día tan especial",
    deadline: "2026-11-04",
    deadlineTime: "14:00",
    confirmMessage: "Nos vemos en la fiesta",
    showDietary: true,
    showSongRequest: true,
    whatsappNumber: "5491123226307"
  },
  social: {
    title: "Los Mejores Momentos",
    hashtag: "#XVambi",
    instagramUrl: "https://www.instagram.com/ambii.85/",
    instagramUser: "@ambii.85",
    tiktokUrl: "https://www.tiktok.com/@ambii.85?_r=1&_t=ZS-9AYnqgX0b4b",
    tiktokUser: "@ambii.85"
  },
  globalStyles: {
    primaryColor: "#2E7D32",
    secondaryColor: "#7A4E2E",
    accentColor: "#8DBA7A",
    backgroundColor: "#FAF3E8",
    textColor: "#1a2e1a",
    primaryFont: "Cormorant Garamond",
    secondaryFont: "Merriweather"
  }
};
