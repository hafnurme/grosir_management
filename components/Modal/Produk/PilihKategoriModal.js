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

const PilihKategoriModal = ({
  size,
  modalOpen,
  handleOpenMod,
  setCategory,
}) => {
  const [kategoriList, setKategoriList] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [finalData, setFinalData] = useState();

  const fetchKategori = async () => {
    const kategoriTemp = await axios.get("/api/category").then((res) => {
      return res.data;
    });
    setKategoriList(kategoriTemp);
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  useEffect(() => {
    setFinalData(kategoriList);
  }, [kategoriList]);

  const handleSearch = (e, search) => {
    e.preventDefault();

    if (search) {
      search = search.replace(/[!@#$%^&*\\]/g, "");
    }
    if (search !== null || search !== "") {
      const filteredData = kategoriList.filter((elem) => {
        const key = new RegExp("^" + search, "i");
        if (elem.category_name.match(key)) {
          return elem;
        }
      });

      setFinalData(filteredData);
    } else {
      fetchKategori();
    }
  };

  const handleSelectCategory = (item) => {
    setCategory(item);
    handleOpenMod();
  };

  return (
    <Fragment>
      <div></div>
      <Dialog
        open={modalOpen || false}
        size={size || "lg"}
        handler={handleOpenMod}
        className="z-50"
      >
        <DialogHeader>Pilih Kategori</DialogHeader>
        <DialogBody divider>
          <form
            onSubmit={(e) => {
              handleSearch(e, searchQuery);
            }}
            className="flex gap-2"
          >
            <Input
              label="Nama Kategori"
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
                        handleSelectCategory(element);
                      }}
                    >
                      {element.category_name}
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

export default PilihKategoriModal;
