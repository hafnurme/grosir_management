import axios from "axios";
import { useEffect, useState } from "react";
import SupplierTable from "@/components/TableComponents/SupplierTable";
import AddModal from "@/components/Modal/AddModal";
import { IconButton } from "@material-tailwind/react";
import { getSession } from "next-auth/react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

export default function supplier() {
  const [supplier, setSupplier] = useState();

  const fetchSupplier = async () => {
    const supplier = await axios.get("/api/supplier");
    const res = supplier.data;

    setSupplier(res);
  };
  useEffect(() => {
    fetchSupplier();
  }, []);

  const paginateNavigate = async (link) => {
    const accessToken = await getSession().then((token) => token.accessToken);

    const dataTemp = await axios
      .get(link, {
        headers: {
          token: accessToken,
        },
      })
      .then((res) => {
        return res.data;
      });

    return setSupplier(dataTemp);
  };

  const Links = () => {
    return (
      <>
        <IconButton
          disabled={supplier.prev_page_url === null ? true : false}
          onClick={() => {
            paginateNavigate(supplier.prev_page_url);
          }}
        >
          Prev
        </IconButton>
        {supplier.current_page != 1 && (
          <IconButton
            onClick={() => {
              paginateNavigate(
                supplier.path + `?page=${supplier.current_page - 1}`
              );
            }}
          >
            {supplier.current_page - 1}
          </IconButton>
        )}
        <IconButton
          onClick={() => {
            paginateNavigate(supplier.path + `?page=${supplier.current_page}`);
          }}
          variant="outlined"
        >
          {supplier.current_page}
        </IconButton>
        {supplier.current_page != supplier.last_page && (
          <>
            <IconButton
              onClick={() => {
                paginateNavigate(
                  supplier.path + `?page=${supplier.current_page + 1}`
                );
              }}
            >
              {supplier.current_page + 1}
            </IconButton>
          </>
        )}
        {supplier.current_page != supplier.last_page &&
          supplier.current_page + 1 != supplier.last_page && (
            <IconButton
              onClick={() => {
                paginateNavigate(supplier.last_page_url);
              }}
            >
              ...{supplier.last_page}
            </IconButton>
          )}
        <IconButton
          disabled={supplier.next_page_url === null ? true : false}
          onClick={() => {
            paginateNavigate(supplier.next_page_url);
          }}
        >
          next
        </IconButton>
      </>
    );
  };

  const handleSearch = async (search) => {
    search = search.trim();
    if (search || search !== "") {
      console.log(search);
      console.log("first");
      const dataTemp = await axios
        .post(`/api/supplier/name`, { data: { supplier_name: search } })
        .then((res) => {
          return res.data;
        });

      setSupplier(dataTemp);
    }
  };

  return (
    <>
      {supplier && (
        <div className="relative">
          <div className="flex justify-between mb-4 sticky top-0 z-20 bg-blue-gray-100">
            <AddModal
              addUrl="/api/supplier"
              itemHead={["supplier_name", "contact", "address"]}
              fieldType={["text", "number", "text"]}
              label="Tambah Supplier"
              refreshData={fetchSupplier}
              col="1"
              size={"md"}
            />
            <div className="flex gap-1">
              <IconButton onClick={fetchSupplier}>
                <ArrowPathIcon className="h-6" />
              </IconButton>
              <Links />
            </div>
          </div>
          <div>
            <SupplierTable
              head={["supplier_name", "contact", "address"]}
              title="Supplier List"
              search
              data={supplier.data}
              refreshData={fetchSupplier}
              handleSearch={handleSearch}
            />
          </div>
        </div>
      )}
    </>
  );
}
