"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Circle } from "lucide-react";

export default function WhatsAppChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [promo, setPromo] = useState<{ description: string; discount: number } | null>(null);

  // Nomor WhatsApp tujuan
  const phoneNumber = "6281234127399";

  // Fetch promo dari API
  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const res = await fetch("/dummyapi/promo");
        const data = await res.json();
        setPromo(data);
      } catch (error) {
        console.error("Gagal fetch promo:", error);
      }
    };
    fetchPromo();
  }, []);

  // Default message kalau API belum kebuka
  const promoMessage = promo
    ? `Halo, saya tertarik dengan promo spesial diskon ${promo.discount}% untuk semua layanan! 🙌`
    : "Halo, saya tertarik dengan promo spesial hari ini! 🙌";

  // Encode biar aman di URL
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    promoMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-yellow-500 text-black p-4 rounded-full shadow-lg hover:bg-yellow-600 transition"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-72 bg-black text-white rounded-2xl shadow-xl overflow-hidden border border-yellow-600"
          >
            {/* Header with Admin Info */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-600 to-yellow-500 px-4 py-3">
              {/* Avatar admin */}
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-black">
                  A
                </div>
                {/* Online dot */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-black font-semibold text-sm">Admin BLESS</span>
                <span className="text-white/80 text-xs flex items-center gap-1">
                  <Circle size={8} className="fill-green-500 text-green-500" />
                  Online
                </span>
              </div>
            </div>

            {/* Chat Content */}
            <div className="p-4 space-y-3">
              <div className="flex items-start space-x-2">
                <div className="bg-yellow-500 text-black px-3 py-2 rounded-xl text-sm shadow shadow-white/10">
                  👋 Halo! &nbsp; 
                  {promo ? promo.description : "Promo sedang dimuat..."}
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="px-4 py-3 border-t border-yellow-600">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-black border border-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 hover:text-black transition"
              >
                <Send size={18} />
                Klaim Promo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
