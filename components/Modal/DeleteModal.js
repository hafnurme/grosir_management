import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/20/solid";
import axios from "axios";

export default function DeleteModal({
  itemToDelete,
  itemHead,
  refreshData,
  deleteUrl,
  itemIndex,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleDeleteItem = async (id) => {
    axios.delete(`${deleteUrl}${id}`).then((res) => {
      handleOpen();
      refreshData();
    });
  };

  return (
    <Fragment>
      <Button
        variant="gradient"
        color="red"
        className="p-1"
        onClick={handleOpen}
      >
        <TrashIcon className="h-6" />
      </Button>
      <Dialog open={open} handler={handleOpen} size={"md"}>
        <DialogHeader>Confirm</DialogHeader>
        <DialogBody className="text-c bg-blue-gray-50 text-gray-800" divider>
          <div className="w-full m-2">
            <p className="mb-3 font-semibold">Are you sure want to delete :</p>
            <div>
              {itemHead &&
                itemHead.map((elem, i) => {
                  return (
                    <div className="border-b py-1" key={i}>
                      <label className="uppercase min-w-[150px] inline-block font-semibold">
                        {elem}
                      </label>
                      <span className="mr-2">:</span>
                      <p className="inline-block">{itemToDelete[elem]}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={handleOpen}
            className="mr-2 text-c"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={() =>
              handleDeleteItem(itemToDelete[`${itemIndex ? itemIndex : "id"}`])
            }
          >
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
