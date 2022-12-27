import "../styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import DefaultLayout from "../components/layout/DefaultLayout";

export default function App({ Component, pageProps, ...appProps }) {
  const getContent = () => {
    if (["/"].includes(appProps.router.pathname))
      return <Component {...pageProps} />;

    return (
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    );
  };

  return <ThemeProvider>{getContent()}</ThemeProvider>;
}
