import React, { useState, useEffect } from 'react';
import { initialEventData, EventConfig } from './data/eventData';
import { SparkleCanvas } from './components/SparkleCanvas';
import { EnvelopeSplashScreen } from './components/EnvelopeSplashScreen';
import { HeroSection } from './components/HeroSection';
import { CountdownSection } from './components/CountdownSection';
import { GallerySection } from './components/GallerySection';
import { DressCodeSection } from './components/DressCodeSection';
import { GiftRegistrySection } from './components/GiftRegistrySection';
import { LocationSection } from './components/LocationSection';
import { RsvpSection } from './components/RsvpSection';
import { SocialSection } from './components/SocialSection';
import { AudioPlayerFloating } from './components/AudioPlayerFloating';
import { MidasSecretSection } from './components/MidasSecretSection';
import { Ornament } from './components/Ornaments';
import { Heart, KeyRound } from 'lucide-react';

export default function App() {
  const config: EventConfig = initialEventData;

  // Route check for /midas
  const checkIsMidas = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return (
      path.includes('/midas') ||
      path.endsWith('midas') ||
      hash.includes('midas') ||
      search.includes('midas')
    );
  };

  const [isMidasRoute, setIsMidasRoute] = useState<boolean>(checkIsMidas);
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);

  useEffect(() => {
    const handleUrlChange = () => {
      setIsMidasRoute(checkIsMidas());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateToInvite = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
    }
    setIsMidasRoute(false);
  };

  const navigateToMidas = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/midas');
    }
    setIsMidasRoute(true);
  };

  // If user navigated to /midas, render the Secret Section
  if (isMidasRoute) {
    return (
      <MidasSecretSection
        onBackToInvite={navigateToInvite}
        primaryColor={config.globalStyles.primaryColor}
        accentColor={config.globalStyles.accentColor}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#FAF3E8] text-[#1a2e1a] font-merriweather selection:bg-[#2E7D32]/20 selection:text-[#2E7D32] overflow-x-hidden">
      {/* Background Sparkles Canvas */}
      <SparkleCanvas color={config.globalStyles.primaryColor} count={50} />

      {/* Interactive Envelope Opening Splash Screen */}
      <EnvelopeSplashScreen
        eventTitle={config.hero.eventTitle}
        names={config.hero.names}
        primaryColor={config.globalStyles.primaryColor}
        accentColor={config.globalStyles.accentColor}
        onOpen={() => setHasOpenedEnvelope(true)}
      />

      {/* Floating Audio Player with Vinyl Disc */}
      <AudioPlayerFloating
        musicUrl={config.event.musicUrl}
        coverImage={config.event.coverImage}
        autoPlayTrigger={hasOpenedEnvelope}
        primaryColor={config.globalStyles.primaryColor}
        accentColor={config.globalStyles.accentColor}
      />

      {/* 1. Hero Section */}
      <HeroSection
        names={config.hero.names}
        eventTitle={config.hero.eventTitle}
        subtitle={config.hero.subtitle}
        quote={config.hero.quote}
        initials={config.hero.initials}
        backgroundImage={config.hero.backgroundImage}
        overlay={config.hero.overlay}
        primaryColor={config.globalStyles.primaryColor}
        secondaryColor={config.globalStyles.secondaryColor}
        accentColor={config.globalStyles.accentColor}
      />

      {/* 2. Countdown Section */}
      <CountdownSection
        title={config.countdown.title}
        targetDate={config.countdown.targetDate}
        completedMessage={config.countdown.completedMessage}
        primaryColor={config.globalStyles.primaryColor}
        accentColor={config.globalStyles.accentColor}
      />

      {/* 3. Gallery Section (6 Real Photos) */}
      <GallerySection
        title={config.gallery.title}
        photos={config.gallery.photos}
        primaryColor={config.globalStyles.primaryColor}
      />

      {/* 4. Dress Code Section */}
      <DressCodeSection
        title={config.dressCode.title}
        customLabel={config.dressCode.customLabel}
        description={config.dressCode.description}
        additionalNotes={config.dressCode.additionalNotes}
        colors={config.dressCode.colors}
        avoidColors={config.dressCode.avoidColors}
        primaryColor={config.globalStyles.primaryColor}
      />

      {/* 5. Gift Registry / Digital Envelope Section */}
      <GiftRegistrySection
        title={config.giftRegistry.title}
        message={config.giftRegistry.message}
        bankName={config.giftRegistry.bankName}
        beneficiary={config.giftRegistry.beneficiary}
        clabe={config.giftRegistry.clabe}
        primaryColor={config.globalStyles.primaryColor}
      />

      {/* 6. Location Section */}
      <LocationSection
        title={config.location.title}
        venueName={config.location.venueName}
        address={config.location.address}
        date={config.location.date}
        time={config.location.time}
        image={config.location.image}
        mapsUrl={config.location.mapsUrl}
        lat={config.location.lat}
        lng={config.location.lng}
        primaryColor={config.globalStyles.primaryColor}
      />

      {/* 7. RSVP / Attendance Confirmation Section */}
      <RsvpSection
        title={config.rsvp.title}
        subtitle={config.rsvp.subtitle}
        deadline={config.rsvp.deadline}
        deadlineTime={config.rsvp.deadlineTime}
        confirmMessage={config.rsvp.confirmMessage}
        showDietary={config.rsvp.showDietary}
        showSongRequest={config.rsvp.showSongRequest}
        whatsappNumber={config.rsvp.whatsappNumber}
        primaryColor={config.globalStyles.primaryColor}
      />

      {/* 8. Social Media Hashtag Section */}
      <SocialSection
        title={config.social.title}
        hashtag={config.social.hashtag}
        instagramUrl={config.social.instagramUrl}
        instagramUser={config.social.instagramUser}
        tiktokUrl={config.social.tiktokUrl}
        tiktokUser={config.social.tiktokUser}
        primaryColor={config.globalStyles.primaryColor}
      />

      {/* Elegant Footer */}
      <footer className="relative py-16 px-4 bg-[#F4ECE1] border-t border-[#2E7D32]/15 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <Ornament variant="flourish" color={config.globalStyles.primaryColor} size={40} className="mb-4" />

          <h3 className="font-cormorant text-3xl font-bold tracking-wider text-[#2E7D32]">
            {config.hero.names}
          </h3>
          <p className="font-script text-2xl text-[#7A4E2E] mt-1">
            {config.hero.eventTitle}
          </p>

          <p className="font-merriweather italic text-xs text-[#1a2e1a]/70 mt-3 max-w-sm">
            "Gracias por formar parte de este día tan especial e inolvidable en mi vida."
          </p>

          <div className="flex items-center gap-2 mt-6 text-xs text-[#7A4E2E]">
            <Heart className="w-3.5 h-3.5 fill-[#2E7D32] text-[#2E7D32]" />
            <span>04 • 12 • 2026</span>
          </div>

          <div className="w-24 h-px bg-[#2E7D32]/20 my-8" />

          {/* Discreet Access to /midas */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={navigateToMidas}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-wider text-[#7A4E2E]/60 hover:text-[#2E7D32] hover:bg-[#2E7D32]/5 transition-colors"
              title="Acceso confidencial /midas"
            >
              <KeyRound className="w-3 h-3 text-[#7A4E2E]/60" />
              <span>Acceso /midas</span>
            </button>
          </div>

          <p className="text-[10px] uppercase tracking-[0.25em] text-[#1a2e1a]/40 mt-6">
            Invitación Digital • Ambifest
          </p>
        </div>
      </footer>
    </div>
  );
}
