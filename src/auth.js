import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./libs/prisma";
// import { compare } from "bcryptjs";
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth, update, trigger } = NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  // newSession: {},
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    expires: 3600,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   allowDangerousEmailAccountLinking: true,
    //   authorization: {
    //     params: {
    //       prompt: "consent",
    //       access_type: "offline",
    //       response_type: "code"
    //     }
    //   }
    // }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const existingUser = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });
        if (!existingUser) {
          return null;
        }

        // if (!bcrypt.compareSync(credentials.password, existingUser.password)) {
        //   throw new Error("Incorrect password");
        // }

        const passwordMatch = bcrypt.compareSync(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingUser.id,
          username: existingUser.username,
          name: existingUser.name,
          email: existingUser.email,
          akses: existingUser.akses,
          image: existingUser.image,
        };
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.akses = user.akses
      return session
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@gmail.com")
      } else if (account.provider === "credentials") {
        return true;
      }
    },
    async redirect({ url, baseUrl }) {

      return baseUrl;
    },
    async jwt({ token, user, trigger, session, account, profile, isNewUser }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          akses: user.akses,
        };
      }
      if (trigger === "update" && session) {
        token = { ...token, user: session }
        return token;
      }
      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          akses: token.akses
        }
      }
    },
  }
});
