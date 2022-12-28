import { Button, Input } from "@material-tailwind/react";
import CardComponents from "../../../components/CardComponents";
import TableShow from "../../../components/TableComponents/TableShow";
const Dashboard = () => {
  const expTableHead = ["Name", "Produk Code", "Stock", "Exp Date"];
  const outOfStockTableHead = [
    "Name",
    "Produk Code",
    "Brand",
    "Category",
    "Stock",
  ];
  return (
    <>
      <div className="flex gap-5 mb-5">
        <CardComponents />
        <CardComponents />
        <CardComponents />
      </div>
      <div className="my-5">
        <TableShow head={expTableHead} title="Produk expired" />
      </div>
      <div className="my-5">
        <TableShow head={outOfStockTableHead} title="Low Stock" />
      </div>
    </>
  );
};

export default Dashboard;
