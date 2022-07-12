import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { IdeaProvider } from "../contexts/IdeaContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <IdeaProvider>
        <Component {...pageProps} />
      </IdeaProvider>
    </ChakraProvider>
  );
}

export default MyApp;
