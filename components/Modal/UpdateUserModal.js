import { PencilSquareIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Radio,
} from "@material-tailwind/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

export default function UpdateUserModal({
  item,
  itemHead,
  updateUrl,
  refreshData,
  itemIndex,
  size,
  col,
}) {
  const [open, setOpen] = useState(false);
  const [itemUpdate, setItemUpdate] = useState({
    username: "",
    name: "",
    contact: "",
    email: "",
  });

  useEffect(() => {
    setItemUpdate({
      username: item.username,
      name: item.name,
      contact: item.password,
      email: item.email,
    });
  }, []);

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let itemUpdateTemp = itemUpdate;

    formData.forEach((value, key) => {
      itemUpdateTemp[key] = value;
    });

    setItemUpdate(itemUpdateTemp);

    await axios
      .put(`${updateUrl}`, {
        data: itemUpdate,
      })
      .then((res) => {
        alert(res.data.message);
        refreshData();
        handleOpen();
      })
      .catch((err) => console.log(err));
  };

  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <Button variant="gradient" onClick={handleOpen}>
        ubah profile
      </Button>
      <Dialog open={open} handler={handleOpen} size={size}>
        <form
          className="w-full relative flex flex-col"
          onSubmit={(e) => {
            handleUpdate(e, item[`${itemIndex ? itemIndex : "id"}`]);
          }}
        >
          <DialogHeader>Update</DialogHeader>
          <DialogBody className="bg-blue-gray-50 flex-1" divider>
            <h1 className="text-xl font-semibold mb-5">Profile</h1>
            <div
              className={`grid grid-cols-${
                col || "2"
              } gap-5 h-min w-full  mb-5`}
            >
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
