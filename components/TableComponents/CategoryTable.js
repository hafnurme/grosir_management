import { Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import DeleteDialog from "@/components/Modal/DeleteModal";
import UpdateModal from "@/components/Modal/UpdateModal";
import AddModal from "@/components/Modal/AddModal";

const CategoryTable = (props) => {
  const { head, title, search, data, refreshData } = props;
  const [finalData, setFinalData] = useState();

  useEffect(() => {
    setFinalData(data);
  }, [data]);

  const inputListener = (input) => {
    const filteredData = data.filter((elem) => {
      const key = new RegExp("^" + input.target.value, "i");
      if (elem.category_name.match(key) || elem.category_type.match(key)) {
        return elem;
      }
    });

    setFinalData(filteredData);
  };
  return (
    <>
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
                  <td className="px-6 py-1 w-10enter">{indexp + 1}</td>
                  {head &&
                    head.map((elem, i) => {
                      return (
                        <td className="px-6 py-1" key={Math.random() * 100 * i}>
                          {object[elem]}
                        </td>
                      );
                    })}
                  <td className="px-3 py-1 flex gap-3 justify-end items-center">
                    <UpdateModal
                      item={object}
                      itemHead={head}
                      itemIndex="category_id"
                      refreshData={refreshData}
                      updateUrl="/api/category/"
                      col="1"
                      size="md"
                    />
                    <DeleteDialog
                      itemToDelete={object}
                      itemIndex="category _id"
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
    </>
  );
};

export default CategoryTable;
