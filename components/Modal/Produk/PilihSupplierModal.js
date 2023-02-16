import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

const PilihSupplierModal = ({
  size,
  modalOpen,
  handleOpenMod,
  setSupplier,
}) => {
  const [finalData, setFinalData] = useState();
  const [supplierList, setSupplierList] = useState();
  const [searchQuery, setSearchQuery] = useState();

  const fetchSupplier = async () => {
    const dataTemp = await axios.get("/api/supplier").then((res) => {
      return res.data;
    });
    setSupplierList(dataTemp.data);
  };

  useEffect(() => {
    fetchSupplier();
  }, []);

  useEffect(() => {
    setFinalData(supplierList);
  }, [supplierList]);

  const handleSearch = async (e, search) => {
    e.preventDefault();
    search = search.trim();
    if (search) {
      search = search.replace(/[!@#$%^&*\\]/g, "");
    }
    if (search || search !== "") {
      const dataTemp = await axios
        .post(`/api/supplier/name`, { data: { supplier_name: search } })
        .then((res) => {
          return res.data;
        });

      setSupplierList(dataTemp.data);
    } else {
      fetchSupplier();
    }
  };

  const handleSelectSupplier = (item) => {
    setSupplier(item);
    handleOpenMod();
  };

  return (
    <Fragment>
      <Dialog
        open={modalOpen || false}
        handler={handleOpenMod}
        className="z-50 max-w-[90%] min-w-[90%] lg:min-w-[75%]"
      >
        <DialogHeader>Cari Supplier</DialogHeader>
        <DialogBody divider>
          <form
            onSubmit={(e) => {
              handleSearch(e, searchQuery);
            }}
            className="flex gap-2"
          >
            <Input
              label="Supplier Name"
              color="orange"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <IconButton
              className="w-20"
              color="orange"
              onClick={(e) => {
                handleSearch(e, searchQuery);
              }}
            >
              <MagnifyingGlassIcon className="h-6" />
            </IconButton>
          </form>
          <div
            className={`mt-4 rounded overflow-hidden ${
              supplierList ? "border" : ""
            } border-blue-gray-200`}
          >
            <ul>
              {supplierList &&
                supplierList.map((element, index) => {
                  return (
                    <li
                      className="bg-blue-gray-50 py-2 px-2 border-blue-gray-200 hover:bg-gray-50 cursor-pointer text-gray-800"
                      key={index}
                      onClick={() => {
                        handleSelectSupplier(element);
                      }}
                    >
                      {element.supplier_name}
                    </li>
                  );
                })}
            </ul>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpenMod()}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpenMod()}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default PilihSupplierModal;
