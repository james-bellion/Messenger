import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitbubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitbubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      // authorise function: comparing user password to their password in database when trying to sign in.
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        // if ok we can continue searching for user
        const user = await prisma.user.findUniqie({
          where: {
            email: credentials.email, // find user with unique id
          },
        });
        // check if user exists
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        // check user enter correct password
        // passt first argument cred.passw second argument pass usr.hash.pass
        // compare what the form user has submitted with whats on the database
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // check if the password is not correct
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        // if all these checks work: eg
        // if there is a existing user
        // if it does have a hashed password
        // and the password is correct
        return user;
      },
    }),
  ],
  // debug mode for useful terminl info for authentication state
  debug: process.env.NODE_ENV === "development", // only in devlopment we will turn on debug mode
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions); // passing in our object (need lowercase a)

export { handler as GET, handler as POST }; // this step to work with the new next.js route handlers acording to the doucs
