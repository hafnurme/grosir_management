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
import PilihKategoriModal from "../Modal/Produk/PilihKategoriModal";
import PilihSupplierModal from "../Modal/Produk/PilihSupplierModal";

const ProductDetailForm = ({
  supplier,
  category,
  handleOpenKategoriModal,
  handleOpenSupplierModal,
}) => {
  return (
    <>
      <div className="mb-5">
        <div className="flex flex-row gap-4">
          <div className="w-1/2 flex gap-4 flex-col">
            <Input
              required={true}
              color="orange"
              label="Product Name"
              tabIndex="1"
              name="name"
            />
            <Input
              required={true}
              color="orange"
              label="Buy Price"
              name="buy_price"
              tabIndex="5"
              type="number"
            />
            <Input
              required={true}
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
              className="min-h-[88px]"
            />
            <Input
              readOnly
              label="Kategori"
              name="kategori_id"
              color="orange"
              className="w-full"
              defaultValue={category ? category.category_name : ""}
              onClick={handleOpenKategoriModal}
              required
            />
          </div>

          <div className="w-[50%] flex flex-col gap-4">
            <Input
              required={true}
              color="orange"
              label="Product Code"
              tabIndex="2"
              name="product_code"
            />
            <Input
              required={true}
              color="orange"
              label="Brand"
              name="brand"
              tabIndex="4"
            />
            <Input
              required={true}
              color="orange"
              label="Price Recommendation"
              name="price_rec"
              tabIndex="6"
              type="number"
            />
            <Input
              required={true}
              color="orange"
              label="Price Recommendation From Supplier"
              name="price_rec_from_sup"
              tabIndex="5"
              type="number"
            />
            <Input
              required={true}
              color="orange"
              label="Property"
              tabIndex="8"
              name="property"
            />
            <Input
              readOnly
              label="Supplier"
              color="orange"
              className="w-full"
              name="supplier_id"
              defaultValue={supplier ? supplier.supplier_name : ""}
              onClick={handleOpenSupplierModal}
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailForm;
