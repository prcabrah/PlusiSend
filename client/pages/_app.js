import Header from "@/components/header";
import PreLoader from "@/components/preloader";
import GlobalProvider from "@/contexts/global-context";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Head from "next/head";
import "../styles/globals.css";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{`${Component.title} | PlusiSend`}</title>
        <meta name="description" content={Component.desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <GlobalProvider>
          <PreLoader>
            <Header />
            <main>
              <Component {...pageProps} />
            </main>
          </PreLoader>
        </GlobalProvider>
      </ThirdwebProvider>
    </>
  );
}

export default MyApp;
