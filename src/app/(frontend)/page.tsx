/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";
import { GiHammerNails, GiDeskLamp } from "react-icons/gi";
import Image from "next/image";
import BenefitSection from "./components/section/benefit";
import MottoPage from "./components/section/motto";
// import PricePage from "./components/section/harga";
// import StepPage from "./components/section/langkah";
import ServicePage from "./components/section/service";
import StepCard from "./components/section/step";
import StepSection from "./components/section/tahapan";
import WhatsAppChatbot from "./components/slices/chat";

export default function LuxuryContractor() {
  const infoData = [
    {
      title: "Desain Rumah Mewah",
      text: "Kami menciptakan desain rumah yang mewah dan elegan, sesuai dengan gaya hidup Anda. Setiap detail dirancang untuk memberikan kenyamanan dan kemewahan tiada tara.",
      icon: <FiHome size={32} className="text-yellow-400" />,
    },
    {
      title: "Konstruksi & Renovasi",
      text: "Tim profesional kami menangani konstruksi dan renovasi rumah mewah dengan presisi tinggi. Pastikan proyek selesai tepat waktu dan sesuai standar kualitas premium.",
      icon: <GiHammerNails size={32} className="text-yellow-400" />,
    },
    {
      title: "Konsultasi & Interior",
      text: "Kami memberikan konsultasi desain interior dan eksterior untuk rumah mewah Anda. Transformasikan hunian menjadi karya seni yang memukau dan nyaman untuk keluarga.",
      icon: <GiDeskLamp size={32} className="text-yellow-400" />,
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">

        <Image
          src="/images/background/bg11.jpg"
          alt="Hero House"
          fill
          className="absolute inset-0 object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative z-10 text-center max-w-2xl px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-400 text-glow-gold">
            Bless Luxury <br /> <span className="text-white">Contractor</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Transformasikan rumah impian Anda menjadi kenyataan <br />Solusi Tepat, Hunian Hebat.
          </p>
        </motion.div>
      </section>

      {/* Motto Section */}
      <StepCard data={infoData}/>

        {/* Service Section */}
      <ServicePage/>

      {/* Motto Section */}
      <BenefitSection/>

      {/* Step Section */}
      <StepSection/>

      {/* Motto Section */}
      <MottoPage/>

      {/* Price Section */}
      {/* <PricePage/> */}

      {/* Step Section */}
      {/* <StepPage/> */}

      {/* Whatsapp Chatbot */}
      <WhatsAppChatbot/>
    </div>
  );
}
