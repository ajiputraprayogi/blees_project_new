"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import LogoMeaningPage from "../components/section/logo";

export default function ProfilePage() {
  const team = [
    {
      name: "Ferry Irwandi",
      role: "Founder & CEO",
      img: "/images/user/ferry.jpg",
      span: "col-span-2 row-span-2", // lebih besar
    },
    {
      name: "Ferry Irwandi 2",
      role: "Lead Architect",
      img: "/images/user/ferry.jpg",
      span: "",
    },
    {
      name: "Ferry Irwandi 3",
      role: "Interior Designer",
      img: "/images/user/ferry.jpg",
      span: "",
    },
    {
      name: "Ferry Irwandi 4",
      role: "Project Manager",
      img: "/images/user/ferry.jpg",
      span: "col-span-2", // lebar
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen py-16 px-3 md:px-12 lg:px-0 space-y-20">
      {/* Logo Meaning */}
      <LogoMeaningPage />
      {/* Sejarah Perusahaan */}
      <section className="max-w-4xl mx-auto text-center space-y-6 mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-left md:text-center text-yellow-400 px-5 md:px-0">
          Sejarah Perusahaan
        </h2>
        <p className="text-gray-300 leading-relaxed text-left md:text-center px-5 md:px-0">
          Bless Kontraktor hadir sebagai jawaban atas kebutuhan masyarakat akan layanan kontraktor dan desain bangunan yang tidak hanya fungsional, tetapi juga menghadirkan nilai estetika dan kemewahan. Dengan semangat memberikan berkah dalam setiap karya, Bless Kontraktor mengedepankan kualitas, detail, serta inovasi dalam setiap proyek yang dikerjakan.
<br /> <br />
Didukung oleh tim profesional yang berpengalaman di bidang arsitektur, desain interior, dan konstruksi, Bless Kontraktor berkomitmen menghadirkan solusi pembangunan yang efisien, transparan, dan terpercaya. Fokus kami tidak sekadar membangun hunian atau gedung, tetapi juga mewujudkan ruang yang mampu merepresentasikan identitas, gaya hidup, dan kenyamanan bagi penggunanya.
<br /> <br />
Mengusung identitas sebagai Luxury Contractor, Bless Kontraktor menempatkan diri pada standar yang lebih tinggi dalam hal desain, material, serta pengerjaan. Setiap proyek adalah karya yang dibangun dengan integritas, ketelitian, dan dedikasi, sehingga menghasilkan bangunan yang kokoh, elegan, dan bernilai jangka panjang.
<br /> <br />
Dengan visi menjadi kontraktor terpercaya dan pilihan utama dalam menghadirkan bangunan premium, Bless Kontraktor siap menjadi mitra terbaik dalam mewujudkan impian klien melalui layanan menyeluruh, mulai dari perencanaan, desain 3D, visualisasi, hingga pembangunan yang detail dan terukur.
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
            Menjadi perusahaan kontraktor dan desain bangunan terpercaya di Indonesia yang menghadirkan karya berkualitas, inovatif, dan efisien, serta mampu mewujudkan hunian dan bangunan impian yang bernilai jangka panjang.
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
            <li>Memberikan layanan desain dan pembangunan yang detail, transparan, dan profesional.</li>
            {/* <li>Menciptakan desain yang fungsional, estetis, dan berkelanjutan.</li> */}
            <li>Menghadirkan solusi efisiensi biaya tanpa mengurangi kualitas hasil pekerjaan.</li>
            <li>Menggunakan teknologi terbaru dalam visualisasi dan perencanaan proyek.</li>
            <li>Membangun hubungan jangka panjang dengan klien melalui kepercayaan, kepuasan, dan integritas.</li>
            <li>Mengembangkan tim yang kompeten, kreatif, dan berkomitmen tinggi dalam setiap proyek.</li>
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
