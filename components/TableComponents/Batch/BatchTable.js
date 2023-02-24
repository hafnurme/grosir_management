import { useEffect, useState } from "react";
import DeleteModal from "@/components/Modal/DeleteModal";
import DetailModal from "@/components/Modal/DetailModal";
import { useSession } from "next-auth/react";

export default function BatchTable({ head, data, refreshData }) {
  const [finalData, setFinalData] = useState();
  const [permission, setPermission] = useState();

  const { data: session, status } = useSession();

  useEffect(() => {
    setFinalData(data);
  }, [data]);

  useEffect(() => {
    if (session) {
      console.log(session);
      setPermission(session.permission);
    }
  }, [status]);

  const inputListener = (input) => {
    const filteredData = data.filter((elem) => {
      const key = new RegExp(input.target.value, "i");
      if (elem.location.match(key)) {
        return elem;
      }
    });

    setFinalData(filteredData);
  };
  return (
    <>
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-c uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3"></th>
            {head &&
              head.map((elem, i) => {
                return (
                  <th key={i} scope="col" className="px-6 py-3">
                    {elem}
                  </th>
                );
              })}
            {permission && permission.includes("edit-gudang") && (
              <th scope="col" className="px-6 py-3"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {finalData &&
            finalData.map((object, indexp) => {
              return (
                <tr className="bg-white border-b" key={indexp}>
                  <td className="px-2 w-8 text-center">{indexp + 1}</td>
                  {head &&
                    head.map((elem, i) => {
                      if (elem === "warehouse_id") {
                        return (
                          <td className="sm:py-1" key={Math.random() * 100 * i}>
                            <span className="inline-block whitespace-nowrap">
                              {object[elem]}
                            </span>
                          </td>
                        );
                      }
                      return (
                        <td
                          className="px-6 sm:py-1"
                          key={Math.random() * 100 * i}
                        >
                          {object[elem]}
                        </td>
                      );
                    })}
                  {permission && !permission.includes("admin") && (
                    <td className="px-3 py-1 flex gap-3 sm:justify-end  items-center">
                      <DetailModal
                        exception={["warehouse_id", "batch_id", "total"]}
                        item={object}
                        size="md"
                        col="1"
                      />
                      {permission.includes("hapus-gudang") && (
                        <DeleteModal
                          itemToDelete={object}
                          itemHead={head}
                          deleteUrl="/api/warehouse/"
                          refreshData={refreshData}
                        />
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
