"use client";

import {
  FiHome,
  FiMaximize,
  FiBox,
  FiShield,
  FiSun,
  FiWind,
  FiStar,
  FiLayers,
  FiCheckCircle,
  FiMessageCircle,
  FiRefreshCw,
  FiCreditCard,
  FiGrid,
  FiImage,
  FiCamera,
  FiCpu,
  FiPrinter,
  FiFileText,
  FiVideo,
  FiGitMerge,
  FiCheckSquare,
  FiSmartphone,
  FiCompass,
  FiUserCheck,
  FiMapPin,
  FiZap,
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

type Feature = {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="800"
      className="group relative rounded-2xl bg-gradient-to-br from-neutral-950 to-neutral-950 p-5 shadow-md backdrop-blur hover:-translate-y-1 hover:scale-[1.01] transition"
    >
      {children}
    </div>
  );
}

function FeatureRow({ label, Icon, badge }: Feature) {
  return (
    <div className="flex md:flex-col items-center gap-3">
      <span className="inline-flex size-9 items-center justify-center rounded-xl border border-yellow-500/40 bg-neutral-900 text-yellow-400 shadow-sm group-hover:shadow-md">
        <Icon className="size-5" />
      </span>
      <span className="text-sm md:text-base font-medium text-neutral-200">
        {label}
      </span>
      {badge ? (
        <span className="ml-auto inline-flex items-center rounded-full border border-yellow-500/40 bg-yellow-400/10 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-yellow-300">
          {badge}
        </span>
      ) : null}
    </div>
  );
}

const coreFeatures: Feature[] = [
  { label: "Simbol & Status Elit", Icon: FaCrown },
  { label: "Tampilan Megah & Elegan", Icon: FiHome },
  { label: "Tata Ruang Lega", Icon: FiMaximize },
  { label: "Interior Lebih Nyaman", Icon: FiBox },
  { label: "Struktur Lebih Aman", Icon: FiShield },
  { label: "Long Lasting Style", Icon: FiStar },
  { label: "Cahaya Terang Alami", Icon: FiSun },
  { label: "Sirkulasi Hybrid", Icon: FiWind },
  { label: "Material Berkelas", Icon: FiLayers },
  { label: "Fasilitas Lengkap", Icon: FiGrid },
  { label: "Quality Control Berlapis", Icon: FiCheckCircle },
  { label: "Konsultasi Gratis", Icon: FiMessageCircle },
  { label: "Revisi Sampai Puas", Icon: FiRefreshCw },
  { label: "Pembayaran Bertahap", Icon: FiCreditCard },
];

const deliverables: Feature[] = [
  { label: "Gambar Denah", Icon: FiGrid, badge: "2D" },
  { label: "Gambar Model", Icon: FiImage, badge: "3D" },
  { label: "Visual Render Eksterior", Icon: FiCamera },
  { label: "Bonus Suggest 3D Visual Interior", Icon: FiCamera },
  { label: "Gambar Teknis Arsitektur", Icon: FiFileText },
  { label: "Gambar Teknis Struktur", Icon: FiCpu },
  { label: "Gambar Teknis Elektrikal", Icon: FiZap },
  { label: "Print Out A3 & Softcopy", Icon: FiPrinter },
  { label: "Mendapatkan RAB", Icon: FiFileText },
  { label: "Bonus Video 3D", Icon: FiVideo },
  { label: "Koordinasi Gambar Saat Pembangunan", Icon: FiGitMerge },
  { label: "Garansi Dapat Dibangun", Icon: FiCheckSquare },
];

const optionalExtras: Feature[] = [
  { label: "Smart Home", Icon: FiSmartphone },
  { label: "Feng Shui", Icon: FiCompass },
  { label: "Jasa Pengawas", Icon: FiUserCheck },
  { label: "Jasa Kunjungan", Icon: FiMapPin },
];

export default function MottoPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 bg-black">
      {/* Hero */}
      <section className="mb-14">
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          className="flex flex-col items-start gap-6 rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-neutral-950 to-neutral-900 p-8 shadow-lg"
        >
          <div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Paket Desain Rumah — Modern, Responsif, Minimalis
            </h1>
            <p className="mt-2 max-w-3xl text-sm md:text-base text-neutral-400">
              Fokus pada kualitas, kenyamanan, dan estetika jangka panjang.
              Semua poin di bawah ini sudah termasuk dalam layanan kami.
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { Icon: FaCrown, label: "Elit" },
              { Icon: FiShield, label: "Aman" },
              { Icon: FiSun, label: "Alami" },
              { Icon: FiStar, label: "Tahan Lama" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                data-aos="zoom-in"
                className="flex items-center justify-center gap-2 rounded-2xl border border-yellow-500/30 bg-neutral-950 px-4 py-3 text-sm shadow-md"
              >
                <Icon className="size-5 text-yellow-400" />
                <span className="font-medium text-neutral-200">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="mb-14">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-lg md:text-2xl font-bold text-yellow-400">
            Keunggulan Utama
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreFeatures.map((f) => (
            <Card key={f.label}>
              <FeatureRow {...f} />
            </Card>
          ))}
        </div>
      </section>

      {/* Deliverables */}
      <section className="mb-14">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-lg md:text-2xl font-bold text-yellow-400">
            Dokumen & Output yang Anda Dapatkan
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((d) => (
            <Card key={d.label}>
              <FeatureRow {...d} />
            </Card>
          ))}
        </div>
      </section>

      {/* Optional */}
      <section className="mb-4">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-lg md:text-2xl font-bold text-yellow-400">
            Biaya Tambahan (Opsional)
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {optionalExtras.map((o) => (
            <Card key={o.label}>
              <FeatureRow {...o} />
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
