import { Button } from "@material-tailwind/react";
import { signOut } from "next-auth/react";
import MyTab from "./Tab/MyTab";

const Sidebar = () => {
  const tab = [
    {
      label: "Dashboard",
      link: "/gudang/dashboard",
    },
    {
      label: "Product",
      child: [
        {
          label: "Produk List",
          link: "",
        },
        {
          label: "Tambah Produk",
          link: "/tambah",
        },
        {
          label: "Kategori",
          link: "/kategori",
        },
      ],
      link: "/gudang/produk",
    },
    {
      label: "Pengiriman",
      link: "/gudang/pengiriman",
    },
  ];

  const handleLogOut = () => {
    signOut();
  };
  return (
    <>
      <aside className="h-full w-full bg-white shadow box-border p-5">
        <div className="box-border p-5 bg-black/5 rounded-lg mb-5 text-center">
          <h2 className="text-lg font-semibold  text-c">Inventory Gudang</h2>
        </div>
        {tab.map((elem) => {
          if (elem.child) {
            return (
              <MyTab
                label={elem.label}
                child={elem.child}
                link={elem.link}
                key={elem.label}
              />
            );
          }
          return <MyTab label={elem.label} link={elem.link} key={elem.label} />;
        })}
        <Button color="red" onClick={handleLogOut}>
          LogOut
        </Button>
      </aside>
    </>
  );
};

export default Sidebar;
