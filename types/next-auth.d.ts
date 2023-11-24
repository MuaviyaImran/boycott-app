declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      message?: IAuthenticationErrror | null;
      user: Users | null;
    };
  }
}
