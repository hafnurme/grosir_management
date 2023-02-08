import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import {
  Button,
  Card,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import AddModal from "../Modal/AddModal";
import DeleteDialog from "../Modal/DeleteModal";
import DetailModal from "../Modal/DetailModal";
import UpdateModal from "../Modal/UpdateModal";

export default function SupplierTable({
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

  return (
    <>
      <div className="flex justify-between items-center mb-4 p-1">
        {title && (
          <div>
            <div className="mx-2 text-2xl font-semibold">
              <h3>{title}</h3>
            </div>
          </div>
        )}
        <div className="flex gap-4">
          {search && (
            <div className="flex gap-2">
              <Input
                label="Search"
                color="orange"
                variant="outlined"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <IconButton
                className="w-20"
                color="orange"
                onClick={() => {
                  handleSearch(searchQuery);
                }}
              >
                <MagnifyingGlassIcon className="h-6" />
              </IconButton>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {finalData &&
          finalData.map((object, index) => {
            return (
              <Card key={index} className="p-4 flex justify-between">
                <div>
                  <Typography variant="h5" className="mb-1">
                    {object["supplier_name"]}
                  </Typography>
                  <Typography className="text-sm font-semibold mb-2">
                    {object["address"]}
                  </Typography>
                  <Typography className="text-sm mb-1">
                    Contact : {object["contact"]}
                  </Typography>
                </div>
                <div className="flex gap-2 mt-2">
                  <DetailModal item={object} size="xl" />
                  <UpdateModal
                    item={object}
                    itemHead={["supplier_name", "contact", "address"]}
                    updateUrl="/api/supplier/"
                    refreshData={refreshData}
                    itemIndex="supplier_id"
                    col={1}
                    size="md"
                  />
                  <DeleteDialog
                    itemToDelete={object}
                    itemHead={head}
                    refreshData={refreshData}
                    deleteUrl="/api/supplier/"
                    itemIndex="supplier_id"
                  />
                </div>
              </Card>
            );
          })}
      </div>
    </>
  );
}
