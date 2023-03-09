import { useState, useEffect, Fragment, useRef } from "react";
import axios from "axios";
import PilihSupplierModal from "@/components/Modal/Produk/PilihSupplierModal";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

import SelectWarehouseModal from "@/components/Modal/SelectWarehouseModal";
import { useRouter } from "next/router";
import SelectProductModal from "../Inventory/SelectProductModal";

export default function MakeNewOrder({ refreshData }) {
  const [order, setOrder] = useState();
  const [supplierModal, setSupplierModal] = useState(false);
  const [supplierSelected, setSupplierSelected] = useState();
  const [productSelected, setProductSelected] = useState();
  const [selectWarehouse, setSelectWarehouseModal] = useState(false);

  const [open, setOpen] = useState(false);

  const refForm = useRef(null);

  const handleOpen = () => setOpen(!open);

  const handleClose = () => {
    handleOpen();
    setSupplierSelected(null);
    setProductSelected(null);
    refreshData();
  };

  const handleConfirm = async () => {
    const form = refForm.current;
    await axios
      .post("/api/order", {
        data: {
          supplier_id: supplierSelected["supplier_id"],
          product_code: productSelected["product_code"],
          purchase_date: form["purchase_date"].value,
          quantity: form["quantity"].value,
          total_amount: form["total_amount"].value,
          expire_date: form["expire_date"].value,
        },
      })
      .then(() => {
        handleClose();
      });
  };

  const router = useRouter();

  const handleOpenSupplierModal = () => {
    setSupplierModal(!supplierModal);
  };

  const handleOpenWarehouseModal = () => {
    setSelectWarehouseModal(!selectWarehouse);
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
    <Fragment>
      <Button onClick={handleOpen} color="orange" variant="gradient">
        order
      </Button>
      {open && (
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Make New Order.</DialogHeader>
          <DialogBody divider>
            <div className="my-3">
              <form className="flex flex-col gap-4" ref={refForm}>
                <Input
                  label="supplier"
                  onClick={handleOpenSupplierModal}
                  defaultValue={
                    supplierSelected ? supplierSelected["supplier_name"] : ""
                  }
                  name="supplier_id"
                  key={
                    supplierSelected
                      ? supplierSelected.supplier_name
                      : "supplier"
                  }
                  readOnly
                />
                <Input
                  label="product"
                  onClick={handleOpenWarehouseModal}
                  defaultValue={productSelected ? productSelected["name"] : ""}
                  name="product_code"
                  key={productSelected ? productSelected.name : "product"}
                  readOnly
                />
                <Input
                  type={"date"}
                  label="Purchase Date"
                  name="purchase_date"
                />
                <Input
                  label="Total Amount"
                  type={"number"}
                  name="total_amount"
                />
                <Input label="Quantity" type={"number"} name="quantity" />
                <Input label="Expire Date" type={"date"} name="expire_date" />
              </form>
              <PilihSupplierModal
                handleOpenMod={handleOpenSupplierModal}
                modalOpen={supplierModal}
                setSupplier={setSupplierSelected}
              />
              <SelectProductModal
                handleOpenMod={handleOpenWarehouseModal}
                open={selectWarehouse}
                setSelectedProduct={setProductSelected}
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleClose}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleConfirm}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </Fragment>
  );
}
