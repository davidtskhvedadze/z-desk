import { EventsProvider } from "@/context/eventsContext";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EventsProvider>
      <Component {...pageProps} />
    </EventsProvider>
  );
}

export default MyApp;