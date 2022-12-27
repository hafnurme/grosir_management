import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MyTab = (props) => {
  const [childVisible, setChildVisible] = useState(false);
  const { label, child, link } = props;
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.split("/").includes("produk")) {
      return setChildVisible(true);
    }

    setChildVisible(false);

    console.log(childVisible);
  }, [router.pathname]);

  return (
    <>
      <div
        className={`mb-5 w-full cursor-pointer rounded-lg ${
          router.pathname.split("/").includes(link.split("/")[1])
            ? "bg-deep-orange-400 text-white shadow-lg"
            : ""
        }`}
      >
        <Link href={link} className="p-2 px-4 block">
          {label}
        </Link>
      </div>
      <div className="ml-5">
        {child &&
          child.map((child) => {
            return (
              <Link
                href={link + child.link}
                key={child.label}
                className={`${childVisible ? "ml-2 block mb-5" : "hidden"} ${
                  router.pathname == link + child.link
                    ? "shadow py-1 px-2 rounded-md"
                    : ""
                }`}
              >
                {child.label}
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default MyTab;
