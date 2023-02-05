import Head from "next/head";
import { Input, Button, CardHeader, CardBody } from "@material-tailwind/react";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function signInPage() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [inputRequired, setInputRequired] = useState(false);

  const router = useRouter();

  const handleSub = async (elemen) => {
    elemen.preventDefault();
    if ((username !== null, password !== null)) {
      await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      }).then((res) => {
        if (res.status === 200) {
          setIsLogin(true);
        }
        if (res.status === 401) {
          setLoginError(true);
        }
      });
    } else {
      console.log("gagal");
    }
  };

  useEffect(() => {
    const sess = getSession();
    if (sess) {
      sess.then((res) => {
        if (res) {
          router.push("/admin");
        }
      });
    }
  }, [isLogin]);

  return (
    <>
      <Head>
        <title>Grosir Management System</title>;
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen flex flex-row justify-center bg-white ">
        <div className="relative flex-1 h-screen">
          <Image
            src="/splash5.jpg"
            fill
            className="object-cover"
            alt="splash"
            quality={60}
            priority
          />
        </div>
        <form
          className="w-96 bg-white p-5 flex justify-center fixed top-1/2 -translate-y-1/2"
          onSubmit={handleSub}
        >
          <div className="w-96 h-min">
            <CardHeader color="transparent" className="mx-0 mt-0 shadow-none">
              <h2 className="mb-2 text-lg text-black">Form</h2>
              <h2 className="text-4xl font-semibold mb-5 text-black">Login</h2>
            </CardHeader>
            <CardBody className="flex flex-col gap-3 p-0">
              <Input
                label="Username"
                color="orange"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Input
                label="Password"
                color="orange"
                type={"password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button color="orange" variant="gradient" onClick={handleSub}>
                Login
              </Button>
              {inputRequired === false && (
                <p className="text-center">Fill the required credentials</p>
              )}
              {loginError === true && (
                <p className="text-red-500">Login Error</p>
              )}
            </CardBody>
          </div>
        </form>
      </main>
    </>
  );
}
