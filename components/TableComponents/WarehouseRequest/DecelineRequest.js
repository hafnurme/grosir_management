import { XCircleIcon } from "@heroicons/react/20/solid";
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

const DecelineRequest = ({ id, refreshData, url }) => {
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
      <Button
        variant="gradient"
        className="p-1"
        color="red"
        onClick={handleOpen}
      >
        <XCircleIcon className="h-6" />
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Confirmation</DialogHeader>
        <DialogBody divider>
          <Typography>Decekube This Request ?</Typography>
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

export default DecelineRequest;
