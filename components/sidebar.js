import { UserCircleIcon } from "@heroicons/react/20/solid";
import { Button, IconButton } from "@material-tailwind/react";
import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function sidebar({ openNav, setOpenNav }) {
  const [permission, setPermission] = useState();
  const [actualTab, setActualTab] = useState();
  const [size, setSize] = useState();

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
  }, [status]);

  const Tab = [
    {
      label: "Produk",
      link: "/admin/produk",
      permission: ["admin", "lihat-gudang"],
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
      label: "Product Order (PO)",
      link: "/admin/order",
      permission: ["admin"],
    },
    {
      label: "Supplier",
      link: "/admin/supplier",
      permission: ["admin"],
    },
    {
      label: "Inventory",
      link: "/admin/Inventory",
      permission: ["lihat-gudang"],
    },
    {
      label: "Batch",
      link: "/admin/batch",
      permission: ["lihat-gudang"],
    },
    {
      label: "Warehouse",
      link: "/admin/warehouse",
      permission: ["admin"],
    },
    {
      label: "Warehouse Request",
      link: "/admin/warehouse_request",
      permission: ["admin", "lihat-request-pesanan"],
    },
    {
      label: "Get Response",
      link: "/admin/warehouse_request/response",
      permission: ["lihat-respon-order"],
    },
    {
      label: "Branch Request",
      link: "/admin/branch_request",
      permission: ["lihat-request-produk"],
    },
    {
      label: "Role",
      link: "/admin/role",
      permission: ["admin"],
    },
    {
      label: "User",
      link: "/admin/user",
      permission: ["admin"],
    },
    {
      label: "Trash",
      link: "/admin/trash",
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
    if (window.innerWidth >= 960) {
      setSize("md");
      setOpenNav(true);
    } else {
      setSize("sm");
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) {
        setSize("md");
        setOpenNav(true);
      } else {
        setSize("sm");
      }
    });
  }, [status]);

  useEffect(() => {
    authorizePermissionTab();
  }, [permission]);

  return (
    <>
      {openNav && (
        <aside className="absolute lg:sticky z-30 w-56 bg-blue-gray-50 shadow box-border p-4 lg:flex lg:flex-col lg:justify-between">
          <div className="w-full">
            {actualTab &&
              actualTab.map((tab, index) => {
                return (
                  <Link href={tab.link} key={index}>
                    <Button
                      size={size}
                      variant={
                        tab.link === router.pathname ? "gradient" : "text"
                      }
                      color={
                        tab.link === router.pathname ? "orange" : "blue-gray"
                      }
                      className="w-full mb-2 text-start"
                    >
                      {tab.label}
                    </Button>
                  </Link>
                );
              })}
          </div>
          <div className="flex justify-between items-center px-1">
            <Button
              size={size}
              color="red"
              variant="gradient"
              onClick={handleLogOut}
            >
              LogOut
            </Button>
            <Link href="/admin/profile">
              <IconButton size={size} color="blue-gray" className=" p-1">
                <UserCircleIcon className="h-6" />
              </IconButton>
            </Link>
          </div>
        </aside>
      )}
    </>
  );
}
