"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    document.title = "Login | Admin Panel";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        // 🚀 sukses login → biarkan tombol tetap loading sampai pindah halaman
        router.push("/backend");
      } else {
        // ❌ gagal login → reset loading
        setErrorMessage(res?.error || "Login gagal: email atau password salah");
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMessage("Terjadi error saat login. Cek console untuk detail.");
      console.error("Unexpected login error:", err);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fa",
        padding: "1rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            marginBottom: "1.5rem",
            textAlign: "center",
            color: "#333",
          }}
        >
          Login
        </h2>

        {errorMessage && (
          <div
            style={{
              marginBottom: "1rem",
              padding: "0.75rem",
              backgroundColor: "#ffe5e5",
              color: "#d8000c",
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            {errorMessage}
          </div>
        )}

        <label
          htmlFor="email"
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "#555" }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Masukkan email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
          disabled={loading}
        />

        <label
          htmlFor="password"
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "#555" }}
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: loading ? "#999" : "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
