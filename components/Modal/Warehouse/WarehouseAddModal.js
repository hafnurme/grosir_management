import { PlusCircleIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import SelectProductModal from "./SelectProductModal";

const WarehouseAddModal = () => {
  const [open, setOpen] = useState(false);
  const [productSelected, setProductSelected] = useState();
  const [size, setSize] = useState()
  const [selectProductModalOpen, setSelectProductModalOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const refForm = useRef(null);

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

    dataTemp["product_id"] = productSelected.id;

    await axios.post("/api/warehouse", { data: dataTemp }).then((res) => {
      console.log(res.data);
      handleOpen();
    });
  };

  useEffect(() => {
    window.innerWidth >= 960 ? setSize('md') : setSize('sm')
    window.addEventListener("resize", () => window.innerWidth >= 960 ? setSize('md') : setSize('sm'))
  }, [])


  return (
    <div className="absolute bottom-10 right-10 z-30 lg:static">
      <IconButton size={size} className="w-20" onClick={handleOpen} color="orange" variant="filled">
        <PlusCircleIcon className={size == 'md' ? 'h-6' : 'h-4'} />
      </IconButton>
      <Dialog
        open={open}
        size={size == 'md' ? 'lg' : 'xxl'}
        handler={handleOpen}
        className="flex flex-col"
      >
        <DialogHeader>Add Produk</DialogHeader>
        <DialogBody className="flex-1 bg-blue-gray-50" divider>
          <form
            ref={refForm}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="grid gap-2 grid-cols-1">
              <Input
                color="orange"
                label="Product"
                type="text"
                readOnly={true}
                value={productSelected ? productSelected.name : ""}
                onClick={() => {
                  setSelectProductModalOpen(!selectProductModalOpen);
                }}
                name="product_id"
              />
              <Input color="orange" label="Stock" type="number" name="stock" />
              <Input
                color="orange"
                label="Location"
                type="text"
                name="location"
              />
            </div>
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
    </div>
  );
};

export default WarehouseAddModal;
