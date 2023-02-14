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
      <div className="grid lg:grid-cols-3 gap-2">
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
