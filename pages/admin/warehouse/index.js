import WarehouseTable from "@/components/TableComponents/WarehouseTable";
import axios from "axios";
import { useEffect, useState } from "react";

export default function index() {
  const [warehouse, setWarehouse] = useState();

  const fetchProduct = async () => {
    const dataTemp = await axios.get("/api/warehouse").then((res) => {
      return res.data;
    });

    setWarehouse(dataTemp);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      {warehouse && (
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
          refreshData={fetchProduct}
        />
      )}
    </div>
  );
}
