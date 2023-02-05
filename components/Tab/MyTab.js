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
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  ArchiveBoxArrowDownIcon,
} from "@heroicons/react/20/solid";
import { Button } from "@material-tailwind/react";

const MyTab = (props) => {
  const [childVisible, setChildVisible] = useState(false);
  const { label, child, link } = props;
  const router = useRouter();

  const renderIcon = (label) => {
    if (label.match(/dashboard/i)) {
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
    if (label.match(/stock/i)) {
      return (
        <div className="w-5 mr-2">
          <ArchiveBoxArrowDownIcon />
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
    if (label.match(/branch/i)) {
      return (
        <div className="w-5 mr-2">
          <BuildingStorefrontIcon />
        </div>
      );
    }
    if (label.match(/order/i)) {
      return (
        <div className="w-5 mr-2">
          <ShoppingBagIcon />
        </div>
      );
    }
    if (label.match(/inventory/i)) {
      return (
        <div className="w-5 mr-2">
          <CubeIcon />
        </div>
      );
    }
  };

  useEffect(() => {
    if (router.pathname.split("/").includes("produk")) {
      return setChildVisible(true);
    }

    setChildVisible(false);
  }, [router.pathname]);

  return (
    <>
      <div className={` w-full cursor-pointer rounded-lg`}>
        <Link href={link}>
          {router.pathname.includes(link) ? (
            <Button
              variant="gradient"
              color="orange"
              className="flex items-center w-full"
            >
              {renderIcon(label)} {label}
            </Button>
          ) : (
            <Button
              color="gray"
              variant="text"
              className="flex items-center w-full text-c"
            >
              {renderIcon(label)} {label}
            </Button>
          )}
        </Link>
      </div>
      <div className={`ml-1 my-5`}>
        {child &&
          child.map((child) => {
            return (
              <Link
                href={link + child.link}
                key={child.label}
                className={
                  childVisible
                    ? "ml-2 mb-2 p-2 text-sm flex items-center transition-all"
                    : "fixed -z-50 transition-all"
                }
              >
                {router.pathname == link + child.link ? (
                  <Button
                    variant="gradient"
                    color="orange"
                    className="flex items-center p-2"
                  >
                    {renderIcon(child.label)}
                    {child.label}
                  </Button>
                ) : (
                  <Button
                    color="gray"
                    variant="text"
                    className="p-2 text-c flex items-center"
                  >
                    {renderIcon(child.label)}
                    {child.label}
                  </Button>
                )}
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default MyTab;
