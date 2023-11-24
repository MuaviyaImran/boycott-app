declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      _id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      profilePic?: string | null;
      user: Users | null;
    };
  }
}
