import {
  Card,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";

const Tambah = () => {
  return (
    <>
      <div>
        <h1 className="mb-5 text-2xl font-semibold text-gray-700">
          Tambah Produk
        </h1>
        <div className="flex">
          <Card className="flex-1 h-min bg-white p-5 flex flex-row gap-5 flex-nowrap">
            <div className="w-[50%] flex gap-5 flex-col">
              <Input color="deep-orange" label="Name" />
              <Select label="Category" color="deep-orange">
                <Option>Consumables</Option>
                <Option>Non Consumables</Option>
              </Select>
              <Input color="deep-orange" label="Buy Price" />

              <Input color="deep-orange" label="Profit Margin" />
              <Textarea color="deep-orange" label="Description" />
            </div>
            <div className="w-[50%] flex flex-col gap-5">
              <Input color="deep-orange" label="Product Code" />
              <Input color="deep-orange" label="Brand" />
              <Input color="deep-orange" label="Price Recommendation" />
              <Input color="deep-orange" label="Property" />
              <Select label="Supplier" color="deep-orange">
                <Option>PT Maju Mundur</Option>
                <Option>CV Elang Merah</Option>
              </Select>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Tambah;
