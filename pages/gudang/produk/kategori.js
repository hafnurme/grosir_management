import { Button, Card, Input } from "@material-tailwind/react";
import ProdukEdit from "../../../components/TableComponents/TableEdit";

const Kategori = () => {
  return (
    <>
      <Card className="flex-1 h-min bg-white p-5 mb-5">
        <div className="flex gap-3">
          <Input label="Kategory" color="deep-orange" />
          <Button color="deep-orange">Add</Button>
        </div>
      </Card>
      <div>
        <div className="p-5 bg-white rounded-xl">
          <ProdukEdit head={["Code", "Kategory Name"]} title="Kategori" />
        </div>
      </div>
    </>
  );
};

export default Kategori;
