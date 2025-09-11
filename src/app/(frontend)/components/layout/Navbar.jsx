"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Squash as Hamburger } from "hamburger-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Init AOS sekali di awal render
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  // Delay unmount saat close
  useEffect(() => {
    if (isOpen) {
      setShowMenu(true);
    } else {
      const timer = setTimeout(() => setShowMenu(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Harga & Layanan", href: "/pricing" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Profil", href: "/profile" },
    { name: "Informasi", href: "/information" },
    { name: "Kontak", href: "/contact" },
  ];

  return (
    <>
      <nav className="flex items-center justify-between p-6 mx-auto fixed top-0 z-50 w-full backdrop-blur bg-black/15">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/brand/logos.png"
            alt="Bless Architect Logo"
            width={50}
            height={50}
            className="rounded-lg"
          />
        </Link>

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
        <div className="md:hidden text-yellow-400">
          <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMenu && (

<div
  className={`md:hidden fixed top-0 left-0 w-full h-screen backdrop-blur bg-black/35 text-white flex flex-col items-center justify-center gap-6 z-40 transform transition-all duration-400 ${
    isOpen
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-5 pointer-events-none"
  }`}
  data-aos={isOpen ? "fade-down" : undefined} 
>

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
