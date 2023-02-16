import AddModal from "@/components/Modal/AddModal";
import WarehouseRequestAddModal from "@/components/Modal/WarehouseRequest/WarehouseRequestAddModal";
import WarehouseRequestStatus from "@/components/TableComponents/WarehouseRequestStatus";
import WarehouseRequestTable from "@/components/TableComponents/WarehouseRequestTable";
import { Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function index() {
  const [warehouseRequest, setWarehouseRequest] = useState();

  const fetchWarehouseRequest = async () => {
    const dataTemp = await axios.get("/api/warehouse/request").then((res) => {
      return res.data;
    });

    setWarehouseRequest(dataTemp);
  };

  useEffect(() => {
    fetchWarehouseRequest();
  }, []);

  return (
    <>
      {warehouseRequest && (
        <div>
          <div className="flex justify-between items-center py-4 px-2">
            <div className="mx-2">
              <Typography variant="h4">Request Produk</Typography>
            </div>
            <div className="flex gap-2">
              <WarehouseRequestAddModal refreshData={fetchWarehouseRequest} />
            </div>
          </div>
          <div>
            <WarehouseRequestStatus
              data={warehouseRequest.data}
              refreshData={fetchWarehouseRequest}
            />
          </div>
        </div>
      )}
    </>
  );
}
