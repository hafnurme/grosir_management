import SidebarGudang from "../SidebarGudang";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-56 h-screen shadow z-50">
        <SidebarGudang />
      </div>
      <main className="bg-blue-gray-50 flex-1 p-5">{children}</main>
    </div>
  );
};

export default Layout;
