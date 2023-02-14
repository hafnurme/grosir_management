import { useEffect, useState } from "react";
import DeleteDialog from "@/components/Modal/DeleteModal";
import DetailModal from "@/components/Modal/DetailModal";
import UpdateModal from "@/components/Modal/UpdateModal";

const ProductTable = ({ head, data, refreshData, handleSearch }) => {
  const [finalData, setFinalData] = useState();

  useEffect(() => {
    setFinalData(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <>
<<<<<<< HEAD
      <div className="flex justify-between items-center p-1 mb-4">
        {title && (
          <div>
            <div className="mx-2 text-base font-semibold">
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
=======
>>>>>>> f36357c4e3b87905d65644ad86bfe6d1ed4a5a0d
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
