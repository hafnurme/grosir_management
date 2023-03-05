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

  const handleSearch = async (e, search) => {
    e.preventDefault();
    if (search !== null || search !== "") {
      const dataTemp = await axios
        .post(`/api/product/name`, { data: { name: search } })
        .then((res) => {
          return res.data;
        });

      setProductList(dataTemp.data);
    } else {
      fetchProduct();
    }
  };

  const handleSelectProduct = (item) => {
    setSelectedProduct(item);
    handleOpenMod();
  };

  return (
    <Fragment>
      <Dialog
        open={open || false}
        handler={handleOpenMod}
        className="z-50 max-w-[90%] min-w-[90%] lg:min-w-[75%]"
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
                      {element.name} - {element.product_code}
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
