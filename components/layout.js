import { useRouter } from "next/router";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

export default function layout({ children }) {
  const router = useRouter();

  if (router.pathname === "/" || router.pathname === "/auth/signInPage") {
    return <main className="h-screen bg-blue-gray-100">{children}</main>;
  }

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 h-full overflow-hidden">
          <Sidebar />
          <main className="h-full p-4 box-border w-full bg-blue-gray-100 overflow-y-scroll">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
