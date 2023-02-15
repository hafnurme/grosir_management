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
        <div className="grid grid-cols-2 gap-4">
          <Input
            required={true}
            color="orange"
            label="Product Code"
            tabIndex="1"
            name="product_code"
          />
          <Input
            required={true}
            color="orange"
            label="Brand"
            name="brand"
            tabIndex="2"
          />
          <Input
            required={true}
            color="orange"
            label="Product Name"
            tabIndex="3"
            name="name"
          />
          <Input
            readOnly
            label="Kategori"
            name="kategori_id"
            color="orange"
            className="w-full"
            defaultValue={category ? category.category_name : ""}
            onClick={handleOpenKategoriModal}
            onKeyDown={(e) => {
              if (e.key !== "Tab") handleOpenKategoriModal();
            }}
            tabIndex="4"
            required={true}
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
            label="Price Recommendation"
            name="price_rec"
            tabIndex="6"
            type="number"
          />
          <Textarea
            color="orange"
            label="Description"
            name="description"
            tabIndex="7"
            className="min-h-[88px]"
            required={true}
          />
          <Input
            required={true}
            color="orange"
            label="Profit Margin"
            name="profit_margin"
            tabIndex="7"
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
            tabIndex="9"
            defaultValue={supplier ? supplier.supplier_name : ""}
            onClick={handleOpenSupplierModal}
            onKeyDown={(e) => {
              if (e.key !== "Tab") handleOpenSupplierModal();
            }}
            required={true}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetailForm;
