import { useState } from 'react';
import {
  Maximize2,
  Copy,
  Check,
  Sparkles,
  Volume2,
  VolumeX,
  Share2,
  Flower2,
  Sun,
  Layers,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PetalCanvas } from './components/PetalCanvas';
import { ImageLightbox } from './components/ImageLightbox';
import { DedicationCard } from './components/DedicationCard';
import { playSpringChime } from './utils/audio';
import { FloralCard } from './types';

// Generated image assets
import imgClassic from './assets/images/flores_amarillas_luzmila_1789068557330.jpg';
import imgVertical from './assets/images/flores_amarillas_vertical_1789068594734.jpg';

const CARDS: FloralCard[] = [
  {
    id: 'classic-4-3',
    title: 'Ramo Primaveral Dorado para Luzmila',
    formatName: 'Tarjeta Clásica (4:3)',
    aspectRatioLabel: 'Paisaje Floral',
    imageUrl: imgClassic,
    description:
      'Girasoles radiantes, tulipanes elegantes, rosas suaves y margaritas luminosas en hora dorada con bokeh.',
  },
  {
    id: 'vertical-3-4',
    title: 'Edición Vertical / Teléfono para Luzmila',
    formatName: 'Postal Vertical (3:4)',
    aspectRatioLabel: 'Ideal para Móvil y WhatsApp',
    imageUrl: imgVertical,
    description:
      'Composición vertical de flores amarillas con listón de seda y cálidos destellos de sol.',
  },
];

const GREETING_TEXT =
  'Sé que es una boludez pero no me aguanté las ganas, te lo hice con mucho cariño porque sos una persona especial para mí';

