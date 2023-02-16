import DetailModal from "../Modal/DetailModal";
import UpdateModal from "../Modal/UpdateModal";
import DeleteModal from "../Modal/DeleteModal";
import { useEffect, useState } from "react";

const WarehouseRequestTable = ({ head, data, refreshData }) => {
  const [finalData, setFinalData] = useState();

  useEffect(() => {
    setFinalData(data);
  }, [data]);
  return (
    <table className="w-full text-sm text-left text-gray-700">
      <thead className="text-xs uppercase bg-gray-100">
        <tr>
          {head &&
            head.map((elem, i) => {
              return (
                <th key={i} scope="col" className="px-6 py-3">
                  {elem}
                </th>
              );
            })}
          <th scope="col" className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {finalData &&
          finalData.map((object, indexp) => {
            return (
              <tr className="bg-white border-b" key={indexp}>
                {head &&
                  head.map((elem, i) => {
                    return (
                      <td className="px-6 py-1" key={Math.random() * 100 * i}>
                        {object[elem]}
                      </td>
                    );
                  })}
                <td className="px-3 py-1 flex gap-3 justify-end items-center">
                  <DetailModal item={object} />
                  <UpdateModal
                    item={object}
                    itemHead={["request_id", "product_code", "quantity"]}
                    updateUrl="/api/warehouse_request/"
                    refreshData={refreshData}
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default WarehouseRequestTable;
