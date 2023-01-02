import Head from "next/head";
import { CardHeader, CardBody, Input, Button } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const handleSub = () => {
    router.push("/gudang/dashboard");
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>;
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-row justify-center items-center bg-white ">
        <div className="relative flex-1 h-screen">
          <Image src="/splashimage-1.jpg" fill className="w-12" />
        </div>
        <form className="w-min p-10 flex justify-center">
          <div className="w-96 h-min">
            <CardHeader
              color="transparent"
              className="grid place-items-center p-2 shadow-none"
            >
              <h2 className="text-5xl font-semibold text-c">Login</h2>
            </CardHeader>
            <CardBody className="flex flex-col gap-8">
              <Input label="Identifier" color="deep-orange" />
              <Input label="Password" color="deep-orange" />
              <Button color="deep-orange" onClick={handleSub}>
                Submit
              </Button>
            </CardBody>
          </div>
        </form>
      </main>
    </>
  );
}
