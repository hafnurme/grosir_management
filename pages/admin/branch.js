import { useEffect, useState } from "react";
import { ArrowPathIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Card, IconButton, Input } from "@material-tailwind/react";
import axios from "axios";
import BranchTable from "../../components/TableComponents/BranchTable";
import { getSession } from "next-auth/react";
import AddModal from "@/components/Modal/AddModal";
import Paginate from "@/components/paginate";

export default function Branch() {
  const [branch, setBranch] = useState();

  const fetchBranch = async () => {
    const branches = await axios.get("/api/branch");
    const res = branches.data;

    setBranch(res);
  };

  const paginateNavigate = async (link) => {
    const accessToken = await getSession().then((token) => token.accessToken);

    const dataTemp = await axios
      .get(link, {
        headers: {
          token: accessToken,
        },
      })
      .then((res) => {
        return res.data;
      });

    return setBranch(dataTemp);
  };

  useEffect(() => {
    fetchBranch();
  }, []);
  return (
    <>
      <div>
        {branch && (
          <>
            <div className="flex justify-between mb-4 z-10">
              <AddModal
                refreshData={fetchBranch}
                addUrl="/api/branch"
                itemHead={["branch_name", "leader_name", "contact", "address"]}
                fieldType={["text", "text", "number", "text"]}
                col={"1"}
                size={"md"}
                label="Tambah Branch"
              />
              <Paginate
                page={branch}
                paginateNavigate={paginateNavigate}
                refreshData={fetchBranch}
              />
            </div>
            <BranchTable
              head={["branch_name", "leader_name", "contact", "address"]}
              title="Branches"
              data={branch.data}
              refreshData={fetchBranch}
              search={true}
            />
          </>
        )}
      </div>
    </>
  );
}
