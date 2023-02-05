import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { useDeferredValue } from "react";

const base_url = process.env.API_BASE_URL;

export const authOptions = {
  providers: [
    Credentials({
      name: "Commans Login",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const data = {
          username: credentials.username,
          password: credentials.password,
        };

        const token = await axios.post(`${base_url}/api/login`, data);

        if (token.status != 200) {
          console.log("oke");
          return null;
        }
        const user = await axios.get(`${base_url}/api/user`, {
          headers: {
            token: token.data.token,
          },
        });

        if (user.status == 200) {
          return {
            token: token.data,
            user: user.data,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signInPage",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (user) {
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.tokenObj = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.tokenObj.token;
      session.permission = token.tokenObj.permision;
      session.user = token.user;
      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, authOptions);
