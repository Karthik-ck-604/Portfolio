import React, { useState, useEffect } from "react";
import { X, ZoomIn, ZoomOut, Download, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common/Button";

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  title: string;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  isOpen,
  onClose,
  fileUrl,
  title,
}) => {
  const [zoom, setZoom] = useState(1.0);
  const isPdf = fileUrl.toLowerCase().endsWith(".pdf");
  const isMockPub = fileUrl.startsWith("mock-pub-");

  useEffect(() => {
    if (isOpen) {
      setZoom(1.0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      const cursorEvent = new CustomEvent("cursorchange", { detail: "default" });
      window.dispatchEvent(cursorEvent);
    }
    return () => {
      document.body.style.overflow = "unset";
      const cursorEvent = new CustomEvent("cursorchange", { detail: "default" });
      window.dispatchEvent(cursorEvent);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleImageClick = () => {
    if (zoom === 1.0) {
      setZoom(1.75);
    } else {
      setZoom(1.0);
    }
  };

  // Scholarly Mock Publications Renderers
  const renderScholarlyPaper = () => {
    if (fileUrl === "mock-pub-accident") {
      return (
        <div className="w-full max-w-[800px] bg-white text-black p-8 md:p-12 shadow-2xl rounded font-serif text-left select-text relative">
          {/* Header */}
          <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-center text-xs font-sans font-semibold uppercase tracking-wider text-gray-500">
            <span>Industrial Engineering Journal</span>
            <span>Vol. 15, No. 2, 2024</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold mb-4 font-serif text-black leading-tight text-center">
            Design Thinking Based Accident Prevention System Using Eye Blink Sensor
          </h1>

          {/* Authors */}
          <div className="text-sm font-sans text-center mb-8 text-gray-700">
            <span className="font-semibold">Karthikeyan C</span>
            <p className="text-xs text-gray-500 mt-1">Department of Computer Science and Engineering &bull; SNS College of Engineering</p>
          </div>

          {/* Abstract */}
          <div className="border border-gray-300 p-6 bg-gray-50 mb-8 rounded">
            <h2 className="text-sm font-sans font-bold uppercase tracking-wider mb-2 text-gray-800">Abstract</h2>
            <p className="text-xs leading-relaxed text-gray-700">
              Driver drowsiness is one of the primary causes of highway accidents worldwide. This paper presents an embedded hardware security module developed using a Design Thinking approach, aimed at detecting driver fatigue in real-time. By utilizing an infrared eye blink sensor mapped to eyelid movements, the system evaluates micro-sleep behaviors. When drowsiness is detected (eyelids closed for more than 1.5 seconds), the module triggers warning alarms and engages controlled mechanical braking to decelerate the vehicle, significantly reducing crash impact risks.
            </p>
          </div>

          {/* Diagram */}
          <div className="my-8 flex flex-col items-center gap-2 select-none">
            <h3 className="text-xs font-sans font-bold text-gray-500 uppercase tracking-widest">Figure 1. Architectural Pipeline Schematic</h3>
            <div className="w-full max-w-[500px] border border-gray-200 rounded p-4 bg-gray-50 flex items-center justify-center">
              <svg viewBox="0 0 500 150" className="w-full h-auto">
                <rect x="10" y="55" width="80" height="40" rx="5" fill="#f3f4f6" stroke="#2a2a2a" strokeWidth="1.5" />
                <text x="50" y="80" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#2a2a2a" fontWeight="bold">Eye Sensor</text>

                <path d="M 90 75 L 140 75" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrow)" />

                <rect x="150" y="45" width="100" height="60" rx="5" fill="#f3f4f6" stroke="#2a2a2a" strokeWidth="1.5" />
                <text x="200" y="75" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#2a2a2a" fontWeight="bold">IoT Controller</text>
                <text x="200" y="90" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fill="#a8a8a8">(Drowsiness logic)</text>

                <path d="M 250 60 L 320 40" stroke="#dc2626" strokeWidth="1.5" />
                <path d="M 250 90 L 320 110" stroke="#dc2626" strokeWidth="1.5" />

                <rect x="330" y="20" width="100" height="40" rx="5" fill="#f3f4f6" stroke="#2a2a2a" strokeWidth="1.5" />
                <text x="380" y="45" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#2a2a2a" fontWeight="bold">Warning Alarm</text>

                <rect x="330" y="90" width="100" height="40" rx="5" fill="#f3f4f6" stroke="#2a2a2a" strokeWidth="1.5" />
                <text x="380" y="115" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#2a2a2a" fontWeight="bold">Deceleration Brakes</text>
              </svg>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-6 mt-8 text-xs text-gray-500 font-sans">
            <span className="font-bold">Keywords:</span> Driver Fatigue, Eyelid Tracking, Design Thinking, IoT decelerations, Vehicle Safety.
          </div>
        </div>
      );
    }

    if (fileUrl === "mock-pub-seeker") {
      return (
        <div className="w-full max-w-[800px] bg-white text-black p-8 md:p-12 shadow-2xl rounded font-serif text-left select-text relative">
          {/* Header */}
          <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-center text-xs font-sans font-semibold uppercase tracking-wider text-gray-500">
            <span>YMER Journal</span>
            <span>Vol. 22, No. 4, 2023</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold mb-4 font-serif text-black leading-tight text-center">
            Locating Smartphones Using Seeker Tool
          </h1>

          {/* Authors */}
          <div className="text-sm font-sans text-center mb-8 text-gray-700">
            <span className="font-semibold">Karthikeyan C</span>
            <p className="text-xs text-gray-500 mt-1">Department of Computer Science and Engineering &bull; SNS College of Engineering</p>
          </div>

          {/* Abstract */}
          <div className="border border-gray-300 p-6 bg-gray-50 mb-8 rounded">
            <h2 className="text-sm font-sans font-bold uppercase tracking-wider mb-2 text-gray-800">Abstract</h2>
            <p className="text-xs leading-relaxed text-gray-700">
              Locating lost or stolen smartphones requires highly accurate geographical coordinate retrievals. This paper evaluates location handshake protocols, security policies, and coordinate mappings using the Seeker Tool. By generating structured link triggers, the tool establishes coordinate requests via local browser location coordinates. This study presents security recommendations for mitigating link-based coordinate spoofing and securing mobile devices during location lookup operations.
            </p>
          </div>

          {/* Diagram */}
          <div className="my-8 flex flex-col items-center gap-2 select-none">
            <h3 className="text-xs font-sans font-bold text-gray-500 uppercase tracking-widest">Figure 2. Connection Handshake Layout</h3>
            <div className="w-full max-w-[500px] border border-gray-200 rounded p-4 bg-gray-50 flex items-center justify-center">
              <svg viewBox="0 0 500 150" className="w-full h-auto">
                <rect x="10" y="55" width="80" height="40" rx="5" fill="#f3f4f6" stroke="#2a2a2a" strokeWidth="1.5" />
                <text x="50" y="80" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#2a2a2a" fontWeight="bold">Link Trigger</text>

                <path d="M 90 75 L 140 75" stroke="#22c55e" strokeWidth="1.5" />

                <rect x="150" y="45" width="100" height="60" rx="5" fill="#f3f4f6" stroke="#2a2a2a" strokeWidth="1.5" />
                <text x="200" y="75" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#2a2a2a" fontWeight="bold">Target Device</text>
                <text x="200" y="90" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fill="#a8a8a8">(API Handshake)</text>

                <path d="M 250 75 L 320 75" stroke="#22c55e" strokeWidth="1.5" />

                <rect x="330" y="55" width="100" height="40" rx="5" fill="#f3f4f6" stroke="#2a2a2a" strokeWidth="1.5" />
                <text x="380" y="80" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#2a2a2a" fontWeight="bold">GPS Lat / Lon</text>
              </svg>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-6 mt-8 text-xs text-gray-500 font-sans">
            <span className="font-bold">Keywords:</span> Coordinate Tracking, Smartphone Security, Geolocation APIs, Handshake Protocols, Network Audits.
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050505] z-[110]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-4 md:inset-10 bg-[#161616] border border-[#2A2A2A] rounded-2xl z-[120] flex flex-col overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.8)]"
            role="dialog"
            aria-modal="true"
            aria-label={`Document viewer for ${title}`}
          >
            {/* Header controls */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A] bg-[#0F0F0F] shrink-0">
              <h3 className="text-sm font-heading font-bold text-[#F8F8F8] tracking-wide truncate max-w-[60%]">
                {title}
              </h3>

              <div className="flex items-center gap-3">
                {/* Zoom controls (Only for Images / Mockups) */}
                {!isPdf && (
                  <div className="flex items-center border border-[#2A2A2A] rounded-full bg-[#050505] p-1 gap-1">
                    <button
                      onClick={handleZoomOut}
                      className="p-1.5 text-[#A8A8A8] hover:text-[#F8F8F8] transition-colors hover:bg-[rgba(255,255,255,0.05)] rounded-full focus:outline-none cursor-pointer"
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-mono text-[#A8A8A8] min-w-[36px] text-center select-none">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-1.5 text-[#A8A8A8] hover:text-[#F8F8F8] transition-colors hover:bg-[rgba(255,255,255,0.05)] rounded-full focus:outline-none cursor-pointer"
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Download option (Only for real files) */}
                {!isMockPub && (
                  <Button
                    href={fileUrl}
                    download
                    variant="secondary"
                    size="sm"
                    icon={<Download className="w-3.5 h-3.5" />}
                    ariaLabel="Download document"
                    className="hidden sm:inline-flex"
                  >
                    Download
                  </Button>
                )}

                {/* Close modal */}
                <button
                  onClick={onClose}
                  className="w-9 h-9 border border-[#2A2A2A] hover:border-[#DC2626] rounded-full flex items-center justify-center text-[#A8A8A8] hover:text-[#F8F8F8] hover:bg-[rgba(220,38,38,0.05)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] cursor-pointer"
                  aria-label="Close viewer modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document display viewport */}
            <div className="flex-1 w-full bg-[#050505] overflow-auto flex items-center justify-center p-6 relative">
              {isMockPub ? (
                // Scholarly mock reader
                <div
                  className="w-full h-full flex items-start justify-center overflow-auto"
                  style={{ cursor: zoom > 1 ? "grab" : "default" }}
                >
                  <motion.div
                    animate={{ scale: zoom }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="origin-top my-4"
                  >
                    {renderScholarlyPaper()}
                  </motion.div>
                </div>
              ) : isPdf ? (
                // PDF Viewer
                <object
                  data={fileUrl}
                  type="application/pdf"
                  className="w-full h-full rounded-lg"
                >
                  <div className="flex flex-col items-center justify-center text-center gap-4 py-12">
                    <p className="text-sm text-[#A8A8A8] max-w-sm">
                      Your browser does not support inline PDF viewing. Please download or open the file in a new tab.
                    </p>
                    <div className="flex gap-4">
                      <Button
                        href={fileUrl}
                        download
                        variant="primary"
                        size="sm"
                        icon={<Download className="w-4 h-4" />}
                        ariaLabel="Download PDF file"
                      >
                        Download PDF
                      </Button>
                      <Button
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        size="sm"
                        icon={<ExternalLink className="w-3.5 h-3.5" />}
                        ariaLabel="Open PDF in new tab"
                      >
                        Open in New Tab
                      </Button>
                    </div>
                  </div>
                </object>
              ) : (
                // Image Viewer
                <div
                  className="w-full h-full flex items-center justify-center overflow-auto"
                  style={{ cursor: zoom > 1 ? "grab" : "default" }}
                  data-cursor={zoom === 1.0 ? "zoom-in" : "zoom-out"}
                >
                  <motion.img
                    src={fileUrl}
                    alt={title}
                    animate={{ scale: zoom }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg select-none cursor-pointer"
                    style={{ originX: 0.5, originY: 0.5 }}
                    data-cursor={zoom === 1.0 ? "zoom-in" : "zoom-out"}
                    onClick={handleImageClick}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
