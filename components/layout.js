import { useRouter } from "next/router";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useState } from "react";

export default function layout({ children }) {
  const router = useRouter();
  const [openNav, setOpenNav] = useState(false);

  if (router.pathname === "/" || router.pathname === "/auth/signInPage") {
    return <main className="h-screen bg-blue-gray-100">{children}</main>;
  }

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar openNav={openNav} setOpenNav={setOpenNav} />
        <div className="flex flex-1 h-full overflow-hidden flex-row-reverse lg:flex-row">
          <Sidebar openNav={openNav} setOpenNav={setOpenNav} />
          <main className="h-full p-4 box-border w-full bg-blue-gray-100 overflow-y-scroll">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
