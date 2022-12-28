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

  return (
    <>
      <aside className="h-full w-full bg-white shadow box-border p-5 ">
        <div className="box-border text-center">
          <h2 className="text-lg font-semibold mb-5 text-c">
            Inventory Gudang
          </h2>
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
      </aside>
    </>
  );
};

export default Sidebar;
