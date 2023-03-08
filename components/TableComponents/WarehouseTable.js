import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function WarehouseTable({ head, data, refreshData }) {
  const [finalData, setFinalData] = useState();
  const router = useRouter();
  useEffect(() => {
    setFinalData(data);
  }, [data]);

  const handleRoute = (object) => {
    router.push(
      {
        pathname: `/admin/warehouse/detail`,
        query: {
          id: object["warehouse_id"],
        },
      },
      "/warehouse/detail"
    );
  };

  return (
    <>
      <div className="grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-2 sm:gap-4">
        {finalData &&
          finalData.map((object, index) => {
            return (
              <Card
                key={index}
                className="p-4 rounded-md flex justify-between cursor-pointer"
                onClick={() => {
                  handleRoute(object);
                }}
              >
                <CardBody className="p-0">
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
                </CardBody>
              </Card>
            );
          })}
      </div>
    </>
  );
}
