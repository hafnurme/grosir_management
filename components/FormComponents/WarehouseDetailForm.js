import { Input } from "@material-tailwind/react";

const WarehouseDetailForm = () => {
  return (
    <>
      <div>
        <h1 className="mb-5 text-2xl font-semibold text-gray-700">
          Warehouse Detail
        </h1>
        <div className="flex flex-row gap-5">
          <div className="w-[50%] flex gap-8 flex-col">
            <Input color="deep-orange" label="Warehouse ID" />
            <Input color="deep-orange" label="Entry Date" />
            <Input color="deep-orange" label="Batch ID" />
          </div>
          <div className="w-[50%] flex gap-8 flex-col">
            <Input color="deep-orange" label="Location" />
            <Input color="deep-orange" label="Expire" />
          </div>
        </div>
      </div>
    </>
  );
};

export default WarehouseDetailForm;
