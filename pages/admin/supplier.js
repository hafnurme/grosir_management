import axios from "axios";
import { useEffect, useState } from "react";
import SupplierTable from "@/components/TableComponents/SupplierTable";
import AddModal from "@/components/Modal/AddModal";
import { IconButton } from "@material-tailwind/react";
import { getSession } from "next-auth/react";

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
        {supplier.current_page != 1 && supplier.current_page - 1 != 1 && (
          <IconButton
            onClick={() => {
              paginateNavigate(supplier.first_page_url);
            }}
          >
            1...
          </IconButton>
        )}
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
  return (
    <>
      {supplier && (
        <>
          <div className="flex justify-between mb-4">
            <AddModal
              addUrl="/api/supplier"
              itemHead={["supplier_name", "contact", "address"]}
              fieldType={["text", "number", "text"]}
              label="Tambah Supplier"
              refreshData={fetchSupplier}
            />
            <div className="flex gap-1">
              <Links />
            </div>
          </div>
          <div>
            <SupplierTable
              head={["supplier_name", "contact", "address"]}
              title="Supplier List"
              search
              data={supplier}
              refreshData={fetchSupplier}
            />
          </div>
        </>
      )}
    </>
  );
}
