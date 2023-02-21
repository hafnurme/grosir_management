import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

export default function DetailModal({ item, size, col }) {
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
        size={size || "xxl"}
        className="flex flex-col"
      >
        <DialogHeader>Detail</DialogHeader>
        <DialogBody className="text-gray-800 bg-blue-gray-50 flex-1 overflow-y-auto" divider>
          <div className={`grid grid-cols-${col || "2"}`}>
            {item &&
              Object.keys(item).map((key, index) => {
                if (
                  key !== "created_at" &&
                  key !== "updated_at" &&
                  key !== "deleted_at"
                ) {
                  return (
                    <div
                      className="border-b border-blue-gray-100 py-2"
                      key={index}
                    >
                      <label className="uppercase min-w-[200px] block font-semibold">
                        {key} :
                      </label>
                      <p className="block text-gray-900">{item[key]}</p>
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
