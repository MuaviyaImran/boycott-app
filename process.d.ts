declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_URL: string;
    ADMIN_EMAIL: string;
    AUTH_SECRET: string;
  }
}
