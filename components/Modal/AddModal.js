import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
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
import { Fragment, useEffect, useState } from "react";

export default function AddModal({
  itemHead,
  addUrl,
  refreshData,
  fieldType,
  label,
  col,
  size
}) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let itemAddTemp = {};

    formData.forEach((value, key) => {
      itemAddTemp[key] = value;
    });

    axios
      .post(`${addUrl}`, {
        data: itemAddTemp,
      })
      .then((res) => {
        // console.log(res.data);
        refreshData();
      });
  };

  const handleOpen = () => setOpen(!open);

  return (
    <div className="absolute bottom-10 right-10 z-30 lg:static">
      <IconButton size={size} className="w-20" onClick={handleOpen} color="orange" variant="filled">
        <PlusCircleIcon className={size == 'md' ? 'h-6' : 'h-4'} />
      </IconButton>
      <Dialog open={open} handler={handleOpen} size={size == 'md' ? 'lg' : 'xxl'}>
        <form
          className="w-full relative flex flex-col"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <DialogHeader>Add</DialogHeader>
          <DialogBody className="bg-blue-gray-50 flex-1" divider>
            <div className={`grid grid-cols-${col || "2"} gap-5 h-min w-full`}>
              {itemHead &&
                itemHead.map((key, index) => {
                  return (
                    <Input
                      label={key.toUpperCase()}
                      color="orange"
                      key={index}
                      name={key}
                      type={fieldType[index]}
                    ></Input>
                  );
                })}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              className="text-c mr-2"
              onClick={handleOpen}
            >
              Close
            </Button>
            <Button color="orange" type="submit">
              Add
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
