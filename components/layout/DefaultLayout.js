import Sidebar from "../Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-56 h-screen shadow z-50">
        <Sidebar />
      </div>
      <main className="bg-blue-gray-50 flex-1 p-10 py-8">{children}</main>
    </div>
  );
};

export default Layout;
