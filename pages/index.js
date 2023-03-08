import { Button } from "@material-tailwind/react";
import Head from "next/head";
import Image from "next/image";
import { signIn } from "next-auth/react";
export default function Home() {
  const handleSub = async () => {
    await signIn({ callbackUrl: "/admin" });
  };

  return (
    <div>
      <Head>
        <title>Grosir</title>
        <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
      </Head>
      <main className="min-h-screen flex flex-row justify-center items-center bg-white ">
        <div className="relative flex-1 h-screen">
          <Image
            src="/splash3.jpg"
            fill
            className="object-cover"
            alt="splash"
            priority
          />
        </div>
        <div className="w-1/2 fixed top-50 -translate-y-1/2 bg-white mt-32 p-5 ">
          <h2 className="text-sm lg:text-lg mb-2">Wellcome to</h2>
          <h1 className="text-md lg:text-4xl font-semibold mb-5">
            Grosir Management System
          </h1>
          <Button
            size="md"
            color="orange"
            variant="gradient"
            className=" lg:w-40"
            onClick={handleSub}
          >
            login
          </Button>
        </div>
      </main>
    </div>
  );
}
