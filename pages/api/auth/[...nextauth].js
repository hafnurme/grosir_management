import NextAuth from "next-auth";
import Provider from "next-auth/providers/credentials";

export const NextAuthOptions = {
  providers: [
    Provider({
      id: "credentials",
      name: "credentials",

      async authorize(credentials, req) {
        const tokenusrn = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
        if (!tokenusrn.token) {
          return null;
        }
        const user = await fetch(
          `http://127.0.0.1:8000/api/user/${tokenusrn.usrn}`,
          {
            method: "GET",
            headers: {
              token: tokenusrn.token,
            },
          }
        ).then((res) => res.json());
        if (!user) {
          return null;
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (user) {
        account.user = user;

        return true, account;
        console.log(account);
      }
      return false;
    },
    async jwt({ token, account }) {
      if (account) {
        token.user = account.user;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token;
      session.user = token.user;
      return session;
    },
  },
};
export default (req, res) => NextAuth(req, res, NextAuthOptions);
