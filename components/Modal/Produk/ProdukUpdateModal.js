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
import PilihKategoriModal from "./PilihKategoriModal";

export default function ProductUpdateModal({
  item,
  itemHead,
  updateUrl,
  refreshData,
  itemIndex,
  col,
}) {
  const [open, setOpen] = useState(false);
  const [itemUpdate, setItemUpdate] = useState();
  const [kategoriModal, setKategoriModal] = useState(false);
  const [category, setCategory] = useState();

  const handleOpenKategoriModal = () => {
    setKategoriModal(!kategoriModal);
  };

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

    if (category) {
      itemUpdateTemp["category_id"] = category.category_id;
    }

    setItemUpdate(itemUpdateTemp);

    await axios
      .put(`${updateUrl}${id}`, {
        data: itemUpdate,
      })
      .then((res) => {
        refreshData();
        handleOpen();
      });
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
              <Input
                readOnly
                label="Kategori"
                name="kategori_id"
                color="orange"
                className="w-full"
                defaultValue={category ? category.category_name : ""}
                onClick={handleOpenKategoriModal}
                onKeyDown={(e) => {
                  if (e.key !== "Tab") handleOpenKategoriModal();
                }}
                tabIndex="4"
                required={true}
                key={category ? category.category_name : "category"}
              />
            </div>
            <div>
              <PilihKategoriModal
                modalOpen={kategoriModal}
                handleOpenMod={handleOpenKategoriModal}
                setCategory={setCategory}
              />
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
