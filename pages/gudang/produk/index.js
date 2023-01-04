import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import ProdukEdit from "../../../components/TableComponents/TableEdit";
const ProdukList = () => {
  return (
    <>
      <div>
        <div className="p-5 bg-white rounded-xl">
          <ProdukEdit
            head={["Code", "Name", "Brand", "Supplier", "Stock"]}
            title="Product List"
          />
        </div>
      </div>
    </>
  );
};

export default ProdukList;
