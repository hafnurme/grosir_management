import axios from "axios";
import { useEffect, useState } from "react";
import SupplierTable from "@/components/TableComponents/SupplierTable";
import AddModal from "@/components/Modal/AddModal";
import {
  Alert,
  Button,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Paginate from "@/components/paginate";
import AlertComponent from "@/components/AlertComponent";

export default function supplier() {
  const [supplier, setSupplier] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [alertShow, setAlertShow] = useState(false);

  const fetchSupplier = async () => {
    const supplier = await axios.get("/api/supplier");
    const res = supplier.data;

    setSupplier(res);
  };

  useEffect(() => {
    fetchSupplier();
  }, []);

  const handleSearch = async (e, search) => {
    e.preventDefault();
    if (search) {
      search = search.replace(/[!@#$%^&*\\]/g, "");
      search = search.trim();
    }
    if (search || search !== "") {
      try {
        const dataTemp = await axios
          .post(`/api/supplier/name`, { data: { supplier_name: search } })
          .then((res) => {
            return res.data;
          });
        return setSupplier(dataTemp);
      } catch (error) {
        return setAlertShow(true);
      }
    }
    fetchSupplier();
  };

  return (
    <>
      {supplier && (
        <div className="relative">
          {alertShow && (
            <AlertComponent
              show={alertShow}
              setShow={setAlertShow}
              position="absolute"
            />
          )}
          <div className="flex justify-between items-center pb-4 px-2">
            <div className="hidden sm:block">
              <Typography variant="h4">Supplier</Typography>
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
                refreshData={fetchSupplier}
                col="1"
              />
            </div>
          </div>
          <div>
            <div className="px-2 sm:px-0">
              <SupplierTable
                head={["supplier_name", "contact", "address"]}
                title="Supplier List"
                search
                data={supplier.data}
                refreshData={fetchSupplier}
                handleSearch={handleSearch}
              />
            </div>
            <Paginate
              page={supplier}
              refreshData={fetchSupplier}
              setData={setSupplier}
            />
          </div>
        </div>
      )}
    </>
  );
}
