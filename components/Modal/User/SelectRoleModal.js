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

const SelectRoleModal = ({ size, modalOpen, handleOpenMod, setRole }) => {
  const [roleList, setRoleList] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [finalData, setFinalData] = useState();

  const fetchRole = async () => {
    const roleTemp = await axios.get("/api/Role").then((res) => {
      return res.data;
    });
    setRoleList(roleTemp);
  };

  useEffect(() => {
    fetchRole();
  }, []);

  useEffect(() => {
    setFinalData(roleList);
  }, [roleList]);

  const handleSearch = (e, search) => {
    e.preventDefault();

    if (search) {
      search = search.replace(/[!@#$%^&*\\]/g, "");
    }
    if (search !== null || search !== "") {
      const filteredData = roleList.filter((elem) => {
        const key = new RegExp("^" + search, "i");
        if (elem.category_name.match(key)) {
          return elem;
        }
      });

      setFinalData(filteredData);
    } else {
      fetchRole();
    }
  };

  const handleSelectRole = (item) => {
    setRole(item);
    handleOpenMod();
  };

  return (
    <Fragment>
      <Dialog
        open={modalOpen || false}
        handler={handleOpenMod}
        className="z-50 max-w-[90%] min-w-[90%] lg:min-w-[75%]"
      >
        <DialogHeader>Pilih Role</DialogHeader>
        <DialogBody divider>
          <form
            onSubmit={(e) => {
              handleSearch(e, searchQuery);
            }}
            className="flex gap-2"
          >
            <Input
              label="Role"
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
            className={`mt-4 rounded overflow-hidden max-h-[15rem] overflow-y-scroll ${
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
                        handleSelectRole(element);
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

export default SelectRoleModal;
