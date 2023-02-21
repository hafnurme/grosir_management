import WarehouseAddModal from "@/components/Modal/Warehouse/WarehouseAddModal";
import Paginate from "@/components/paginate";
import WarehouseTable from "@/components/TableComponents/WarehouseTable";
import { Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function index() {
  const [warehouse, setWarehouse] = useState();
  const [permission, setPermission] = useState();

  const { data: session, status } = useSession();

  const fetchWarehouse = async () => {
    const dataTemp = await axios.get("/api/warehouse").then((res) => {
      return res.data;
    });

    setWarehouse(dataTemp);
  };

  useEffect(() => {
    fetchWarehouse();
  }, []);

  useEffect(() => {
    if (session) {
      return setPermission(session.permission);
    }
  }, [status]);

  return (
    <div>
      {warehouse && (
        <div>
          <div className="flex justify-between items-center py-4 px-2">
            <div className="hidden sm:block">
              <Typography variant="h4">Warehouse</Typography>
            </div>
            <div className="flex gap-2 w-full sm:justify-end">
              <div className="flex items-center w-full sm:w-52">
                <Input label="Search" color="orange" />
              </div>
              {permission && permission.includes("tambah-gudang") && (
                <WarehouseAddModal refreshData={fetchWarehouse} />
              )}
            </div>
          </div>
          <div className="overflow-x-scroll lg:overflow-auto mx-2 sm:m-0">
            <WarehouseTable
              head={["product_code", "stock", "location", "entry_date"]}
              title="Warehouse List"
              search={true}
              data={warehouse.data}
              refreshData={fetchWarehouse}
            />
          </div>
          <div className="px-2 flex justify-center sm:justify-end">
            <Paginate
              page={warehouse}
              refreshData={fetchWarehouse}
              setData={setWarehouse}
            />
          </div>
        </div>
      )}
    </div>
  );
}
