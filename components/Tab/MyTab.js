import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  BeakerIcon,
  ComputerDesktopIcon,
  CubeIcon,
  PlusCircleIcon,
  PlusIcon,
  QueueListIcon,
  TagIcon,
  TruckIcon,
} from "@heroicons/react/20/solid";
import { useDefaultTransition } from "../../hooks/useStyle";

const MyTab = (props) => {
  const [childVisible, setChildVisible] = useState(false);
  const { label, child, link } = props;
  const router = useRouter();

  const renderIcon = (label) => {
    if (label.match(/overview/i)) {
      return (
        <div className="w-5 mr-2">
          <ComputerDesktopIcon />
        </div>
      );
    }
    if (label.match(/product/i)) {
      return (
        <div className="w-5 mr-2">
          <CubeIcon />
        </div>
      );
    }
    if (label.match(/pengiriman/i)) {
      return (
        <div className="w-5 mr-2">
          <TruckIcon />
        </div>
      );
    }
    if (label.match(/produk list/i)) {
      return (
        <div className="w-5 mr-2">
          <QueueListIcon />
        </div>
      );
    }
    if (label.match(/tambah produk/i)) {
      return (
        <div className="w-5 mr-2">
          <PlusIcon />
        </div>
      );
    }
    if (label.match(/kategori/i)) {
      return (
        <div className="w-5 mr-2">
          <TagIcon />
        </div>
      );
    }
  };

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
            : "text-gray-800"
        } ${useDefaultTransition}`}
      >
        <Link href={link} className={`p-2 px-4 flex items-center`}>
          {renderIcon(label)} {label}
        </Link>
      </div>
      <div className={`ml-5 mb-5 ${useDefaultTransition}`}>
        {child &&
          child.map((child) => {
            return (
              <Link
                href={link + child.link}
                key={child.label}
                className={`${
                  childVisible
                    ? "ml-1 mb-2 p-2 text-sm flex items-center translate-y-0" +
                      useDefaultTransition
                    : "-translate-y-5 delay-500 hidden"
                } ${
                  router.pathname == link + child.link
                    ? "shadow-lg bg-deep-orange-400 text-white text-sm p-2 rounded-lg"
                    : "text-gray-800"
                }`}
              >
                {renderIcon(child.label)}
                {child.label}
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default MyTab;
