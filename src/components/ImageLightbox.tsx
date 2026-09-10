import { useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  onDownload: () => void;
}

export function ImageLightbox({
  isOpen,
  onClose,
  imageUrl,
  title,
  onDownload,
}: ImageLightboxProps) {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.35, 2.5));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.35, 0.8));
  const handleResetZoom = () => setScale(1);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="image-lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={onClose}
        >
          {/* Controls Header */}
          <div
            className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 max-w-5xl mx-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-amber-200">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium tracking-wide font-serif-display text-amber-100">
                {title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="lightbox-zoom-out"
                onClick={handleZoomOut}
                title="Reducir zoom"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                id="lightbox-zoom-reset"
                onClick={handleResetZoom}
                title="Tamaño original"
                className="px-2.5 py-1 text-xs rounded-full bg-white/10 hover:bg-white/20 text-amber-200 font-mono transition-colors cursor-pointer"
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                id="lightbox-zoom-in"
                onClick={handleZoomIn}
                title="Aumentar zoom"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                id="lightbox-download-btn"
                onClick={onDownload}
                title="Descargar imagen"
                className="p-2 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-900 transition-colors ml-2 cursor-pointer font-medium"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                id="lightbox-close-btn"
                onClick={onClose}
                title="Cerrar"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Image Frame */}
          <div
            className="relative max-w-5xl max-h-[85vh] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              id="lightbox-image"
              src={imageUrl}
              alt={title}
              referrerPolicy="no-referrer"
              className="max-h-[82vh] max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-200"
              style={{ transform: `scale(${scale})` }}
            />
          </div>

          <p className="text-stone-400 text-xs mt-3 text-center">
            Haz clic afuera o presiona Esc para cerrar • Usa los controles para explorar los detalles
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
