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
          <h1 className="mb-5 text-2xl font-semibold text-gray-700">
            Add Product
          </h1>

          <div className="flex flex-row gap-5">
            <div className="w-[50%] flex gap-8 flex-col">
              <Input
                color="orange"
                label="Product Name"
                tabIndex="1"
                name="name"
              />
              {category && (
                <Select
                  label="Category"
                  color="orange"
                  name="category_id"
                  tabIndex="3"
                >
                  {category.map((elements, index) => {
                    return (
                      <Option
                        key={index}
                        value={`${elements.id}`}
                        onClick={() => setCategoryId(elements.category_id)}
                      >
                        {elements.category_name}
                      </Option>
                    );
                  })}
                </Select>
              )}
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

            <div className="w-[50%] flex flex-col gap-8">
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
              {supplier && (
                <Select
                  label="Supplier"
                  color="orange"
                  name="supplier_id"
                  tabIndex="10"
                  className="z-50"
                >
                  {supplier.map((elements, index) => {
                    return (
                      <Option
                        key={index}
                        value={`${elements.id}`}
                        onClick={() => {
                          setSupplierId(elements.supplier_id);
                        }}
                      >
                        {elements.supplier_name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button
            type="submit"
            className="flex w-40 items-center justify-center"
            color="orange"
          >
            <div className="text-md">Add</div>
            <div className="h-5 w-5 inline-block ml-2">
              <PlusCircleIcon />
            </div>
          </Button>
        </div>
      </form>
    </>
  );
};

export default ProductDetailForm;
