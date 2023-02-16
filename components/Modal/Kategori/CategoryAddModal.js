import { PlusCircleIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const CategoryAddModal = ({ modalSize, refreshData }) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [categoryType, setCategoryType] = useState();

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

    dataTemp["category_type"] = categoryType;

    await axios.post("/api/category", { data: dataTemp }).then((res) => {
      console.log(res.data);
      handleOpen();
      refreshData();
    });
  };

  return (
    <div>
      <IconButton
        size={size}
        className="w-20"
        onClick={handleOpen}
        color="orange"
        variant="filled"
      >
        <PlusCircleIcon className="h-6" />
      </IconButton>
      <Dialog
        open={open}
        handler={handleOpen}
        className="flex flex-col min-w-[90%] md:min-w-[50%] lg:min-w-[25%]"
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
                label="Category Name"
                type="text"
                name="category_name"
              />
              <Select label="Category Type" color="orange">
                <Option onClick={() => setCategoryType("Pangan")}>
                  Pangan
                </Option>
                <Option onClick={() => setCategoryType("Non-Pangan")}>
                  Non-Pangan
                </Option>
              </Select>
            </div>
          </form>
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

export default CategoryAddModal;
