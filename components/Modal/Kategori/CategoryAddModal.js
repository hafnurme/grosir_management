import AlertComponent from "@/components/AlertComponent";
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
  const [alertShow, setAlertShow] = useState(false);

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

    try {
      await axios.post("/api/category", { data: dataTemp }).then((res) => {
        console.log(res.data);
        handleOpen();
        refreshData();
      });
    } catch (error) {
      return setAlertShow(true);
    }
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
          {alertShow && (
            <div className="mb-4">
              <AlertComponent show={alertShow} setShow={setAlertShow} />
            </div>
          )}
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
                required
              />
              <select
                name="category_type"
                id="countries"
                className="bg-blue-gray-50 border-2  border-blue-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-orange-500 focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option
                  value="Pangan"
                  onClick={() => setCategoryType("Pangan")}
                >
                  Pangan
                </option>
                <option
                  value="Non-Pangan"
                  onClick={() => setCategoryType("Non-Pangan")}
                >
                  Non Pangan
                </option>
              </select>
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
