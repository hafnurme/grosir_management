import { Button } from "@material-tailwind/react";
import { signOut } from "next-auth/react";
import MyTab from "./Tab/MyTab";

const Sidebar = () => {
  const tab = [
    {
      label: "Dashboard",
      link: "/company/dashboard",
    },
    {
      label: "Branch",
      link: "/company/branch",
    },
    {
      label: "Order",
      link: "/company/order",
    },
    {
      label: "Inventory",
      link: "/company/inventory",
    },
  ];

  const handleLogOut = () => {
    signOut();
  };

  return (
    <>
      <aside className="h-full w-full bg-white shadow box-border p-5 ">
        <div className="box-border text-center">
          <h2 className="text-lg font-semibold mb-5 text-c">
            Company Management
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
        <Button color="red" onClick={handleLogOut}>
          LogOut
        </Button>
      </aside>
    </>
  );
};

export default Sidebar;
