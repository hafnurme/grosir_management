import axios from "axios";
import { useEffect, useState } from "react";
import ProductTable from "@/components/TableComponents/ProductTable";
import { getSession } from "next-auth/react";
import { IconButton } from "@material-tailwind/react";

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

  const Links = () => {
    return (
      <>
        <IconButton
          disabled={product.prev_page_url === null ? true : false}
          onClick={() => {
            paginateNavigate(product.prev_page_url);
          }}
        >
          Prev
        </IconButton>
        {product.current_page != 1 && product.current_page - 1 != 1 && (
          <IconButton
            onClick={() => {
              paginateNavigate(product.first_page_url);
            }}
          >
            1...
          </IconButton>
        )}
        {product.current_page != 1 && (
          <IconButton
            onClick={() => {
              paginateNavigate(
                product.path + `?page=${product.current_page - 1}`
              );
            }}
          >
            {product.current_page - 1}
          </IconButton>
        )}
        <IconButton
          onClick={() => {
            paginateNavigate(product.path + `?page=${product.current_page}`);
          }}
          variant="outlined"
        >
          {product.current_page}
        </IconButton>
        {product.current_page != product.last_page && (
          <>
            <IconButton
              onClick={() => {
                paginateNavigate(
                  product.path + `?page=${product.current_page + 1}`
                );
              }}
            >
              {product.current_page + 1}
            </IconButton>
          </>
        )}
        {product.current_page != product.last_page &&
          product.current_page + 1 != product.last_page && (
            <IconButton
              onClick={() => {
                paginateNavigate(product.last_page_url);
              }}
            >
              ...{product.last_page}
            </IconButton>
          )}
        <IconButton
          disabled={product.next_page_url === null ? true : false}
          onClick={() => {
            paginateNavigate(product.next_page_url);
          }}
        >
          next
        </IconButton>
      </>
    );
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
          data={product.data}
          refreshData={fetchProduct}
        />
      )}
      {product && (
        <div className="mt-4 flex gap-1">
          <Links />
        </div>
      )}
    </div>
  );
};

export default Produk;
