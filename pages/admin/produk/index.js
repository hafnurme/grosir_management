import axios from "axios";
import { useEffect, useState } from "react";
import ProductTable from "@/components/TableComponents/ProductTable";
import Paginate from "@/components/paginate";
import ProdukAddModal from "@/components/Modal/Produk/ProdukAddModal";
import { IconButton, Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Produk = () => {
  const [product, setProduct] = useState();
  const [searchQuery, setSearchQuery] = useState();

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
    if (search || search !== "") {
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
          <div className="flex justify-between items-center py-4 px-2">
            <div>
              <div className="mx-2 text-2xl font-semibold">
                <h3>Produk</h3>
              </div>
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
                <IconButton type="submit" className="w-20" color="orange">
                  <MagnifyingGlassIcon className="h-6" />
                </IconButton>
              </form>
              <ProdukAddModal />
            </div>
          </div>

          <div>
            <ProductTable
              head={["product_code", "name", "brand", "category_id"]}
              title="Product List"
              search={true}
              data={product.data}
              refreshData={fetchProduct}
            />
          </div>
          <div className="flex justify-end px-2 py-4">
            <Paginate
              setData={setProduct}
              page={product}
              refreshData={fetchProduct}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Produk;
