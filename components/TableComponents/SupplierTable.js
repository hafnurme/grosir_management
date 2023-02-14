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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };
  useEffect(() => {
    setFinalData(data);
  }, [data]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
