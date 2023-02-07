import { Button } from "@material-tailwind/react";
import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function sidebar() {
  const [permission, setPermission] = useState();
  const [actualTab, setActualTab] = useState();

  const router = useRouter();
  const { data: session, status } = useSession();

  console.log(session);
  const Tab = [
    {
      label: "Produk",
      link: "/admin/produk",
      permission: ["admin"],
    },
    {
      label: "Tambah Produk",
      link: "/admin/produk/tambah",
      permission: ["admin"],
    },
    {
      label: "Kategori",
      link: "/admin/kategori",
      permission: ["admin"],
    },
    {
      label: "Branch",
      link: "/admin/branch",
      permission: ["admin"],
    },
    {
      label: "Order",
      link: "/admin/order",
      permission: ["admin"],
    },
    {
      label: "Supplier",
      link: "/admin/supplier",
      permission: ["admin"],
    },
    {
      label: "Warehouse",
      link: "/admin/warehouse",
      permission: ["admin", "lihat-gudang"],
    },
    {
      label: "Warehouse Request",
      link: "/admin/warehouse_request",
      permission: ["admin", "lihat-gudang"],
    },

    {
      label: "Role",
      link: "/admin/role",
      permission: ["admin"],
    },
  ];

  const authorizePermissionTab = () => {
    if (permission) {
      let authorizedTab = [];

      Tab.filter((element) => {
        permission.map((permissionElement, index) => {
          if (element.permission.includes(permissionElement)) {
            authorizedTab.push(element);
          }
        });
      });

      setActualTab(authorizedTab);
    }
  };

  const handleLogOut = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    if (session) {
      setPermission(session.permission);
    }
  }, [status]);

  useEffect(() => {
    authorizePermissionTab();
  }, [permission]);

  return (
    <aside className="sticky w-56 bg-blue-gray-50 shadow box-border py-9 px-4 flex flex-col justify-between">
      <div className="w-full">
        {actualTab &&
          actualTab.map((tab, index) => {
            return (
              <Link href={tab.link} key={index}>
                <Button
                  variant={tab.link === router.pathname ? "gradient" : "text"}
                  color={tab.link === router.pathname ? "orange" : "blue-gray"}
                  className="w-full mb-2 text-start"
                >
                  {tab.label}
                </Button>
              </Link>
            );
          })}
      </div>
      <Button color="orange" variant="gradient" onClick={handleLogOut}>
        LogOut
      </Button>
    </aside>
  );
}
