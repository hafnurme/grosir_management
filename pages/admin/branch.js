import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Card, Input } from "@material-tailwind/react";
import axios from "axios";
import BranchTable from "../../components/TableComponents/BranchTable";
import { getSession } from "next-auth/react";

export default function Branch() {
  const [branch, setBranch] = useState();

  const fetchBranch = async () => {
    const branches = await axios.get("/api/branch");
    const res = branches.data;

    setBranch(res);
  };
  useEffect(() => {
    fetchBranch();
  }, []);
  return (
    <>
      <div>
        {branch && (
          <BranchTable
            head={["branch_name", "leader_name", "contact", "address"]}
            title="Branches"
            data={branch.data}
            refreshData={fetchBranch}
            search={true}
          />
        )}
      </div>
    </>
  );
}
