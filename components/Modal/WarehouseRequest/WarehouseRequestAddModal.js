import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { Fragment, useRef, useState } from "react";
import SelectProductModal from "../Inventory/SelectProductModal";
import SelectProductWarehouse from "./SelectProductWarehouse";

const WarehouseRequestAddModal = ({ size, refreshData }) => {
  const [open, setOpen] = useState(false);
  const [productSelected, setProductSelected] = useState();
  const [selectProductModalOpen, setSelectProductModalOpen] = useState(false);

  const refForm = useRef(null);

  const handleOpen = () => setOpen(!open);

  const submitAddProduct = () => {
    refForm.current.requestSubmit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(refForm.current);

    const dataTemp = {};

    formData.forEach((value, key) => {
      dataTemp[key] = value;
    });

    dataTemp["product_code"] = productSelected.product_code;

    await axios
      .post("/api/warehouse/request", { data: dataTemp })
      .then((res) => {
        handleOpen();
        refreshData();
      });
  };
  return (
    <Fragment>
      <div className="flex gap-3">
        <Button onClick={handleOpen} color="orange" variant="filled">
          Request
        </Button>
      </div>
      <Dialog
        open={open}
        size={size || "md"}
        handler={handleOpen}
        className="flex flex-col"
      >
        <DialogHeader>Add Produk</DialogHeader>
        <DialogBody className="flex-1 bg-blue-gray-50" divider>
          <form
            ref={refForm}
            className="grid grid-cols-1 gap-4"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Input
              label="Produk"
              color="orange"
              name="product_code"
              readOnly={true}
              onClick={() => {
                setSelectProductModalOpen(!selectProductModalOpen);
              }}
              defaultValue={productSelected ? productSelected.name : ""}
            />
            <Input
              label="Jumlah"
              color="orange"
              name="quantity"
              type={"number"}
            />
          </form>
          <div className="grid grid-cols-2 gap-4">
            <SelectProductModal
              open={selectProductModalOpen}
              handleOpenMod={setSelectProductModalOpen}
              setSelectedProduct={setProductSelected}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen()}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={(e) => submitAddProduct(e)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default WarehouseRequestAddModal;
