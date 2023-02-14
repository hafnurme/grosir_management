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

const SelectProductModal = ({
  size,
  open,
  handleOpenMod,
  setSelectedProduct,
}) => {
  const [finalData, setFinalData] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [productList, setProductList] = useState();

  const fetchProduct = async () => {
    const productTemp = await axios.get("/api/product").then((res) => {
      return res.data;
    });
    setProductList(productTemp.data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    setFinalData(productList);
  }, [productList]);

  const handleSearch = (e, search) => {
    e.preventDefault();

    if (search !== null || search !== "") {
      const filteredData = productList.filter((elem) => {
        const key = new RegExp("^" + search, "i");
        if (elem.name.match(key)) {
          return elem;
        }
      });
      return setFinalData(filteredData);
    }

    fetchProduct();
  };

  const handleSelectProduct = (item) => {
    setSelectedProduct(item);
    handleOpenMod();
  };

  return (
    <Fragment>
      <Dialog
        open={open || false}
        size={size || "lg"}
        handler={handleOpenMod}
        className="z-50"
      >
        <DialogHeader>Pilih Product</DialogHeader>
        <DialogBody divider>
          <form
            onSubmit={(e) => {
              handleSearch(e, searchQuery);
            }}
            className="flex gap-2"
          >
            <Input
              label="Nama Produk"
              color="orange"
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e, searchQuery);
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
              finalData ? "border" : ""
            } border-blue-gray-200`}
          >
            <ul>
              {finalData &&
                finalData.map((element, index) => {
                  return (
                    <li
                      className="bg-blue-gray-50 py-2 px-2 border-blue-gray-200 hover:bg-gray-50 cursor-pointer text-gray-800"
                      key={index}
                      onClick={() => {
                        handleSelectProduct(element);
                      }}
                    >
                      {element.name}
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

export default SelectProductModal;
