import axios from "axios";
import { useEffect, useState } from "react";
import ProductTable from "@/components/TableComponents/ProductTable";
import Paginate from "@/components/paginate";
import ProdukAddModal from "@/components/Modal/Produk/ProdukAddModal";
import { IconButton, Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import AlertComponent from "@/components/AlertComponent";

const Produk = () => {
  const [product, setProduct] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [alertShow, setAlertShow] = useState(false);

  const fetchProduct = async (page, link) => {
    const producttemp = await axios.get("/api/product").then((res) => {
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
      try {
        const dataTemp = await axios
          .post(`/api/product/name`, { data: { name: search } })
          .then((res) => {
            return res.data;
          });
        setProduct(dataTemp);
      } catch (error) {
        return setAlertShow(true);
      }
    } else {
      fetchProduct();
    }
  };

  return (
    <div className="relative">
      <AlertComponent
        show={alertShow}
        setShow={setAlertShow}
        position="absolute"
      />
      {product && (
        <>
          <div className="flex items-center pb-4 px-2">
            <div className="hidden sm:block">
              <div>
                <Typography variant="h3">Produk</Typography>
              </div>
            </div>

            <div className="flex gap-2 w-full">
              <form
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
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                  />
                </div>
                <IconButton className="w-20" color="orange" type="submit">
                  <MagnifyingGlassIcon className="w-6" />
                </IconButton>
              </form>
              <ProdukAddModal refreshData={fetchProduct} />
            </div>
          </div>

          <div className="overflow-x-scroll lg:overflow-auto mx-2 sm:mx-0">
            <ProductTable
              head={["product_code", "name", "brand", "category_name"]}
              title="Product List"
              search={true}
              data={product.data}
              refreshData={fetchProduct}
              current_page={product["current_page"]}
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

export default Produk;
