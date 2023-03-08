import { useEffect, useState } from "react";
import DetailModal from "../Modal/DetailModal";

export default function OrderTable({ head, title, search, data, refreshData }) {
  const [finalData, setFinalData] = useState();

  useEffect(() => {
    setFinalData(data);
  }, [data]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className=" w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-c uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3"></th>
            {head &&
              head.map((e, i) => {
                return (
                  <th key={i} className="px-6 py-3">
                    {e}
                  </th>
                );
              })}
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {finalData &&
            finalData.map((object, index) => {
              return (
                <tr className="bg-white border-b text-c" key={index}>
                  <td className="px-6 py-3 w-10 text-center">{index + 1}</td>
                  {head &&
                    head.map((elem, i) => {
                      return (
                        <td className="px-6 py-3" key={Math.random() * 100 * i}>
                          {object[elem]}
                        </td>
                      );
                    })}
                  <td className="px-3 py-2 flex gap-3 justify-end items-center">
                    <DetailModal
                      item={object}
                      exception={["product_order_id", "supplier_id"]}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
