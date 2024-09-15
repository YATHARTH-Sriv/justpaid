import { NextAuthOptions } from 'next-auth';
import FreshBooksProvider from 'next-auth/providers/freshbooks';

export const authOptions: NextAuthOptions = {
  providers: [
    FreshBooksProvider({
      clientId: process.env.FRESHBOOKS_CLIENT_ID,
      clientSecret: process.env.FRESHBOOKS_CLIENT_SECRET,
      authorization: {
        url: 'https://auth.freshbooks.com/oauth/authorize',
        params: { scope: 'user:profile:read' },
      },
      token: 'https://auth.freshbooks.com/oauth/token',
      userinfo: 'https://api.freshbooks.com/auth/api/v1/users/me',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Attach FreshBooks access token to the user's JWT token
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the access token to the client-side session
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};
