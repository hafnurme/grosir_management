import { useEffect, useState } from "react";
import DeleteDialog from "@/components/Modal/DeleteModal";
import UpdateModal from "@/components/Modal/UpdateModal";

const CategoryTable = ({ head, data, refreshData, search }) => {
  const [finalData, setFinalData] = useState();

  useEffect(() => {
    return setFinalData(data);
  }, [data]);

  useEffect(() => {
    if (!data) {
      return;
    }
    if (search) {
      search = search.replace(/[!@#$%^&*\\]/g, "");
    }
    if (search !== null || search !== "") {
      const filteredData = data.filter((elem) => {
        const key = new RegExp("^" + search, "i");
        if (elem.category_name.match(key)) {
          return elem;
        }
      });

      return setFinalData(filteredData);
    } else {
      return refreshData();
    }
  }, [search]);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs uppercase bg-gray-100">
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
            <th scope="col" className="px-6 py-3 w-40"></th>
          </tr>
        </thead>
        <tbody>
          {finalData &&
            finalData.map((object, indexp) => {
              return (
                <tr className="bg-white border-b" key={indexp}>
                  <td className="px-3">{indexp + 1}</td>
                  {head &&
                    head.map((elem, i) => {
                      return (
                        <td className="px-6" key={Math.random() * 100 * i}>
                          {object[elem]}
                        </td>
                      );
                    })}
                  <td className="px-3 sm:py-1 flex gap-3 justify-end items-center">
                    <UpdateModal
                      item={object}
                      itemHead={head}
                      itemIndex="category_id"
                      refreshData={refreshData}
                      updateUrl="/api/category/"
                      col="1"
                    />
                    <DeleteDialog
                      itemToDelete={object}
                      itemIndex="category_id"
                      itemHead={head}
                      refreshData={refreshData}
                      deleteUrl="/api/category/"
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
