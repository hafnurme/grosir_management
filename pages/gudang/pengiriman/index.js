import { Button } from "@material-tailwind/react";
import CardComponents from "../../../components/CardComponents";
import TableShow from "../../../components/TableComponents/TableShow";

const Pengiriman = () => {
  return (
    <>
      <div className="flex gap-5">
        <CardComponents />
        <CardComponents />
        <CardComponents />
      </div>
      <div className="mt-5 text-c">
        <ul className="flex flex-wrap text-center text-gray-500 border-b border-gray-200 ">
          <li className="mr-2">
            <a className="inline-block p-2 bg-amber-400 shadow-md text-white rounded-lg active ">
              Pending
            </a>
          </li>
          <li className="mr-2">
            <a className="inline-block p-2 rounded-lg hover:text-gray-700 hover:bg-gray-300 hover:shadow-lg ">
              Outdated
            </a>
          </li>
          <li className="mr-2">
            <a className="inline-block p-2 rounded-lg hover:text-white hover:bg-green-300 hover:shadow-lg">
              Completed
            </a>
          </li>
        </ul>
      </div>

      <div>
        <TableShow head={["Request Id", "Produk Id", "Amount", "Order Date"]} />
      </div>
    </>
  );
};

export default Pengiriman;
