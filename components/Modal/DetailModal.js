import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

export default function DetailModal({ item }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <Button variant="gradient" className="p-1" onClick={handleOpen}>
        <InformationCircleIcon className="h-6" />
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        size={"xxl"}
        className="flex flex-col"
      >
        <DialogHeader>Detail</DialogHeader>
        <DialogBody className="text-gray-800 bg-blue-gray-50 flex-1" divider>
          <div className="grid grid-cols-2">
            {item &&
              Object.keys(item).map((key, index) => {
                if (key !== "created_at" && key !== "updated_at") {
                  return (
                    <div
                      className="border-b border-blue-gray-100 py-2"
                      key={index}
                    >
                      <label className="uppercase min-w-[200px] inline-block">
                        {key}
                      </label>
                      <span className="mr-4">:</span>
                      <p className="font-semibold inline-block">{item[key]}</p>
                    </div>
                  );
                }
              })}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
