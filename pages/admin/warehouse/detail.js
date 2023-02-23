import InventoryTable from "@/components/TableComponents/InventoryTable";
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const WarehouseDetail = () => {
  const [warehouseInventory, setWarehouseInventory] = useState();
  const [warehouseDetail, setWarehouseDetail] = useState();

  const router = useRouter();
  const { id: warehouse_id } = router.query;

  const fetchWarehouseInventory = async () => {
    await axios.get(`/api/warehouse/detail/${warehouse_id}`).then((res) => {
      setWarehouseInventory(res.data.data);
      setWarehouseDetail(res.data.detail);
    });
  };

  useEffect(() => {
    fetchWarehouseInventory();
  }, []);

  return (
    <>
      <div>
        <Card className="p-4 bg-white my-4 rounded-none">
          {warehouseDetail && (
            <div>
              <p className="mb-2">
                <span className="w-40 inline-block">Warehouse Name</span> :
                {"  "}
                {warehouseDetail["name"]}
              </p>
              <p className="mb-2">
                <span className="w-40 inline-block">Manager Name</span> :{"  "}
                {warehouseDetail["manager_name"]}
              </p>
              <p className="mb-2">
                <span className="w-40 inline-block">Contact</span> :{"  "}
                {warehouseDetail["contact"]}
              </p>
              <p>
                <span className="w-40 inline-block">Address</span> :{"  "}
                {warehouseDetail["adress"]}
              </p>
            </div>
          )}
        </Card>
        <div className="m-4">
          <Typography>Inventory</Typography>
        </div>
        <InventoryTable
          data={warehouseInventory}
          refreshData={fetchWarehouseInventory}
          head={["product_code", "stock", "location", "entry_date"]}
        />
      </div>
    </>
  );
};

export default WarehouseDetail;
