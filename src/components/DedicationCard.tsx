import { useState } from 'react';
import { Heart, Sparkles, Edit3, Check, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSpringChime } from '../utils/audio';

interface DedicationCardProps {
  recipientName: string;
  initialMessage: string;
}

export function DedicationCard({
  recipientName,
  initialMessage,
}: DedicationCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [customSender, setCustomSender] = useState('Con cariño y admiración');
  const [customMessage, setCustomMessage] = useState(
    'Sé que es una boludez pero no me aguanté las ganas, te lo hice con mucho cariño porque sos una persona especial para mí.'
  );

  const toggleOpen = () => {
    playSpringChime();
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-4">
      {/* Envelope Tab / Header */}
      <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border border-amber-200/80 rounded-2xl p-6 shadow-sm relative overflow-hidden">
        {/* Subtle background ornamentation */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-28 h-28 rounded-full bg-amber-200/30 blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 rounded-full bg-yellow-200/40 blur-lg pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <button
              id="envelope-seal-button"
              onClick={toggleOpen}
              title={isOpen ? 'Plegar carta' : 'Abrir carta'}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer border border-amber-300"
            >
              <Heart className="w-5 h-5 fill-amber-900/40 text-amber-950" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-full">
                  Dedicatoria Especial
                </span>
                <span className="text-xs text-stone-500 font-medium">21 de Septiembre</span>
              </div>
              <h3 className="font-serif-display text-lg font-semibold text-stone-800 mt-0.5">
                Para: {recipientName}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              id="toggle-edit-dedication"
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {isEditing ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Listo</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Personalizar nota</span>
                </>
              )}
            </button>

            <button
              id="fold-unfold-btn"
              onClick={toggleOpen}
              className="text-xs text-amber-800/80 hover:text-amber-950 underline underline-offset-2 transition-colors cursor-pointer"
            >
              {isOpen ? 'Ocultar' : 'Ver dedicatoria'}
            </button>
          </div>
        </div>

        {/* Dedication Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="dedication-body"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="mt-5 pt-5 border-t border-amber-200/60 relative z-10"
            >
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-amber-900 mb-1">
                      Mensaje primaveral para Luzmila:
                    </label>
                    <textarea
                      id="custom-message-input"
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      rows={4}
                      className="w-full text-sm p-3 rounded-lg border border-amber-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-amber-900 mb-1">
                      Remitente / Firma:
                    </label>
                    <input
                      id="custom-sender-input"
                      type="text"
                      value={customSender}
                      onChange={(e) => setCustomSender(e.target.value)}
                      className="w-full text-sm p-2 rounded-lg border border-amber-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-800"
                    />
                  </div>
                  <button
                    id="save-custom-note"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-900 shadow-sm cursor-pointer"
                  >
                    Guardar nota personalizada
                  </button>
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-amber-200/50 shadow-sm">
                  <p className="font-calligraphy text-2xl md:text-3xl text-amber-700 leading-relaxed text-center mb-3">
                    "{initialMessage}"
                  </p>

                  <p className="text-stone-700 text-sm md:text-base leading-relaxed font-sans-clean italic text-center max-w-xl mx-auto">
                    {customMessage}
                  </p>

                  <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-amber-800/80">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Significado: Amor, vitalidad, luz y prosperidad
                    </span>
                    <span className="font-serif-display font-medium italic">
                      — {customSender}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
