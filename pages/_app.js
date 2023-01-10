import "../styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import DefaultLayout from "../components/layout/DefaultLayout";
import GudangLayout from "../components/layout/GudangLayout";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}) {
  const getContent = () => {
    if (["/", "/auth/login"].includes(appProps.router.pathname))
      return <Component {...pageProps} />;

    if (appProps.router.pathname.match(/gudang/i))
      return (
        <GudangLayout>
          <Component {...pageProps} />
        </GudangLayout>
      );

    return (
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    );
  };

  return (
    <ThemeProvider>
      <SessionProvider session={session}>{getContent()}</SessionProvider>
    </ThemeProvider>
  );
}
