import UpdateModal from "../../Modal/UpdateModal";
import { useEffect, useState } from "react";
import BranchProccessRequest from "./BranchProccessRequest";
import AcceptRequest from "../WarehouseRequest/AcceptRequest";
import DecelineRequest from "../WarehouseRequest/DecelineRequest";

const BranchRequestTable = ({ head, data, refreshData, permission, label }) => {
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
                      <td
                        className="px-6 py-1 text-base"
                        key={Math.random() * 100 * i}
                      >
                        {object[elem]}
                      </td>
                    );
                  })}
                {label == "sent" && (
                  <td className="px-3 py-1 flex gap-3 justify-end items-center">
                    <AcceptRequest
                      id={object["request_id"]}
                      url="/api/branch/request/accept"
                      refreshData={refreshData}
                    />
                    <DecelineRequest
                      id={object["request_id"]}
                      url="/api/branch/request/deceline"
                      refreshData={refreshData}
                    />
                  </td>
                )}
                {label == "accepted" && (
                  <td className="px-3 py-1 flex gap-3 justify-end items-center">
                    <BranchProccessRequest
                      id={object["product_code"]}
                      refreshData={refreshData}
                      requestObj={object}
                    />
                  </td>
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default BranchRequestTable;
