import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import DeleteDialog from "../Modal/DeleteModal";
import DetailModal from "../Modal/DetailModal";
import UpdateModal from "../Modal/UpdateModal";

export default function SupplierTable({ head, data, refreshData }) {
  const [finalData, setFinalData] = useState();

  useEffect(() => {
    setFinalData(data);
  }, [data]);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 sm:gap-4">
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
                <DetailModal
                  exception={["supplier_id"]}
                  item={object}
                  size="xl"
                />
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
  );
}
