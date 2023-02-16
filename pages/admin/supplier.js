import axios from "axios";
import { useEffect, useState } from "react";
import SupplierTable from "@/components/TableComponents/SupplierTable";
import AddModal from "@/components/Modal/AddModal";
import { IconButton, Input, Typography } from "@material-tailwind/react";
import { getSession } from "next-auth/react";
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Paginate from "@/components/paginate";

export default function supplier() {
  const [supplier, setSupplier] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [size, setSize] = useState();

  const fetchSupplier = async () => {
    const supplier = await axios.get("/api/supplier");
    const res = supplier.data;

    setSupplier(res);
  };

  useEffect(() => {
    fetchSupplier();
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
    fetchSupplier();
  };

  return (
    <>
      {supplier && (
        <div className="relative">
          <div className="flex justify-between items-center py-4 px-2">
            <div className="mx-2">
              <Typography variant="h4">Supplier</Typography>
            </div>
            <div className="flex gap-2">
              <form
                onSubmit={(e) => {
                  handleSearch(e, searchQuery);
                }}
                className="flex gap-2"
              >
                <Input
                  label="Search"
                  color="orange"
                  variant="outlined"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                />
                <IconButton className="w-20" color="orange">
                  <MagnifyingGlassIcon className="h-6" />
                </IconButton>
              </form>
              <AddModal
                addUrl="/api/supplier"
                itemHead={["supplier_name", "contact", "address"]}
                fieldType={["text", "number", "text"]}
                label="Tambah Supplier"
                refreshData={fetchSupplier}
                col="1"
                size={size}
              />
            </div>
          </div>
          <div>
            <div className="px-2">
              <SupplierTable
                head={["supplier_name", "contact", "address"]}
                title="Supplier List"
                search
                data={supplier.data}
                refreshData={fetchSupplier}
                handleSearch={handleSearch}
              />
            </div>
            <div className="flex justify-end px-2">
              <Paginate
                page={supplier}
                refreshData={fetchSupplier}
                setData={setSupplier}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
