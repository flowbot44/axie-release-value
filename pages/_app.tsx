import "@/styles/app.css";
import type { AppProps } from "next/app";

import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import NavBar from '../components/NavBar';

Amplify.configure(outputs);

export default function App({ Component, pageProps }: AppProps) {
  return(
  <>
      
    <Authenticator>
    <NavBar />   
      <Component {...pageProps} />
    </Authenticator>
  </>
  )
}
