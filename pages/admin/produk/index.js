import axios from "axios";
import { useEffect, useState } from "react";
import ProductTable from "@/components/TableComponents/ProductTable";

const Produk = () => {
  const [product, setProduct] = useState();

  const fetchProduct = async () => {
    const producttemp = await axios.get("/api/product").then((res) => {
      return res.data;
    });

    setProduct(producttemp);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      {product && (
        <ProductTable
          head={["product_code", "name", "brand", "category_id"]}
          title="Product List"
          search={true}
          data={product[1]}
          refreshData={fetchProduct}
        />
      )}
    </div>
  );
};

export default Produk;
