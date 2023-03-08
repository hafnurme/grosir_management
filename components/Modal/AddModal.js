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
import { useState } from "react";
import AlertComponent from "../AlertComponent";

export default function AddModal({
  itemHead,
  addUrl,
  refreshData,
  fieldType,
  col,
}) {
  const [open, setOpen] = useState(false);
  const [alertShow, setAlertShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let itemAddTemp = {};

    formData.forEach((value, key) => {
      itemAddTemp[key] = value;
    });

    try {
      await axios
        .post(`${addUrl}`, {
          data: itemAddTemp,
        })
        .then(() => {
          refreshData();
        });
    } catch (error) {
      return setAlertShow(true);
    }
  };

  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <IconButton
        className="w-20"
        onClick={handleOpen}
        color="orange"
        variant="filled"
      >
        <PlusCircleIcon className="h-6" />
      </IconButton>
      <Dialog open={open} handler={handleOpen} size="xl">
        <form
          className="w-full relative flex flex-col"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <DialogHeader>Add</DialogHeader>
          <DialogBody className="bg-blue-gray-50 flex-1" divider>
            <div className={`grid grid-cols-${col || "2"} gap-5 h-min w-full`}>
              <AlertComponent setShow={setAlertShow} show={alertShow} />
              {itemHead &&
                itemHead.map((key, index) => {
                  return (
                    <Input
                      label={key.toUpperCase()}
                      color="orange"
                      key={index}
                      name={key}
                      type={fieldType[index]}
                      required
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
