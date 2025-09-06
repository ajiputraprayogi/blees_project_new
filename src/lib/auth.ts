import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email dan password harus diisi");
                }

                // Cari user berdasarkan email
                const user = await prisma.users.findUnique({
                    where: { email: credentials.email },
                    include: {
                        user_roles: {
                            include: {
                                roles: {
                                    include: {
                                        role_has_permissions: {
                                            include: { permissions: true },
                                        },
                                    },
                                },
                            },
                        },
                    },
                });

                if (!user) {
                    throw new Error("User tidak ditemukan");
                }

                // Verifikasi password
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    throw new Error("Password salah");
                }

                // Kumpulkan permissions unik
                const permissionsSet = new Set<string>();
                user.user_roles.forEach((ur) => {
                    ur.roles.role_has_permissions.forEach((rp) => {
                        permissionsSet.add(rp.permissions.name);
                    });
                });

                // Return user object untuk JWT
                return {
                    id: user.id.toString(),
                    nama: user.nama ?? "",
                    email: user.email ?? "",
                    roles: user.user_roles.map((ur) => ur.roles.name),
                    permissions: Array.from(permissionsSet),
                };
            },
        }),
    ],
    pages: {
        signIn: "/login", // opsional custom page
    },
    session: {
        strategy: "jwt",
        maxAge: 2 * 60 * 60, // 2 jam
        updateAge: 15 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id ?? "";               // fallback jika undefined
                token.nama = user.nama ?? "";           // fallback
                token.email = user.email ?? "";         // fallback penting
                token.roles = user.roles ?? [];
                token.permissions = user.permissions ?? [];
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    nama: token.nama as string,
                    email: token.email as string,
                    roles: token.roles as string[],
                    permissions: token.permissions as string[],
                };
            }
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: true, // aktifkan debug untuk log di console
};

export default NextAuth(authOptions);
