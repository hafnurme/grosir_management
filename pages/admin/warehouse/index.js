import axios from "axios";
import { useEffect, useState } from "react";
import AddModal from "@/components/Modal/AddModal";
import { IconButton, Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Paginate from "@/components/paginate";
import WarehouseTable from "@/components/TableComponents/WarehouseTable";

export default function warehouse() {
  const [warehouse, setWarehouse] = useState();
  const [searchQuery, setSearchQuery] = useState();

  const fetchWarehouse = async () => {
    const warehouse = await axios.get("/api/warehouse/detail");
    const res = warehouse.data;
    setWarehouse(res);
  };

  useEffect(() => {
    fetchWarehouse();
  }, []);

  return (
    <>
      {warehouse && (
        <div className="relative">
          <div className="flex justify-between items-center pb-4 px-2">
            <div className="hidden sm:block">
              <Typography variant="h4">Warehouse</Typography>
            </div>
            <div className="flex gap-2">
              <AddModal
                addUrl="/api/supplier"
                itemHead={["supplier_name", "contact", "address"]}
                fieldType={["text", "number", "text"]}
                label="Tambah Supplier"
                refreshData={fetchWarehouse}
                col="1"
              />
            </div>
          </div>
          <div>
            <div className="px-2 sm:px-0">
              <WarehouseTable
                data={warehouse.data}
                refreshData={fetchWarehouse}
              />
            </div>
            <Paginate
              page={warehouse}
              refreshData={fetchWarehouse}
              setData={setWarehouse}
            />
          </div>
        </div>
      )}
    </>
  );
}
