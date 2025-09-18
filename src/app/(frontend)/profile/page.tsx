"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import LogoMeaningPage from "../components/section/logo";

interface TeamMember {
  id: number;
  title: string;
  desc: string;
  img: string;
  size: string;
}

export default function ProfilePage() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  // Fetch tim dari API
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/tim"); // endpoint API kamu
        const data = await res.json();
        setTeam(data);
      } catch (error) {
        console.error("Gagal fetch tim:", error);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen py-16 px-3 md:px-12 lg:px-0 space-y-20">
      {/* Logo Meaning */}
      <LogoMeaningPage />

      {/* Sejarah Perusahaan */}
      <section
        className="max-w-4xl mx-auto text-center space-y-6 mb-10"
        data-aos="fade-up"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-left md:text-center text-yellow-400 px-5 md:px-0">
          Sejarah Perusahaan
        </h2>
        <p className="text-gray-300 leading-relaxed text-left md:text-center px-5 md:px-0">
          Bless Kontraktor hadir sebagai jawaban atas kebutuhan masyarakat akan
          layanan kontraktor dan desain bangunan yang tidak hanya fungsional,
          tetapi juga menghadirkan nilai estetika dan kemewahan. ...
        </p>
      </section>

      {/* Visi Misi */}
      <section className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-900 rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">Visi</h3>
          <p className="text-gray-300 leading-relaxed">
            Menjadi perusahaan kontraktor dan desain bangunan terpercaya di
            Indonesia...
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-zinc-900 rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">Misi</h3>
          <ul className="list-disc list-outside text-gray-300 space-y-2">
            <li>
              Memberikan layanan desain dan pembangunan yang detail, transparan,
              dan profesional.
            </li>
            <li>
              Menghadirkan solusi efisiensi biaya tanpa mengurangi kualitas hasil
              pekerjaan.
            </li>
            <li>
              Menggunakan teknologi terbaru dalam visualisasi dan perencanaan
              proyek.
            </li>
            <li>
              Membangun hubungan jangka panjang dengan klien melalui kepercayaan,
              kepuasan, dan integritas.
            </li>
            <li>
              Mengembangkan tim yang kompeten, kreatif, dan berkomitmen tinggi
              dalam setiap proyek.
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Team */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-yellow-400">
            Tim Kami
          </h2>
          <p className="text-gray-400">Orang-orang di balik karya terbaik kami</p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[280px] sm:auto-rows-[320px] grid-flow-dense"
        >
          {team.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden rounded-2xl bg-zinc-900 group ${member.size}`}
            >
              <Image
                src={member.img}
                alt={member.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-5">
                <h3 className="text-lg font-semibold text-yellow-300">
                  {member.title}
                </h3>
                <p className="text-gray-300 text-sm">{member.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
