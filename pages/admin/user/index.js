import UserTable from "@/components/TableComponents/UserTable";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { IconButton, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";

const index = () => {
  const [user, setUser] = useState();
  const fetchUser = async () => {
    const dataTemp = await axios.get("/api/user/all").then((res) => res.data);
    setUser(dataTemp);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center px-2 py-4  overflow-hidden">
        <div className="hidden sm:block">
          <div className="text-2xl font-semibold">
            <h3>User</h3>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:justify-end">
          <div className="flex items-center gap-2 w-full sm:w-52">
            <Input label="Search" color="orange" variant="outlined" />
          </div>
          <IconButton className="w-20" color="orange">
            <MagnifyingGlassIcon className="h-6" />
          </IconButton>
        </div>
      </div>
      <UserTable
        data={user}
        head={["username", "name"]}
        refreshData={fetchUser}
      />
    </>
  );
};

export default index;
