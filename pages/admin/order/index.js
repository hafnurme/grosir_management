import axios from "axios";
import { useEffect, useState } from "react";
import ProductTable from "@/components/TableComponents/ProductTable";
import Paginate from "@/components/paginate";
import ProdukAddModal from "@/components/Modal/Produk/ProdukAddModal";
import { IconButton, Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import OrderTable from "@/components/TableComponents/orderTable";
import MakeNewOrder from "@/components/Modal/Order/MakeNewOrder";

const OrderProduk = () => {
  const [product, setProduct] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [size, setSize] = useState();

  const fetchProduct = async (page, link) => {
    const producttemp = await axios.get("/api/order").then((res) => {
      return res.data;
    });

    setProduct(producttemp);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleSearch = async (e, search) => {
    e.preventDefault();

    if (search) {
      search = search.replace(/[!@#$%^&*\\]/g, "");
      search = search.trim();
    }
    if (search && search !== "") {
      const dataTemp = await axios
        .post(`/api/product/name`, { data: { name: search } })
        .then((res) => {
          return res.data;
        });

      setProduct(dataTemp);
    } else {
      fetchProduct();
    }
  };

  return (
    <div>
      {product && (
        <>
          <div className="flex justify-between items-center pb-4">
            <div className="hidden sm:block">
              <div className="text-2xl font-semibold">
                <h3>Order</h3>
              </div>
            </div>

            <div className="flex justify-end gap-2 w-full">
              {/* <form
                onSubmit={(e) => {
                  handleSearch(e, searchQuery);
                }}
                className="flex gap-2 w-full justify-end"
              >
                <div className="w-full sm:w-52">
                  <Input
                    label="Search"
                    color="orange"
                    variant="outlined"
                    className="w-full"
                    // onChange={(e) => {
                    //   setSearchQuery(e.target.value);
                    // }}
                  />
                </div>
                <IconButton size={size} className="w-20" color="orange">
                  <MagnifyingGlassIcon className="w-6" />
                </IconButton>
              </form> */}
              <MakeNewOrder refreshData={fetchProduct} />
            </div>
          </div>

          <div className="overflow-x-scroll lg:overflow-auto  sm:mx-0">
            <OrderTable
              data={product.data}
              refreshData={fetchProduct}
              title="Order"
              search={false}
              head={[
                "product_code",
                "name",
                "total_amount",
                "quantity",
                "product_expired",
              ]}
            />
          </div>
          <Paginate
            setData={setProduct}
            page={product}
            refreshData={fetchProduct}
          />
        </>
      )}
    </div>
  );
};

export default OrderProduk;
