import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";

const ProductDetailForm = ({ category, supplier }) => {
  return (
    <>
      <h1 className="mb-5 text-2xl font-semibold text-gray-700">Add Product</h1>

      <div className="flex flex-row gap-5">
        <div className="w-[50%] flex gap-8 flex-col">
          <Input
            color="orange"
            label="Product Name"
            tabIndex="1"
            name="product_name"
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
                  <Option key={index} value={`${elements.id}`}>
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
          />
          <Input
            color="orange"
            label="Profit Margin"
            name="profit_margin"
            tabIndex="7"
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
            name="price_req"
            tabIndex="6"
          />
          <Input
            color="orange"
            label="Property"
            tabIndex="8"
            name="price_req"
          />
          {supplier && (
            <Select
              label="Supplier"
              color="orange"
              name="supplier_id"
              tabIndex="10"
            >
              {supplier.map((elements, index) => {
                return (
                  <Option key={index} value={`${elements.id}`}>
                    {elements.supplier_name}
                  </Option>
                );
              })}
            </Select>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailForm;
