import AddModal from "@/components/Modal/AddModal";
import WarehouseAddModal from "@/components/Modal/Warehouse/WarehouseAddModal";
import Paginate from "@/components/paginate";
import WarehouseTable from "@/components/TableComponents/WarehouseTable";
import { Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function index() {
  const [warehouse, setWarehouse] = useState();

  const fetchWarehouse = async () => {
    const dataTemp = await axios.get("/api/warehouse").then((res) => {
      return res.data;
    });

    setWarehouse(dataTemp);
  };

  useEffect(() => {
    fetchWarehouse();
  }, []);

  return (
    <div>
      {warehouse && (
        <div>
          <div className="flex justify-between items-center py-4 px-2">
            <div className="mx-2">
              <Typography variant="h4">Warehouse</Typography>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center">
                <Input label="Search" color="deep-orange" />
              </div>
              <WarehouseAddModal />
            </div>
          </div>
          <div>
            <WarehouseTable
              head={[
                "warehouse_id",
                "product_code",
                "stock",
                "location",
                "entry_date",
              ]}
              title="Warehouse List"
              search={true}
              data={warehouse.data}
              refreshData={fetchWarehouse}
            />
          </div>
          <div className="px-2 py-4 flex justify-end">
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
