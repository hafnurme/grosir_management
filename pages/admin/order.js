import { useState, useEffect } from "react";
import axios from "axios";
import OrderTable from "@/components/TableComponents/orderTable";
import PilihSupplierModal from "@/components/Modal/Produk/PilihSupplierModal";
import { Button, Input } from "@material-tailwind/react";
import SelectProductModal from "@/components/Modal/Warehouse/SelectProductModal";
import SelectWarehouseModal from "@/components/Modal/SelectWarehouseModal";

export default function Order() {
  const [order, setOrder] = useState();
  const [supplierModal, setSupplierModal] = useState(false);
  const [supplierSelected, setSupplierSelected] = useState();
  const [productSelected, setProductSelected] = useState();
  const [selectWarehouse, setSelectWarehouseModal] = useState(false);

  const handleOpenSupplierModal = () => {
    setSupplierModal(!supplierModal);
  };

  const handleOpenWarehouseModal = () => {
    setSelectWarehouseModal(!selectWarehouse);
  };

  const handleSubmitProductOrder = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let itemAddTemp = {};

    formData.forEach((value, key) => {
      itemAddTemp[key] = value;
    });

    itemAddTemp["supplier_id"] = supplierSelected["supplier_id"];
    itemAddTemp["product_code"] = supplierSelected["product_code"];

    axios
      .post(`/api/order`, {
        data: itemAddTemp,
      })
      .then((res) => {
        console.log(res.data);
        refreshData();
      });
  };

  useEffect(() => {
    const fetchProductReq = async () => {
      const producttemp = await axios
        .get("/api/request")
        .then((res) => res.data);

      setOrder(producttemp);
    };

    fetchProductReq();
  }, []);

  return (
    <>
      <div className="my-3">
        <form
          onSubmit={handleSubmitProductOrder}
          className="flex flex-col gap-4"
        >
          <Input
            label="supplier"
            onClick={handleOpenSupplierModal}
            defaultValue={
              supplierSelected ? supplierSelected["supplier_name"] : ""
            }
            name="supplier_id"
            readOnly
          />
          <Input
            label="product"
            onClick={handleOpenWarehouseModal}
            defaultValue={productSelected ? productSelected["name"] : ""}
            name="product_code"
            readOnly
          />
          <Input type={"date"} label="Purchase Date" name="purchase_date" />
          <Input label="Total Amount" type={"number"} name="total_amount" />
          <Input label="Quantity" type={"number"} name="quantity" />
          <Button type="submit">Submit</Button>
        </form>
        <PilihSupplierModal
          handleOpenMod={handleOpenSupplierModal}
          modalOpen={supplierModal}
          setSupplier={setSupplierSelected}
        />
        <SelectWarehouseModal
          handleOpenMod={handleOpenWarehouseModal}
          open={selectWarehouse}
          setSelectedProduct={setSelectWarehouseModal}
        />
      </div>
    </>
  );
}
