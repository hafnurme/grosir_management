import { PlusCircleIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import SupplierChoseModal from "../Modal/Produk/SupplierChose";

const ProductDetailForm = ({ category, supplier }) => {
  const [categoryId, setCategoryId] = useState();
  const [supplierId, setSupplierId] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const dataTemp = {};

    formData.forEach((value, key) => {
      dataTemp[key] = value;
    });

    dataTemp["category_id"] = categoryId;
    dataTemp["supplier_id"] = supplierId;

    await axios.post("/api/product", { data: dataTemp }).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <div className="flex flex-row gap-4">
            <div className="w-[50%] flex gap-4 flex-col">
              <Input
                color="orange"
                label="Product Name"
                tabIndex="1"
                name="name"
              />
              <Input
                color="orange"
                label="Buy Price"
                name="buy_price"
                tabIndex="5"
                type="number"
              />
              <Input
                color="orange"
                label="Profit Margin"
                name="profit_margin"
                tabIndex="7"
                type="number"
              />
              <Textarea
                color="orange"
                label="Description"
                name="description"
                tabIndex="9"
              />
            </div>

            <div className="w-[50%] flex flex-col gap-4">
              <Input
                color="orange"
                label="Product Code"
                tabIndex="2"
                name="product_code"
              />
              <Input color="orange" label="Brand" name="brand" tabIndex="4" />
              <Input
                color="orange"
                label="Price Recommendation"
                name="price_rec"
                tabIndex="6"
                type="number"
              />
              <Input
                color="orange"
                label="Price Recommendation From Supplier"
                name="price_rec_from_sup"
                tabIndex="5"
                type="number"
              />
              <Input
                color="orange"
                label="Property"
                tabIndex="8"
                name="property"
              />
            </div>
          </div>
        </div>
      </form>
      <SupplierChoseModal />
    </>
  );
};

export default ProductDetailForm;
