"use client";

const packages = [
  {
    name: "PAKET STANDAR",
    price: "25.000 /M²",
    features: [
      "Desain Denah Lantai",
      "Desain 3D Eksterior (6 view)",
      "Gambar Kerja Arsitektur (tampak dan potongan)",
    ],
    button: "Pilih Paket",
    color: "bg-blue-100 text-blue-700", // putih
  },
  {
    name: "PAKET BASIC",
    price: "35.000 /M²",
    features: [
      "Desain Denah Lantai",
      "Desain 3D Eksterior (6 view)",
      "Potongan A-A",
      "Potongan B-B",
      "Bonus Perhitungan RAB (Eksterior)",
    ],
    button: "Pilih Paket",
    color: "bg-green-100 text-green-700", // hijau
  },
  {
    name: "PAKET SILVER",
    price: "55.000 /M²",
    features: [
      "Desain Denah Lantai",
      "Desain 3D Eksterior (6 view)",
      "Gambar DED Lengkap",
      "Perhitungan RAB (Eksterior)",
      "Desain Interior Bonus",
    ],
    button: "Pilih Paket",
    color: "bg-gray-100 text-gray-700", // silver
  },
  {
    name: "PAKET GOLD",
    price: "75.000 /M²",
    features: [
      "Desain Denah Lantai",
      "Desain 3D Eksterior (6 View)",
      "Gambar DED Lengkap",
      "Perhitungan RAB (Eksterior & Interior)",
      "Desain Interior 3D",
      "Detail Interior",
    ],
    button: "Pilih Paket",
    color: "bg-yellow-100 text-yellow-700", // gold
  },
];

export default function PriceCard() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16">
      {/* Heading */}
      <h2
        data-aos="fade-up"
        className="text-3xl md:text-4xl font-bold text-center mb-4"
      >
        Pilih Paket Jasa Arsitektur
      </h2>
      <p
        data-aos="fade-up"
        data-aos-delay="150"
        className="text-gray-400 text-center max-w-2xl mb-12"
      >
        Sesuaikan kebutuhan proyekmu dengan paket yang kami sediakan. Harga
        berdasarkan luas bangunan (per meter persegi).
      </p>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {packages.map((pkg, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 150}
            className="flex"
          >
            <div
              className="flex flex-col h-full w-full bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-gray-700 shadow-lg transform transition-transform ease-in-out duration-300 hover:scale-105 hover:shadow-yellow-700/30"
            >
              {/* Header */}
              <div className="px-6 py-6 border-b border-gray-600 flex flex-col items-start gap-3">
                <span
                  className={`inline-block bg-gradient-to-r ${pkg.color} text-sm font-semibold px-4 py-1 rounded-full shadow-md`}
                >
                  {pkg.name}
                </span>
                <span className="inline-block text-yellow-400 text-lg font-bold px-2 rounded-xl">
                  {pkg.price}
                </span>
              </div>

              {/* Features */}
              <ul className="flex-1 px-6 py-6 space-y-3 text-sm text-gray-300">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow-400">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <div className="px-6 py-6 border-t border-gray-600">
                <button
                  className={`w-full py-2 rounded-xl font-semibold bg-gradient-to-r ${pkg.color} text-black transition-all duration-300 hover:opacity-90 hover:scale-[1.02]`}
                >
                  {pkg.button}
                </button>
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}
