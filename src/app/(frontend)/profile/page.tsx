"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfilePage() {
  const team = [
    {
      name: "Ferry Irwandi",
      role: "Founder & CEO",
      img: "/images/user/ferry.jpg",
      span: "col-span-2 row-span-2", // lebih besar
    },
    {
      name: "Budi Santoso",
      role: "Lead Architect",
      img: "/images/user/ferry.jpg",
      span: "",
    },
    {
      name: "Citra Lestari",
      role: "Interior Designer",
      img: "/images/user/ferry.jpg",
      span: "",
    },
    {
      name: "Dewi Kurnia",
      role: "Project Manager",
      img: "/images/user/ferry.jpg",
      span: "col-span-2", // lebar
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen py-16 px-6 md:px-12 lg:px-20 space-y-20">
      {/* Sejarah Perusahaan */}
      <section className="max-w-4xl mx-auto text-center space-y-6 mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-yellow-400">
          Sejarah Perusahaan
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Berdiri sejak tahun 2010, Bless Architect telah berkomitmen menghadirkan karya arsitektur modern 
          dengan sentuhan artistik yang memadukan keindahan, fungsi, dan kenyamanan. Dengan pengalaman lebih 
          dari 10 tahun, kami telah mengerjakan ratusan proyek perumahan, villa, komersial, hingga resort.
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
            Menjadi perusahaan arsitektur terdepan di Indonesia yang menghadirkan desain inovatif, 
            berkelanjutan, dan bernilai seni tinggi untuk masyarakat luas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-zinc-900 rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">Misi</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Menciptakan desain yang fungsional, estetis, dan berkelanjutan.</li>
            <li>Mengutamakan kepuasan klien dengan pelayanan profesional.</li>
            <li>Mengembangkan talenta arsitek muda berbakat.</li>
            <li>Menghadirkan solusi kreatif sesuai kebutuhan masyarakat.</li>
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
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden rounded-2xl bg-zinc-900 group ${member.span}`}
            >
              <Image
                src={member.img}
                alt={member.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-5">
                <h3 className="text-lg font-semibold text-yellow-300">
                  {member.name}
                </h3>
                <p className="text-gray-300 text-sm">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
