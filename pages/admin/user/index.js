import AddUserModel from "@/components/Modal/User/AddUserModal";
import UserTable from "@/components/TableComponents/UserTable";
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
      <div className="flex justify-between items-center pb-4  overflow-hidden">
        <div className="hidden sm:block">
          <div className="text-2xl font-semibold">
            <h3>User</h3>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:justify-end">
          <AddUserModel
            refreshData={fetchUser}
            itemHead={[
              "user",
              "name",
              "username",
              "password",
              "contact",
              "email",
            ]}
            fieldType={["text", "text", "text", "text", "text", "email"]}
            min={[3, 3, 6, 10, 10]}
          />
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
