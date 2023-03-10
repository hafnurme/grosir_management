import GetOrderModalW from "@/components/Modal/Order/GetOrderModalW";
import WarehouseRequestAddModal from "@/components/Modal/WarehouseRequest/WarehouseRequestAddModal";
import Paginate from "@/components/paginate";
import WarehouseRequestPanel from "@/components/TableComponents/WarehouseRequest/WarehouseRequestPanel";
import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function index() {
  const [warehouseRequest, setWarehouseRequest] = useState();
  const [permission, setPermission] = useState();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      setPermission(session.permission);
    }
  }, [status]);

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
          <div className="flex justify-between items-center pb-4 px-2">
            <div>
              <Typography variant="h4">Request Produk</Typography>
            </div>
            {permission && permission.includes("tambah-request-pesanan") && (
              <div className="flex gap-2">
                <WarehouseRequestAddModal refreshData={fetchWarehouseRequest} />
              </div>
            )}
          </div>
          <div className="px-2 sm:px-0">
            <WarehouseRequestPanel
              data={warehouseRequest.data}
              refreshData={fetchWarehouseRequest}
              permission={permission}
            />
          </div>
          <Paginate
            page={warehouseRequest}
            refreshData={fetchWarehouseRequest}
            setData={setWarehouseRequest}
          />
        </div>
      )}
    </>
  );
}
