import { Squares2X2Icon } from "@heroicons/react/20/solid";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";

const GetOrderModalW = ({ id, refreshData, orderObj }) => {
  const [open, setOpen] = useState(false);

  const refForm = useRef(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(refForm.current);

    const dataTemp = {};

    formData.forEach((value, key) => {
      dataTemp[key] = value;
    });

    await axios
      .post("/api/warehouse/response", {
        data: {
          id: dataTemp.response_id,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        handleOpen();
        refreshData();
      });
  };

  const handleConfirm = async () => {
    refForm.current.requestSubmit();
  };

  return (
    <Fragment>
      <Button variant="gradient" onClick={handleOpen}>
        Get Order
      </Button>
      <Dialog open={open} size="xl" handler={handleOpen}>
        <DialogHeader>Process Request</DialogHeader>
        <DialogBody divider>
          <form onSubmit={(e) => handleSubmit(e)} ref={refForm}>
            <Typography className="text-gray-800">
              Masukkan Response Id
            </Typography>
            <Input name="response_id" />
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            <span>Get</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default GetOrderModalW;
