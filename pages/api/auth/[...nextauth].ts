import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "models/user/user.model";
import { TokenUser } from "types/types";
import dbConnect from "pages/database/conn";
export default NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials are undefined");
        }
        dbConnect().catch(() => {
          throw new Error("DB Connection Failed!");
        });

        const result = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        if (!result) {
          throw new Error("No user Found with Email Please Sign Up...!");
        }

        const checkPassword = await result.comparePassword(
          credentials.password
        );

        if (!checkPassword) {
          throw new Error("Username or Password doesn't match");
        }

        return result;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userId = (user as unknown as { _id: string })._id;
        const userRole = (user as unknown as { role: string }).role;
        const userImage = (user as unknown as { profilePic: string })
          .profilePic;
        token.user = {
          id: userId,
          email: user.email,
          role: userRole,
          name: user.name,
          image: userImage,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user as TokenUser;
      }
      return session;
    },
  },
});
