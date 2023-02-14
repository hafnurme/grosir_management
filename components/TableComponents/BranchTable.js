import {
  Button,
  Card,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import AddModal from "@/components/Modal/AddModal";
import DeleteDialog from "../Modal/DeleteModal";
import DetailModal from "../Modal/DetailModal";
import UpdateModal from "../Modal/UpdateModal";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function BranchTable({
  head,
  title,
  search,
  data,
  refreshData,
  handleSearch,
}) {
  const [finalData, setFinalData] = useState();
  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    setFinalData(data);
  }, [data]);

  const inputListener = (input) => {
    const filteredData = data.filter((e) => {
      const key = new RegExp(input.target.value, "i");
      if (e.branch_name.match(key) || e.leader_name.match(key)) {
        return e;
      }
    });
    setFinalData(filteredData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <>
<<<<<<< HEAD
      <div className="flex justify-between items-center mb-4 p-1">
        {title && (
          <div className="text-c">
            <div className="mx-2 text-base lg:text-2xl font-semibold">
              <h3>{title}</h3>
            </div>
          </div>
        )}
        <div className="flex gap-4">
          {search && (
            <div className="flex">
              <Input
                label="Search"
                color="orange"
                variant="outlined"
                onChange={inputListener}
              />
            </div>
          )}
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
=======
      <div className="grid grid-cols-3 gap-2">
>>>>>>> f36357c4e3b87905d65644ad86bfe6d1ed4a5a0d
        {finalData &&
          finalData.map((object, index) => {
            return (
              <Card key={index} className="p-4 flex justify-between">
                <div>
                  <Typography variant="h5" className="mb-1">
                    {object["branch_name"]}
                  </Typography>
                  <Typography className="text-sm font-semibold mb-2">
                    {object["address"]}
                  </Typography>
                  <Typography className="text-sm mb-1">
                    Manager : {object["leader_name"]}
                  </Typography>
                  <Typography className="text-sm mb-1">
                    Contact : {object["contact"]}
                  </Typography>
                </div>

                <div className="flex gap-2 mt-2">
                  <DetailModal item={object} size="xl" />
                  <UpdateModal
                    item={object}
                    itemHead={[
                      "branch_name",
                      "leader_name",
                      "contact",
                      "address",
                    ]}
                    updateUrl="/api/branch/"
                    refreshData={refreshData}
                    itemIndex="branch_id"
                  />
                  <DeleteDialog
                    itemToDelete={object}
                    itemHead={head}
                    refreshData={refreshData}
                    itemIndex="branch_id"
                    deleteUrl="/api/branch/"
                  />
                </div>
              </Card>
            );
          })}
      </div>
    </>
  );
}
