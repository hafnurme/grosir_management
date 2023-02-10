import { Fragment, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import ProductDetailForm from "../../FormComponents/ProductDetailForm";
import PilihSupplierModal from "./PilihSupplierModal";
import PilihKategoriModal from "./PilihKategoriModal";
import axios from "axios";

const AddProductModal = ({ size }) => {
  const [open, setOpen] = useState(false);
  const [supplierModal, setSupplierModal] = useState(false);
  const [kategoriModal, setKategoriModal] = useState(false);
  const [supplier, setSupplier] = useState();
  const [category, setCategory] = useState();

  const refForm = useRef(null);

  const handleOpen = () => setOpen(!open);
  const handleOpenSupplierModal = () => {
    setSupplierModal(!supplierModal);
  };
  const handleOpenKategoriModal = () => {
    setKategoriModal(!kategoriModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(refForm.current);

    const dataTemp = {};

    formData.forEach((value, key) => {
      dataTemp[key] = value;
    });

    dataTemp["category_id"] = category.category_id;
    dataTemp["supplier_id"] = supplier.supplier_id;

    await axios.post("/api/product", { data: dataTemp }).then((res) => {
      console.log(res.data);
    });
  };

  const submitAddProduct = () => {
    refForm.current.requestSubmit();
  };

  return (
    <Fragment>
      <div className="flex gap-3">
        <Button onClick={handleOpen} color="orange" variant="filled">
          Add Product
        </Button>
      </div>
      <Dialog
        open={open}
        size={size || "xl"}
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
            <ProductDetailForm
              supplier={supplier}
              category={category}
              handleOpenSupplierModal={handleOpenSupplierModal}
              handleOpenKategoriModal={handleOpenKategoriModal}
            />
          </form>
          <div className="grid grid-cols-2 gap-4">
            <PilihSupplierModal />
            <PilihKategoriModal />
          </div>
          <PilihSupplierModal
            modalOpen={supplierModal}
            handleOpenMod={handleOpenSupplierModal}
            setSupplier={setSupplier}
          />
          <PilihKategoriModal
            modalOpen={kategoriModal}
            handleOpenMod={handleOpenKategoriModal}
            setCategory={setCategory}
          />
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

export default AddProductModal;
