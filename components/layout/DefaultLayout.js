import Sidebar from "../Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-52 h-screen shadow z-50">
        <Sidebar />
      </div>
      <main className="bg-blue-gray-50 flex-1">{children}</main>
    </div>
  );
};

export default Layout;
