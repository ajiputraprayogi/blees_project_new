"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import OrderForm from "../components/section/order";

export default function ContactPage() {
  const socials = [
        {
      name: "Whatsapp",
      href: "https://wa.me/6285176795609",
      icon: <FaWhatsapp className="text-yellow-500 text-2xl" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/bless.kontraktor/",
      icon: <FaInstagram className="text-yellow-500 text-2xl" />,
    },
    {
      name: "Facebook",
      href: "https://facebook.com/",
      icon: <FaFacebook className="text-yellow-500 text-2xl" />,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/",
      icon: <FaLinkedin className="text-yellow-400 text-2xl" />,
    },
    {
      name: "Twitter / X",
      href: "https://twitter.com/",
      icon: <FaTwitter className="text-yellow-400 text-2xl" />,
    },
    {
      name: "Email",
      href: "mailto:blesscontractor@gmail.com",
      icon: <FaEnvelope className="text-yellow-400 text-2xl" />,
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 py-16 flex flex-col items-center justify-center">
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className="max-w-3xl w-full text-center space-y-10"
      >
        {/* Judul */}
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">
          Hubungi Kami
        </h1>
        <p className="text-gray-300 text-lg">
          Terhubung dengan Bless Architect melalui sosial media atau email.
          Kami siap membantu kebutuhan desain rumah Anda.
        </p>

        {/* Grid Sosial Media */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {socials.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-md transition"
            >
              {item.icon}
              <Link
                href={item.href}
                target="_blank"
                className="font-semibold text-white hover:text-yellow-400 transition"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
       <OrderForm />
    </section>
  );
}
