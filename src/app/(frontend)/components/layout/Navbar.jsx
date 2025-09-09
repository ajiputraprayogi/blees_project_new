"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Harga & Layanan", href: "/pricing" },
    { name: "Profil", href: "/profile" },
    { name: "Informasi", href: "/information" },
    { name: "Kontak", href: "/contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 mx-auto fixed top-0 z-50 w-full backdrop-blur bg-black/15">
        {/* Logo */}
        <div className="text-2xl font-bold text-yellow-400">
          <Link href="/">Bless Architect</Link>
        </div>

        {/* Menu Desktop */}
        <ul className="hidden md:flex gap-6 text-white">
          {menuItems.map((item, i) => (
            <li key={i}>
              <Link
                href={item.href}
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Button Desktop */}
        <Link
          href="/kontak"
          className="hidden md:block bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition"
        >
          Hubungi Kami
        </Link>

        {/* Hamburger Mobile */}
        <button
          className="md:hidden text-yellow-400 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-black/90 text-white flex flex-col items-center gap-6 py-8 z-40">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="hover:text-yellow-300 text-lg transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/kontak"
            className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Hubungi Kami
          </Link>
        </div>
      )}
    </>
  );
}
