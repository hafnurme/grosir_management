import "../styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import DefaultLayout from "../components/layout/DefaultLayout";
import GudangLayout from "../components/layout/GudangLayout";

export default function App({ Component, pageProps, ...appProps }) {
  const getContent = () => {
    if (["/"].includes(appProps.router.pathname))
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

  return <ThemeProvider>{getContent()}</ThemeProvider>;
}
