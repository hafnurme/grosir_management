import axios from "axios";
import { useEffect, useState } from "react";
import AddModal from "@/components/Modal/AddModal";
import { IconButton, Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Paginate from "@/components/paginate";
import WarehouseTable from "@/components/TableComponents/WarehouseTable";

export default function warehouse() {
  const [warehouse, setWarehouse] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [size, setSize] = useState();

  const fetchWarehouse = async () => {
    const warehouse = await axios.get("/api/warehouse/detail");
    const res = warehouse.data;
    setWarehouse(res);
  };

  useEffect(() => {
    fetchWarehouse();
    window.innerWidth >= 960 ? setSize("md") : setSize("sm");
    window.addEventListener("resize", () =>
      window.innerWidth >= 960 ? setSize("md") : setSize("sm")
    );
  }, []);

  const handleSearch = async (e, search) => {
    e.preventDefault();
    if (search) {
      search = search.replace(/[!@#$%^&*\\]/g, "");
      search = search.trim();
    }
    if (search || search !== "") {
      console.log(search);
      console.log("first");
      const dataTemp = await axios
        .post(`/api/supplier/name`, { data: { supplier_name: search } })
        .then((res) => {
          return res.data;
        });

      return setSupplier(dataTemp);
    }
    fetchWarehouse();
  };

  return (
    <>
      {warehouse && (
        <div className="relative">
          <div className="flex justify-between items-center py-4 px-2">
            <div className="hidden sm:block">
              <Typography variant="h4">Warehouse</Typography>
            </div>
            <div className="flex gap-2 w-full">
              <form
                onSubmit={(e) => {
                  handleSearch(e, searchQuery);
                }}
                className="flex gap-2 w-full sm:justify-end"
              >
                <div className="w-full sm:w-52">
                  <Input
                    label="Search"
                    color="orange"
                    variant="outlined"
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                  />
                </div>
                <IconButton className="w-20" color="orange">
                  <MagnifyingGlassIcon className="h-6" />
                </IconButton>
              </form>
              <AddModal
                addUrl="/api/supplier"
                itemHead={["supplier_name", "contact", "address"]}
                fieldType={["text", "number", "text"]}
                label="Tambah Supplier"
                refreshData={fetchWarehouse}
                col="1"
                size={size}
              />
            </div>
          </div>
          <div>
            <div className="px-2 sm:px-0">
              <WarehouseTable
                // head={["name", "contact", "address"]}
                data={warehouse.data}
                refreshData={fetchWarehouse}
                handleSearch={handleSearch}
              />
            </div>
            <div className="flex justify-center  sm:justify-end px-2">
              <Paginate
                page={warehouse}
                refreshData={fetchWarehouse}
                setData={setWarehouse}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
