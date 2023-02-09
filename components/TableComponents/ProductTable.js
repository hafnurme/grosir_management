import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import DeleteDialog from "@/components/Modal/DeleteModal";
import DetailModal from "@/components/Modal/DetailModal";
import UpdateModal from "@/components/Modal/UpdateModal";

const ProductTable = ({ head, title, search, data, refreshData }) => {
  const [finalData, setFinalData] = useState();

  useEffect(() => {
    setFinalData(data);
  }, [data]);

  const inputListener = (input) => {
    const filteredData = data.filter((elem) => {
      const key = new RegExp(input.target.value, "i");
      if (
        elem.product_code.match(key) ||
        elem.name.match(key) ||
        elem.brand.match(key)
      ) {
        return elem;
      }
    });

    setFinalData(filteredData);
  };

  return (
    <>
      <div className="flex justify-between items-center p-1 mb-4">
        {title && (
          <div>
            <div className="mx-2 text-2xl font-semibold">
              <h3>{title}</h3>
            </div>
          </div>
        )}
        {search && (
          <div className="flex">
            <Input
              label="Search"
              color="orange"
              variant="standard"
              onChange={inputListener}
            />
          </div>
        )}
      </div>
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-c uppercase bg-gray-100">
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
                <tr className="bg-white border-b text-c" key={indexp}>
                  {head &&
                    head.map((elem, i) => {
                      return (
                        <td
                          className="px-6 py-3 truncate"
                          key={Math.random() * 100 * i}
                        >
                          {object[elem]}
                        </td>
                      );
                    })}
                  <td className="px-3 py-2 flex gap-3 justify-end items-center">
                    <DetailModal item={object} />
                    <UpdateModal
                      item={object}
                      itemHead={[
                        "product_code",
                        "brand",
                        "name",
                        "category_id",
                        "description",
                      ]}
                      updateUrl="/api/product/"
                      refreshData={refreshData}
                    />
                    <DeleteDialog
                      itemToDelete={object}
                      itemHead={head}
                      deleteUrl="/api/product/"
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
};

export default ProductTable;
