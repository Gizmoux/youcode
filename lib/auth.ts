import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const {
  auth: baseAuth,
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
// lib/auth.ts

export const getAuthSession = async () => {
  const session = await baseAuth(); // Récupérer la session via baseAuth
  return session;
};

export const getRequiredAuthSession = async () => {
  const session = await getAuthSession(); // Récupérer la session
  if (!session?.user) {
    throw new Error("User not authenticated"); // Si l'utilisateur n'est pas authentifié, lancer une erreur
  }

  return session as {
    user: {
      email: string;
      image?: string;
      name?: string;
      id: string;
    };
  };
};
