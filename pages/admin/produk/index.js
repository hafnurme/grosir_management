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
  const [size, setSize] = useState();

  const fetchProduct = async (page, link) => {
    const producttemp = await axios.get("/api/product").then((res) => {
      return res.data;
    });

    setProduct(producttemp);
  };

  useEffect(() => {
    fetchProduct();
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
                <div className="w-52">
                  <Input
                    label="Search"
                    color="orange"
                    variant="outlined"
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                  />
                </div>
                <IconButton
                  size={size}
                  className="w-20"
                  color="orange"
                  type="submit"
                >
                  <MagnifyingGlassIcon
                    className={size == "md" ? "h-6" : "h-4"}
                  />
                </IconButton>
              </form>
              <ProdukAddModal size={size} refreshData={fetchProduct} />
            </div>
          </div>

          <div className="overflow-x-scroll">
            <ProductTable
              head={["product_code", "name", "brand", "category_id"]}
              title="Product List"
              search={true}
              data={product.data}
              refreshData={fetchProduct}
              current_page={product["current_page"]}
            />
          </div>
          <div className="flex justify-end px-2">
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
