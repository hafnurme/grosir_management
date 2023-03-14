import AlertComponent from "@/components/AlertComponent";
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

const ProcessRequest = ({ id, refreshData, orderObj }) => {
  const [open, setOpen] = useState(false);
  const [orderList, setOrderList] = useState();
  const [selectedOrder, setSelectedOrder] = useState();
  const [alertShow, setALertShow] = useState();
  const [alertMessage, setALertMessage] = useState();

  const fetchOrder = async () => {
    const dataTemp = await axios.get(`/api/order/${id}`).then((res) => {
      return res.data;
    });
    setOrderList(dataTemp.data);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    console.log(selectedOrder);
  }, [selectedOrder]);

  const handleSelectOrder = (item) => {
    setSelectedOrder(item);
  };

  const handleOpen = () => {
    setOpen(!open);
    setALertShow(false);
  };

  const handleConfirm = async () => {
    try {
      await axios
        .post(`/api/order/distribute/${selectedOrder["product_order_id"]}`, {
          data: {
            warehouse_id: orderObj["warehouse_id"],
            quantity: orderObj["quantity"],
            product_order_requests_id: orderObj["product_order_requests_id"],
          },
        })
        .then((res) => {
          console.log(res.data);
          handleOpen();
          refreshData();
        });
    } catch (error) {
      setALertShow(true);
    }
  };

  return (
    <Fragment>
      <Button variant="gradient" className="p-1" onClick={handleOpen}>
        <Squares2X2Icon className="h-6" />
      </Button>
      <Dialog open={open} size="xl" handler={handleOpen}>
        <DialogHeader>Process Request</DialogHeader>
        <DialogBody divider>
          <AlertComponent show={alertShow} setALertShow={setALertShow} />
          <Typography className="text-gray-800">Pilih Order</Typography>
          <div
            className={`mt-4 rounded overflow-hidden max-h-[15rem] overflow-y-scroll border
            border-blue-gray-200`}
          >
            <ul>
              {orderList &&
                orderList.map((element, index) => {
                  console.log(element);
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

export default ProcessRequest;
