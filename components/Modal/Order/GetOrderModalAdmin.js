import { CheckCircleIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { Fragment, useState } from "react";

const GetOrderModalAdmin = ({ id, refreshData, url }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleConfirm = async () => {
    await axios
      .post(url, {
        data: { id },
      })
      .then((res) => {
        console.log(res.data);
        handleOpen();
        refreshData();
      });
  };

  return (
    <Fragment>
      <Button variant="gradient" className="p-1" onClick={handleOpen}>
        <CheckCircleIcon className="h-6" />
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Confirmation</DialogHeader>
        <DialogBody divider>
          <Typography>Get This Response ?</Typography>
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
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default GetOrderModalAdmin;
