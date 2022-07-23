import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import AuthProvider from "../contexts/AuthContext";
import { IdeaProvider } from "../contexts/IdeaContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <IdeaProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </IdeaProvider>
    </ChakraProvider>
  );
}

export default MyApp;
