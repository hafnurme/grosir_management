import axios from "axios";
import { useEffect, useState } from "react";
import SupplierTable from "@/components/TableComponents/SupplierTable";

export default function supplier() {
  const [supplier, setSupplier] = useState();

  const fetchSupplier = async () => {
    const supplier = await axios.get("/api/supplier");
    const res = supplier.data;

    setSupplier(res);
  };
  useEffect(() => {
    fetchSupplier();
  }, []);

  return (
    <>
      <div>
        <SupplierTable
          head={["supplier_name", "contact", "address"]}
          title="Supplier List"
          search
          data={supplier}
          refreshData={fetchSupplier}
        />
      </div>
    </>
  );
}
