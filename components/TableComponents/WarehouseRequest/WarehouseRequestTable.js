import UpdateModal from "../../Modal/UpdateModal";
import { useEffect, useState } from "react";
import AcceptRequest from "./AcceptRequest";
import DecelineRequest from "./DecelineRequest";
import ProcessRequest from "./ProccessRequest";

const WarehouseRequestTable = ({
  head,
  data,
  refreshData,
  permission,
  label,
}) => {
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
          {permission && !permission.includes("admin") && (
            <th scope="col" className="px-6 py-3"></th>
          )}
          {permission && permission.includes("admin") && (
            <th scope="col" className=" py-3"></th>
          )}
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
                {permission &&
                  !permission.includes("admin") &&
                  label == "transferred" && (
                    <td className="px-3 py-1 flex gap-3 justify-end items-center"></td>
                  )}
                {permission &&
                  permission.includes("admin") &&
                  label == "sent" && (
                    <td className="px-3 py-1 flex gap-3 justify-end items-center">
                      <AcceptRequest
                        id={object["product_order_requests_id"]}
                        url="/api/warehouse/request/accept"
                        refreshData={refreshData}
                      />
                      <DecelineRequest
                        id={object["product_order_requests_id"]}
                        url="/api/warehouse/request/deceline"
                        refreshData={refreshData}
                      />
                    </td>
                  )}
                {permission &&
                  permission.includes("admin") &&
                  label == "accepted" && (
                    <td className="px-3 py-1 flex gap-3 justify-end items-center">
                      <ProcessRequest
                        id={object["product_code"]}
                        refreshData={refreshData}
                        orderObj={object}
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

export default WarehouseRequestTable;
