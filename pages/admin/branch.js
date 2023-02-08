import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Card, IconButton, Input } from "@material-tailwind/react";
import axios from "axios";
import BranchTable from "../../components/TableComponents/BranchTable";
import { getSession } from "next-auth/react";
import AddModal from "@/components/Modal/AddModal";

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

  const Links = () => {
    return (
      <>
        <IconButton
          disabled={branch.prev_page_url === null ? true : false}
          onClick={() => {
            paginateNavigate(branch.prev_page_url);
          }}
        >
          Prev
        </IconButton>
        {branch.current_page != 1 && branch.current_page - 1 != 1 && (
          <IconButton
            onClick={() => {
              paginateNavigate(branch.first_page_url);
            }}
          >
            1...
          </IconButton>
        )}
        {branch.current_page != 1 && (
          <IconButton
            onClick={() => {
              paginateNavigate(
                branch.path + `?page=${branch.current_page - 1}`
              );
            }}
          >
            {branch.current_page - 1}
          </IconButton>
        )}
        <IconButton
          onClick={() => {
            paginateNavigate(branch.path + `?page=${branch.current_page}`);
          }}
          variant="outlined"
        >
          {branch.current_page}
        </IconButton>
        {branch.current_page != branch.last_page && (
          <>
            <IconButton
              onClick={() => {
                paginateNavigate(
                  branch.path + `?page=${branch.current_page + 1}`
                );
              }}
            >
              {branch.current_page + 1}
            </IconButton>
          </>
        )}
        {branch.current_page != branch.last_page &&
          branch.current_page + 1 != branch.last_page && (
            <IconButton
              onClick={() => {
                paginateNavigate(branch.last_page_url);
              }}
            >
              ...{branch.last_page}
            </IconButton>
          )}
        <IconButton
          disabled={branch.next_page_url === null ? true : false}
          onClick={() => {
            paginateNavigate(branch.next_page_url);
          }}
        >
          next
        </IconButton>
      </>
    );
  };

  useEffect(() => {
    fetchBranch();
  }, []);
  return (
    <>
      <div>
        {branch && (
          <>
            <div className="flex justify-between mb-4">
              <AddModal
                refreshData={fetchBranch}
                addUrl="/api/branch"
                itemHead={["branch_name", "leader_name", "contact", "address"]}
                fieldType={["text", "text", "number", "text"]}
                label="Tambah Branch"
              />
              <div className="flex gap-1">
                <Links />
              </div>
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
