"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ChatMessage {
  type: "user" | "bot";
  text: string;
}

export default function ContractorChatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const knowledgeBase: { pattern: RegExp; response: string }[] = [
    {
      pattern: /harga|biaya|ongkos/i,
      response:
        "Biaya kontraktor desain rumah tergantung luas, kompleksitas desain, dan bahan. Estimasi bisa diberikan setelah kebutuhan spesifik diketahui.",
    },
    {
      pattern: /waktu|lama|durasi/i,
      response:
        "Rata-rata pengerjaan desain rumah 2-4 minggu, tergantung jumlah revisi dan tingkat detail.",
    },
    {
      pattern: /revisi|perubahan/i,
      response:
        "Kami menyediakan 2-3 kali revisi gratis selama proses desain agar hasil sesuai keinginan.",
    },
    {
      pattern: /portfolio|contoh|hasil/i,
      response:
        "Cek portfolio kami di website resmi untuk melihat contoh desain rumah yang telah dikerjakan.",
    },
    {
      pattern: /kontak|hubungi|telp|email/i,
      response:
        "Hubungi kami via email: info@desainrumah.com atau telepon: 0812-3456-7890.",
    },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const found = knowledgeBase.find((item) => item.pattern.test(input));
    const botMessage: ChatMessage = {
      type: "bot",
      text: found
        ? found.response
        : "Maaf, kami belum bisa menjawab pertanyaan itu. Bisa perjelas?",
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
    }, 300);

    setInput("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-2xl shadow-xl flex flex-col gap-4 text-gray-100">
      <h2 className="text-xl font-semibold text-center text-yellow-400">
        Chatbot Kontraktor Rumah
      </h2>

      <div className="flex-1 overflow-y-auto h-64 p-3 rounded-lg bg-gray-800 flex flex-col gap-2">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-2 rounded-lg max-w-[80%] break-words ${
              msg.type === "user"
                ? "bg-yellow-400 text-gray-900 self-end"
                : "bg-gray-700 text-gray-100 self-start"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-700 rounded-lg p-2 focus:outline-yellow-400"
          type="text"
          placeholder="Tanya tentang kontraktor rumah..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-yellow-400 text-gray-900 px-4 rounded-lg hover:bg-yellow-500 transition"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
