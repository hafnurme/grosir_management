import { useEffect, useState } from "react";
import CardComponents from "../../../components/CardComponents";
import TableShow from "../../../components/TableComponents/TableShow";
const Dashboard = () => {
  const [expTableHead, setExpTableHead] = useState();
  const [outOfStockTableHead, setOutOfStockTableHead] = useState();

  useEffect(() => {
    setExpTableHead(["Name", "Produk Code", "Stock", "Exp Date"]);
    setOutOfStockTableHead([
      "Name",
      "Produk Code",
      "Brand",
      "Category",
      "Stock",
    ]);
    return () => {};
  }, []);

  return (
    <>
      <div className="flex gap-5 mb-5">
        <CardComponents>
          <div className="text-center h-full w-full flex justify-center flex-col gap-3">
            <h1 className="text-5xl">78</h1>
            <h3>Total Product</h3>
          </div>
        </CardComponents>
        <CardComponents>
          <div className="text-center h-full w-full flex justify-center flex-col gap-3">
            <h1 className="text-5xl">18</h1>
            <h3>Exp Product</h3>
          </div>
        </CardComponents>
        <CardComponents>
          <div className="text-center h-full w-full flex justify-center flex-col gap-3">
            <h1 className="text-5xl">8</h1>
            <h3>Low Stock</h3>
          </div>
        </CardComponents>
      </div>
      <div className="my-5 p-5 bg-white rounded-md shadow-md">
        <TableShow head={expTableHead} title="Product expired" />
      </div>
      <div className="my-5 p-5 bg-white rounded-md shadow-md">
        <TableShow head={outOfStockTableHead} title="Low Stock" />
      </div>
    </>
  );
};

export default Dashboard;
