import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import axios from "axios";

export default function CategoryAddForm({ refreshData }) {
  const [size, setSize] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [categoryType, setCategoryType] = useState(null);

  const handleOpen = (value) => setSize(value);

  const handleAddCategory = () => {
    if (categoryName && categoryType) {
      axios
        .post("/api/category", {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            category_name: categoryName,
            category_type: categoryType,
          },
        })
        .then((res) => console.log(res.data));
      refreshData();
    } else {
      console.log("gagal");
    }
  };

  return (
    <Fragment>
      <div className="flex h-10 w-full">
        <Button
          onClick={() => handleOpen("md")}
          color="orange"
          variant="filled"
        >
          Add Category
        </Button>
      </div>
      <Dialog open={size ? true : false} size={size}>
        <DialogHeader>Add Kategori</DialogHeader>
        <DialogBody divider className="bg-blue-gray-50">
          <div className="w-full">
            <div className="w-full flex flex-col gap-5 py-5">
              <Input
                label="Kategory Name"
                color="orange"
                className="flex-1"
                onChange={(input) => {
                  setCategoryName(input.target.value);
                }}
              />
              <Input
                label="Kategory Type"
                color="orange"
                className="flex-1"
                onChange={(input) => {
                  setCategoryType(input.target.value);
                }}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
          <Button variant="gradient" color="orange" onClick={handleAddCategory}>
            <span>Add</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
