import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

const ProductDetailForm = () => {
  return (
    <>
      <h1 className="mb-5 text-2xl font-semibold text-gray-700">
        Product Detail
      </h1>

      <div className="flex flex-row gap-5">
        <div className="w-[50%] flex gap-8 flex-col">
          <Input color="deep-orange" label="Name" tabIndex="1" />
          <Select label="Category" color="deep-orange" tabIndex="3">
            <Option>Consumables</Option>
            <Option>Non Consumables</Option>
          </Select>
          <Input color="deep-orange" label="Buy Price" tabIndex="5" />
          <Input color="deep-orange" label="Profit Margin" tabIndex="7" />
          <Textarea color="deep-orange" label="Description" tabIndex="9" />
        </div>

        <div className="w-[50%] flex flex-col gap-8">
          <Input color="deep-orange" label="Product Code" tabIndex="2" />
          <Input color="deep-orange" label="Brand" tabIndex="4" />
          <Input
            color="deep-orange"
            label="Price Recommendation"
            tabIndex="6"
          />
          <Input color="deep-orange" label="Property" tabIndex="8" />
          <Select label="Supplier" color="deep-orange" tabIndex="10">
            <Option>PT Maju Mundur</Option>
            <Option>CV Elang Merah</Option>
          </Select>
        </div>
      </div>
    </>
  );
};

export default ProductDetailForm;