export default function App() {
  const [selectedCardId, setSelectedCardId] = useState<string>('classic-4-3');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [petalsEnabled, setPetalsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentCard = CARDS.find((c) => c.id === selectedCardId) || CARDS[0];

  const handleCopyGreeting = async () => {
    try {
      await navigator.clipboard.writeText(GREETING_TEXT);
      setCopied(true);
      if (soundEnabled) playSpringChime();
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleShare = async () => {
    if (soundEnabled) playSpringChime();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Flores Amarillas para Luzmila',
          text: GREETING_TEXT,
          url: window.location.href,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      } catch {
        // Ignored if cancelled
      }
    } else {
      handleCopyGreeting();
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  const handleSelectCard = (id: string) => {
    setSelectedCardId(id);
    if (soundEnabled) playSpringChime();
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 relative selection:bg-amber-200 selection:text-amber-900 pb-16">
      {/* Floating Petals Canvas */}
      <PetalCanvas enabled={petalsEnabled} />

      {/* Top Ambient Bar */}
      <header className="sticky top-0 z-30 bg-stone-50/85 backdrop-blur-md border-b border-amber-200/60 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-amber-950 shadow-sm">
              <Sun className="w-4 h-4 text-amber-900" />
            </div>
            <div>
              <h1 className="font-serif-display text-base sm:text-lg font-bold text-stone-900 leading-tight">
                21 de Septiembre
              </h1>
              <p className="text-[11px] font-sans-clean font-medium text-amber-800 tracking-wide">
                Inicio de la Primavera • Tradición de Flores Amarillas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="toggle-petals-btn"
              onClick={() => setPetalsEnabled(!petalsEnabled)}
              title={petalsEnabled ? 'Pausar pétalos' : 'Activar pétalos flotantes'}
              className={`p-2 rounded-full border transition-colors cursor-pointer text-xs flex items-center gap-1.5 ${
                petalsEnabled
                  ? 'bg-amber-100/80 border-amber-300 text-amber-900 shadow-sm'
                  : 'bg-white/60 border-stone-200 text-stone-400'
              }`}
            >
              <Flower2 className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline font-medium">Pétalos</span>
            </button>

            <button
              id="toggle-sound-btn"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Sonido activado' : 'Sonido desactivado'}
              className={`p-2 rounded-full border transition-colors cursor-pointer text-xs ${
                soundEnabled
                  ? 'bg-amber-100/80 border-amber-300 text-amber-900'
                  : 'bg-white/60 border-stone-200 text-stone-400'
              }`}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-amber-600" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 relative z-20">
        {/* Decorative Tagline */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200 shadow-xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Detalle floral exclusivo para Luzmila
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-stone-900 font-bold tracking-tight">
            Un Ramo de Luz y Primavera
          </h2>
          <p className="font-calligraphy text-xl sm:text-2xl md:text-3xl text-amber-700 mt-2 max-w-2xl mx-auto px-4 leading-relaxed">
            "Sé que es una boludez pero no me aguanté las ganas, te lo hice con mucho cariño porque sos una persona especial para mí"
          </p>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 rounded-xl bg-stone-200/70 backdrop-blur-sm border border-stone-300/60 shadow-inner">
            {CARDS.map((card) => {
              const active = card.id === selectedCardId;
              return (
                <button
                  key={card.id}
                  id={`tab-${card.id}`}
                  onClick={() => handleSelectCard(card.id)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? 'bg-white text-stone-900 shadow-sm font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-amber-600" />
                  <span>{card.formatName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Master Floral Card Presentation */}
        <div className="relative mx-auto max-w-3xl">
          {/* Glowing Aura */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-300/40 via-yellow-200/50 to-amber-300/40 rounded-3xl blur-lg pointer-events-none" />

          {/* Card Frame */}
          <div
            id="main-card-frame"
            className="relative bg-white rounded-2xl border border-amber-200/80 shadow-xl overflow-hidden"
          >
            {/* Image Box */}
            <div className="relative group bg-stone-950 flex items-center justify-center overflow-hidden">
              <img
                id="main-floral-image"
                src={currentCard.imageUrl}
                alt={currentCard.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[600px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />

              {/* Hover Quick Overlay Controls */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button
                  id="preview-fullscreen-btn"
                  onClick={() => setIsLightboxOpen(true)}
                  className="px-4 py-2 rounded-full bg-white/90 hover:bg-white text-stone-900 text-xs font-semibold shadow-lg backdrop-blur-sm flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  Ver en detalle
                </button>
              </div>

              {/* Corner Watermark Tag */}
              <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-amber-200 border border-white/20 text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <Sun className="w-3 h-3 text-amber-400" />
                <span>21 de Septiembre</span>
              </div>
            </div>

            {/* Typography and Actions Footer */}
            <div className="p-5 sm:p-6 bg-gradient-to-b from-amber-50/40 via-white to-white">
              <div className="text-center mb-5">
                <p className="font-calligraphy text-2xl sm:text-3xl text-amber-800 leading-tight">
                  "¡Feliz 21 de septiembre, Luzmila!"
                </p>
                <p className="text-sm sm:text-base font-serif-display italic text-stone-700 mt-2 max-w-xl mx-auto leading-relaxed">
                  "Sé que es una boludez pero no me aguanté las ganas, te lo hice con mucho cariño porque sos una persona especial para mí"
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-100">
                <button
                  id="view-fullscreen-btn"
                  onClick={() => setIsLightboxOpen(true)}
                  className="px-3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Ver Detalle en Pantalla Completa</span>
                </button>

                <button
                  id="copy-greeting-btn"
                  onClick={handleCopyGreeting}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer border ${
                    copied
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-200/80'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-stone-600" />
                      <span>Copiar Frase</span>
                    </>
                  )}
                </button>

                <button
                  id="share-greeting-btn"
                  onClick={handleShare}
                  className="px-3 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-stone-200/80"
                >
                  <Share2 className="w-4 h-4 text-stone-600" />
                  <span>{shared ? '¡Listo!' : 'Compartir'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Dedication Letter / Card */}
        <DedicationCard
          recipientName="Luzmila"
          initialMessage={GREETING_TEXT}
        />
      </main>

      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageUrl={currentCard.imageUrl}
        title={currentCard.title}
      />
    </div>
  );
}
