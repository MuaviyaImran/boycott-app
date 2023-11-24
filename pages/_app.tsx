import { SessionProvider } from "next-auth/react";
import "styles/globals.css";
import type { AppProps } from "next/app";
import { Suspense } from "react";
import { MyProvider } from "utils/contextProvider";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Suspense fallback={<div>Loading...</div>}>
        <MyProvider>
          <Component {...pageProps} />
        </MyProvider>
      </Suspense>
    </SessionProvider>
  );
}
