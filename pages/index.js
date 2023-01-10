import Head from "next/head";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { signIn } from "next-auth/react";

export default function Home({ data }) {
  const handleSub = async () => {
    await signIn();
  };

  return (
    <>
      <Head>
        <title>Grosir Management System</title>;
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-row justify-center items-center bg-white ">
        <div className="relative flex-1 h-screen">
          <Image
            src="/splashimage-1.jpg"
            fill
            className="w-12"
            alt="splash"
            priority
          />
        </div>
        <div className="w-96 h-96 fixed top-0 bg-white mt-28 p-5 text-c">
          <h2 className="text-lg mb-2">Wellcome</h2>
          <h1 className="text-4xl font-semibold mb-5">
            Grosir Management System
          </h1>
          <p className="mb-3">You are not logged yet!</p>
          <Button color="deep-orange" onClick={handleSub}>
            login
          </Button>
        </div>
      </main>
    </>
  );
}
