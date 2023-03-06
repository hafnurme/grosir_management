import Paginate from "@/components/paginate";
import InventoryTable from "@/components/TableComponents/InventoryTable";
import { Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function index() {
  const [warehouse, setWarehouse] = useState();
  const [permission, setPermission] = useState();
  const [disabled, setDisabled] = useState(true)

  const { data: session, status } = useSession();

  const fetchWarehouse = async () => {
    const dataTemp = await axios.get("/api/warehouse").then((res) => {
      return res.data;
    });

    setWarehouse(dataTemp);
  };

  const checkExpired = async () => {
    await axios.get('/api/warehouse/batch')
    setDisabled(!disabled)
  }

  const updateStock = async () => {
    await axios.put('/api/warehouse/stock')
    setDisabled(!disabled)
    fetchWarehouse()
  }

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
              <Typography variant="h4">Inventory</Typography>
            </div>
            <div className="flex gap-2 w-full items-center sm:justify-end">
              <Button color="orange" className="text-sm capitalize" size="sm" onClick={updateStock} disabled={disabled}>
                update stock
              </Button>
              <Button color="orange" className="text-sm capitalize" size="sm" onClick={checkExpired}>
                Check
              </Button>
              <div className="flex items-center w-full sm:w-52">
                <Input label="Search" color="orange" />
              </div>
            </div>
          </div>
          <div className="overflow-x-scroll lg:overflow-auto mx-2 sm:m-0">
            <InventoryTable
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
