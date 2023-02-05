import {
  InformationCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import DeleteDialog from "../Modal/DeleteModal";
import DetailModal from "../Modal/DetailModal";
import UpdateModal from "../Modal/UpdateModal";

export default function BranchTable({
  head,
  title,
  search,
  data,
  refreshData,
}) {
  const [finalData, setFinalData] = useState();

  useEffect(() => {
    setFinalData(data);
  }, [data]);

  const inputListener = (input) => {
    const filteredData = data.filter((e) => {
      const key = new RegExp(input.target.value, "i");
      if (e.branch_name.match(key) || e.leader_name.match(key)) {
        return e;
      }
    });
    setFinalData(filteredData);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 p-1">
        {title && (
          <div className="text-c">
            <div className="mx-2 text-2xl font-semibold">
              <h3>{title}</h3>
            </div>
          </div>
        )}
        {search && (
          <div className="flex">
            <Input
              label="Search"
              color="deep-orange"
              onChange={inputListener}
            />
          </div>
        )}
      </div>
      <table className="w-full text-sm text-left text-gray-700">
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
                    <DetailModal item={object} />
                    <UpdateModal
                      item={object}
                      itemHead={[
                        "branch_name",
                        "leader_name",
                        "contact",
                        "address",
                      ]}
                      updateUrl="/api/branch/"
                      refreshData={refreshData}
                      itemIndex="branch_id"
                    />
                    <DeleteDialog
                      itemToDelete={object}
                      itemHead={head}
                      refreshData={refreshData}
                      itemIndex="branch_id"
                      deleteUrl="/api/branch/"
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
