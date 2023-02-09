import axios from "axios";
import { useEffect, useState } from "react";
import ProductTable from "@/components/TableComponents/ProductTable";
import { getSession } from "next-auth/react";
import Paginate from "@/components/paginate";
import ProdukAddModal from "@/components/Modal/Produk/ProdukAddModal";

const Produk = () => {
  const [product, setProduct] = useState();

  const fetchProduct = async (page, link) => {
    const producttemp = await axios.get("/api/product").then((res) => {
      return res.data;
    });

    setProduct(producttemp);
  };

  const paginateNavigate = async (link) => {
    const accessToken = await getSession().then((token) => token.accessToken);

    const productTemp = await axios
      .get(link, {
        headers: {
          token: accessToken,
        },
      })
      .then((res) => {
        return res.data;
      });

    return setProduct(productTemp);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      {product && (
        <>
          <div className="flex justify-between mb-4 sticky top-0 z-10">
            <ProdukAddModal />
            <Paginate
              paginateNavigate={paginateNavigate}
              page={product}
              refreshData={fetchProduct}
            />
          </div>

          <ProductTable
            head={["product_code", "name", "brand", "category_id"]}
            title="Product List"
            search={true}
            data={product.data}
            refreshData={fetchProduct}
          />
        </>
      )}
    </div>
  );
};

export default Produk;
