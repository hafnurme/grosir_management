import { Card, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function WarehouseTable({ head, data, refreshData }) {
  const [finalData, setFinalData] = useState();
  const router = useRouter();
  useEffect(() => {
    setFinalData(data);
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-2 sm:gap-4">
        {finalData &&
          finalData.map((object, index) => {
            return (
              <Card
                key={index}
                className="p-4 flex justify-between cursor-pointer"
                onClick={() => {
                  router.push(
                    {
                      pathname: `/admin/warehouse/detail`,
                      query: {
                        id: object["warehouse_id"],
                      },
                    },
                    "/warehouse/detail"
                  );
                }}
              >
                <div>
                  <Typography variant="h5" className="mb-1">
                    {object["name"]}
                  </Typography>
                  <Typography className="text-sm font-semibold mb-2">
                    {object["adress"]}
                  </Typography>
                  <Typography className="text-sm mb-1">
                    Contact : {object["contact"]}
                  </Typography>
                </div>
                <div className="flex gap-2 mt-2">
                  {/* <DetailModal
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
                  /> */}
                </div>
              </Card>
            );
          })}
      </div>
    </>
  );
}
