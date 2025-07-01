import NextAuth from "next-auth"
import Nodemailer from "next-auth/providers/nodemailer"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/db"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    // Ensure the id is included in the session
    async session({ session, user }) {
      if (user) {
        console.log('Session User Id:', user.id);
        console.log('Session User Session:', session.user);
        session.user = user;
      }
      return session;
    }
  },
})