"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    q: "Apa Bless Architect itu?",
    a: "Bless Architect adalah Perusahaan Jasa Arsitek yang menyediakan jasa desain rumah mewah, villa, perumahan, ruko, apartemen, hingga interior dengan sentuhan modern elegan.",
  },
  {
    q: "Apa saja yang akan saya dapatkan dengan memesan desain di Bless Architect?",
    a: `Layanan yang didapat mencakup: Simbol & Status Elit, Tampilan Megah & Elegan, Tata Ruang Lega, Interior Nyaman, Struktur Aman, Long Lasting Style, Cahaya Alami, Material Berkelas, Fasilitas Lengkap, Quality Control, Konsultasi Gratis, Revisi Sampai Puas, hingga Gambar 2D, 3D, Render, RAB, dan Bonus Video 3D.`,
  },
  {
    q: "Bagaimana prosedur pemesanan jasa desain di Bless Architect?",
    a: "Prosedur pemesanan dilakukan dengan konsultasi awal, pembayaran bertahap, pembuatan konsep desain 2D, 3D, revisi hingga puas, dan penyerahan dokumen lengkap termasuk RAB serta gambar teknis.",
  },
  {
    q: "Apakah Bless Architect menerima meeting online?",
    a: "Ya, Bless Architect mendukung meeting online via Zoom, Google Meet, WhatsApp, hingga Virtual Survey berbasis Google Maps dan Street View.",
  },
  {
    q: "Apakah Bless Architect juga melayani desain interior?",
    a: "Ya, setiap paket arsitektur mendapatkan bonus visual interior. Jika ingin lebih detail dan revisiable, tersedia layanan Jasa Interior lengkap dari tim Bless Architect.",
  },
  {
    q: "Apakah Bless Architect menerima pembayaran bertahap?",
    a: "Ya, pembayaran dapat dilakukan bertahap sesuai progres desain: 30% awal, 50% tahap modeling 3D, dan 20% tahap render & dokumen teknis.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-black text-yellow-500 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-10 text-center"
        >
          F.A.Q. <span className="text-yellow-400">(Frequently Asked Questions)</span>
        </motion.h1>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900 rounded-2xl shadow-lg cursor-pointer"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="cursor-pointer w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-yellow-400"
              >
                {item.q}
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-base text-gray-300"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
