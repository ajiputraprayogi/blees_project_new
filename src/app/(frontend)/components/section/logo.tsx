"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black px-6 py-12">
      
      {/* Title */}
      <div className="w-full mb-12">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-yellow-400" data-aos="fade-up">
          Makna Logo
        </h2>
      </div>

      {/* Bento Flex: Logo kiri, 3 box kanan */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8">
        {/* Logo kiri */}
        <div
          data-aos="fade-right"
          className="relative w-full md:w-1/3 aspect-square bg-black rounded-2xl shadow-xl flex items-center justify-center"
        >
          <Image
            src="/images/brand/logos.png"
            alt="Logo BLC"
            fill
            className="object-contain p-4"
          />
        </div>

        {/* 3 Box kanan */}
        <div className="flex flex-col gap-6 w-full md:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-900 via-black/80 to-yellow-900 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-2">BLESS</h3>
            <p className="text-gray-300 text-sm md:text-base">
              Bermakna “berkah” atau “diberkati”, memberi kesan positif, rezeki, dan kepercayaan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900 via-black/80 to-yellow-900 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-2">Luxury Contractor</h3>
            <p className="text-gray-300 text-sm md:text-base">
              Menegaskan positioning perusahaan sebagai kontraktor premium, fokus pada kualitas tinggi dan eksklusif.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900 via-black/80 to-yellow-900 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-2">BLC (Singkatan)</h3>
            <p className="text-gray-300 text-sm md:text-base">
              Memperkuat identitas brand agar mudah dikenali dalam bentuk singkat, sekaligus bisa dipakai sebagai ikon.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
