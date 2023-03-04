import { Squares2X2Icon } from "@heroicons/react/20/solid";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

const BranchProccessRequest = ({ id, refreshData, requestObj }) => {
  const [open, setOpen] = useState(false);
  const [batchList, setBatchList] = useState();
  const [selectedBatch, setSekectedBatch] = useState();

  const fetchBatch = async () => {
    const dataTemp = await axios.get(`/api/batch/${id}`).then((res) => {
      return res.data;
    });
    setBatchList(dataTemp.data);
  };

  useEffect(() => {
    if (open === true) {
      fetchBatch();
    }
  }, [open]);

  const handleSelectOrder = (item) => {
    setSekectedBatch(item);
  };

  const handleOpen = () => setOpen(!open);

  const handleConfirm = async () => {
    await axios
      .post(`/api/warehouse/response`, {
        data: {
          request_id: requestObj["request_id"],
          batch_id: selectedBatch["batch_id"],
        },
      })
      .then((res) => {
        handleOpen();
        refreshData();
      });
  };

  return (
    <Fragment>
      <Button variant="gradient" className="p-1" onClick={handleOpen}>
        <Squares2X2Icon className="h-6" />
      </Button>
      <Dialog open={open} size="xl" handler={handleOpen}>
        <DialogHeader>Process Branch Request</DialogHeader>
        <DialogBody divider>
          <Typography className="text-gray-800">Pilih Order</Typography>
          <div
            className={`mt-4 rounded overflow-hidden max-h-[15rem] overflow-y-scroll border
            border-blue-gray-200`}
          >
            <ul>
              {batchList &&
                batchList.map((element, index) => {
                  return (
                    <label
                      className="bg-blue-gray-50 py-2 px-2 border-blue-gray-200 hover:bg-gray-50 cursor-pointer text-gray-800 flex gap-2"
                      key={index}
                      onClick={() => {
                        handleSelectOrder(element);
                      }}
                    >
                      <input type={"radio"} name="produk_order" />
                      <li>
                        {element["product_code"]} - {element["quantity"]} -{" "}
                        {element["purchase_date"]}
                      </li>
                    </label>
                  );
                })}
            </ul>
          </div>
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
            <span>Transfer</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default BranchProccessRequest;
