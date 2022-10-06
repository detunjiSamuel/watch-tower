import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import type { NextAuthOptions } from "next-auth"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export const authOptions : NextAuthOptions= {
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET
  // callbacks: {
  //   async jwt({ token, account }) {
  //     // Persist the OAuth access_token to the token right after signin
  //     if (account) {
  //       token.accessToken = account.access_token;
  //     }
  //     return token;
  //   },

  //   async session({ session, token, user }) {
  //     // Send properties to the client, like an access_token from a provider.
  //     session.accessToken = token.accessToken;
  //     return session;
  //   },
  // },
};
export default NextAuth(authOptions);
