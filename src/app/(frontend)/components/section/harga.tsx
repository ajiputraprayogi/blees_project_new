"use client";

import { motion } from "framer-motion";
import { FiPhoneCall } from "react-icons/fi";
import { useEffect } from "react";


type PriceItem = {
  range: string;
  category: string;
};

const prices: PriceItem[] = [
  // Small & Medium
  { range: "0-250 m²", category: "Small & Medium Size Building" },
  { range: "251-300 m²", category: "Small & Medium Size Building" },
  { range: "301-350 m²", category: "Small & Medium Size Building" },
  { range: "351-400 m²", category: "Small & Medium Size Building" },
  { range: "401-450 m²", category: "Small & Medium Size Building" },
  { range: "451-500 m²", category: "Small & Medium Size Building" },

  // Big Size
  { range: "501-600 m²", category: "Big Size Building" },
  { range: "601-700 m²", category: "Big Size Building" },
  { range: "701-800 m²", category: "Big Size Building" },
  { range: "801-900 m²", category: "Big Size Building" },
  { range: "901-1000 m²", category: "Big Size Building" },

  // Extra Big
  { range: ">1000 m²", category: "Extra Big Size Building" },
];

export default function PricePage() {
  const handleContact = (range: string, category: string) => {
    const message = `Halo Admin, saya ingin menanyakan biaya desain untuk kategori: ${category}, dengan luas bangunan ${range}.`;
    const waUrl = `https://wa.me/6281234127399?text=${encodeURIComponent(
      message
    )}`;
    window.open(waUrl, "_blank");
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 bg-black">
      {/* Title */}
      <section className="mb-12 text-center">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
          KONSULTASI JASA DESAIN RUMAH TERBARU TAHUN 2025
        </h1>
        <p className="mt-4 text-sm md:text-base text-neutral-400">
          Untuk mendapatkan konsultasi biaya dari Arsitek kami, silahkan hubungi
          admin via WhatsApp. Proposal harga dilengkapi
          dengan sketsa denah konsep dalam 1–7 hari kerja. Jika diperlukan, bisa
          dilakukan online meeting awal.
        </p>
      </section>

      {/* Price Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {prices.map((item, i) => (
          <motion.div
            key={i}
            // whileHover={{ y: -5, scale: 1.02 }}
            data-aos="fade-up-right"
            // transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-neutral-950 to-neutral-900 p-6 shadow-lg flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-yellow-400">
                {item.category}
              </h3>
              <p className="mt-2 text-neutral-300">Luas Bangunan:</p>
              <p className="text-xl font-bold text-neutral-100">
                {item.range}
              </p>
            </div>
            <button
              onClick={() => handleContact(item.range, item.category)}
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-black shadow-md hover:bg-yellow-400 transition"
            >
              <FiPhoneCall className="size-4" />
              Hubungi CS
            </button>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
