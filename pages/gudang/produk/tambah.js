import { PlusCircleIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import TableShow from "../../../components/TableComponents/TableShow";

const Tambah = () => {
  return (
    <>
      <div>
        {/* <h1 className="mb-5 text-2xl font-semibold text-gray-700">
          Tambah Produk
        </h1> */}
        <div className="flex">
          <Card className="flex-1 h-min bg-white p-5">
            <div className="flex flex-row gap-5">
              <div className="w-[50%] flex gap-8 flex-col">
                <Input color="deep-orange" label="Name" tabIndex="1" />
                <Select label="Category" color="deep-orange" tabIndex="3">
                  <Option>Consumables</Option>
                  <Option>Non Consumables</Option>
                </Select>
                <Input color="deep-orange" label="Buy Price" tabIndex="5" />
                <Input color="deep-orange" label="Profit Margin" tabIndex="7" />
                <Textarea
                  color="deep-orange"
                  label="Description"
                  tabIndex="9"
                />
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
                <div className="flex justify-end">
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
              </div>
            </div>
          </Card>
        </div>
        <Card className="overflow-hidden mt-5 p-5">
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
