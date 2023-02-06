import { Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import DeleteModal from "@/components/Modal/DeleteModal";

export default function WarehouseTable({
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
      <div className="flex justify-end items-center p-1 mb-4">
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
                <tr className="bg-white border-b text-c" key={indexp}>
                  <td className="px-6 py-3 w-10 text-center">{indexp + 1}</td>
                  {head &&
                    head.map((elem, i) => {
                      return (
                        <td className="px-6 py-3" key={Math.random() * 100 * i}>
                          {object[elem]}
                        </td>
                      );
                    })}
                  <td className="px-3 py-2 flex gap-3 justify-end items-center">
                    {/* <DetailModal item={object} />
                    <ProductUpdateModal
                      item={object}
                      itemHead={[
                        "product_code",
                        "brand",
                        "name",
                        "category_id",
                        "description",
                        "supplier_id",
                      ]}
                      updateUrl="/api/product/"
                      refreshData={refreshData}
                    />*/}
                    <DeleteModal
                      itemToDelete={object}
                      itemHead={head}
                      deleteUrl="/api/warehouse/"
                      refreshData={refreshData}
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
