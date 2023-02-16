import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { IconButton, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import BranchTable from "../../components/TableComponents/BranchTable";
import AddModal from "@/components/Modal/AddModal";
import Paginate from "@/components/paginate";

export default function Branch() {
  const [branch, setBranch] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [size, setSize] = useState();

  const fetchBranch = async () => {
    const branches = await axios.get("/api/branch");
    const res = branches.data;

    setBranch(res);
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  const handleSearch = async (e, search) => {
    e.preventDefault();
    if (search) {
      search = search.replace(/[!@#$%^&*\\]/g, "");
      search = search.trim();
    }
    if (search || search !== "") {
      const dataTemp = await axios
        .post(`/api/branch/name`, { data: { branch_name: search } })
        .then((res) => {
          return res.data;
        });

      return setBranch(dataTemp);
    } else {
      return fetchBranch();
    }
  };
  return (
    <>
      <div>
        {branch && (
          <>
            <div className="flex sm:justify-between items-center px-2 py-4">
              <div className="mx-2 hidden sm:block">
                <Typography variant="h4">Branch</Typography>
              </div>
              <div className="flex gap-2 flex-1 justify-end">
                <form
                  onSubmit={(e) => {
                    handleSearch(e, searchQuery);
                  }}
                  className="flex gap-2 w-full sm:w-52"
                >
                  <Input
                    label="Search"
                    color="orange"
                    variant="outlined"
                    className="w-full"
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                  />
                </form>
                <IconButton className="w-20" color="orange">
                  <MagnifyingGlassIcon className="h-6" />
                </IconButton>

                <AddModal
                  refreshData={fetchBranch}
                  addUrl="/api/branch"
                  itemHead={[
                    "branch_name",
                    "leader_name",
                    "contact",
                    "address",
                  ]}
                  fieldType={["text", "text", "number", "text"]}
                  col={"1"}
                  size={size}
                  label="Tambah Branch"
                />
              </div>
            </div>

            <div className="px-2 sm:px-0">
              <BranchTable
                head={["branch_name", "leader_name", "contact", "address"]}
                title="Branches"
                data={branch.data}
                refreshData={fetchBranch}
                handleSearch={handleSearch}
              />
            </div>
            <div className="px-2  flex justify-center sm:justify-end">
              <Paginate
                page={branch}
                setData={setBranch}
                refreshData={fetchBranch}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
