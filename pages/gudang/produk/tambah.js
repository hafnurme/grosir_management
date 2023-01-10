import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Card } from "@material-tailwind/react";
import ProductDetailForm from "../../../components/FormComponents/ProductDetailForm";
import WarehouseDetailForm from "../../../components/FormComponents/WarehouseDetailForm";
import TableShow from "../../../components/TableComponents/TableShow";

const Tambah = () => {
  return (
    <>
      <div>
        <div className="flex">
          <Card className="flex-1 h-min bg-white p-5">
            <div className="mb-5">
              <ProductDetailForm />
            </div>
            <hr className="mt-5 mb-7" />
            <WarehouseDetailForm />
            <div className="flex justify-end mt-5">
              <Button
                className="flex w-40 items-center justify-center"
                color="deep-orange"
              >
                <div className="text-md">Add</div>
                <div className="h-5 w-5 inline-block ml-2">
                  <PlusCircleIcon />
                </div>
              </Button>
            </div>
          </Card>
        </div>
        <Card className="overflow-hidden mt-5 p-5">
          <h1 className="mb-5 text-2xl font-semibold text-gray-700">
            Simpan Produk
          </h1>
          <TableShow
            head={[
              "Name",
              "Product Code",
              "Category",
              "Brand",
              "Buy Prince",
              "Buy Rec",
              "Profit",
              "Property",
              "Supplier",
            ]}
          />
          <div className=" mt-5 flex justify-end">
            <Button color="deep-orange">Save</Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Tambah;
