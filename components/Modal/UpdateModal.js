import { PencilSquareIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import AlertComponent from "../AlertComponent";

export default function UpdateModal({
  item,
  itemHead,
  updateUrl,
  refreshData,
  itemIndex,
  col,
}) {
  const [open, setOpen] = useState(false);
  const [itemUpdate, setItemUpdate] = useState();
  const [alertShow, setAlertShow] = useState(false);

  useEffect(() => {
    setItemUpdate(item);
  }, []);

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let itemUpdateTemp = itemUpdate;

    formData.forEach((value, key) => {
      itemUpdateTemp[key] = value;
    });

    setItemUpdate(itemUpdateTemp);

    try {
      await axios
        .put(`${updateUrl}${id}`, {
          data: itemUpdate,
        })
        .then((res) => {
          refreshData();
          handleOpen();
        });
    } catch (error) {
      setAlertShow(true);
    }
  };

  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <Button variant="text" className="p-1 shadow-md" onClick={handleOpen}>
        <PencilSquareIcon className="h-6 text-c" />
      </Button>
      <Dialog open={open} handler={handleOpen} size={"xl"}>
        <form
          className="w-full relative flex flex-col"
          onSubmit={(e) => {
            handleUpdate(e, item[`${itemIndex ? itemIndex : "id"}`]);
          }}
        >
          <DialogHeader>Update</DialogHeader>
          <DialogBody className="bg-blue-gray-50 flex-1" divider>
            {alertShow && (
              <div className="mb-4">
                <AlertComponent show={alertShow} setShow={setAlertShow} />
              </div>
            )}
            <div className={`grid grid-cols-${col || "2"} gap-5 h-min w-full`}>
              {itemUpdate &&
                itemHead.map((key, index) => {
                  return (
                    <Input
                      label={key.toUpperCase()}
                      color="orange"
                      key={index}
                      defaultValue={item[key]}
                      name={key}
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
              Update
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </Fragment>
  );
}
