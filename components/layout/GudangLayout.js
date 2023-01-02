import SidebarGudang from "../SidebarGudang";

const Layout = ({ children }) => {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="w-60 h-screen shadow z-50 relative">
        <SidebarGudang />
      </div>
      <main className="bg-blue-gray-50 flex-1 p-5 overflow-y-scroll">
        {children}
      </main>
    </div>
  );
};

export default Layout;
