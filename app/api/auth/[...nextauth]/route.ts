import { connectToDB } from "@/helpers/server-helpers";
import prisma from "@/prisma";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", placeholder: "Email" },
        password: { label: "password", placeholder: "Password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        try {
          await connectToDB();
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });
          if (!user?.hashedPassword) return null;
          const cryptPassword = await bcrypt.compare(
            credentials.password,
            user?.hashedPassword
          );
          if (cryptPassword) return user;
          return null;
        } catch (error) {
          console.log(error);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
