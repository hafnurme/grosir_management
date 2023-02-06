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
      <div className="flex justify-between items-center mb-4 p-1">
        {title && (
          <div className="text-c">
            <div className="mx-2 text-2xl font-semibold">
              <h3>{title}</h3>
            </div>
          </div>
        )}
        <div className="flex gap-4">
          {search && (
            <div className="flex items-center">
              <Input
                label="Search"
                color="orange"
                variant="standard"
                onChange={inputListener}
              />
            </div>
          )}
          <AddModal
            refreshData={refreshData}
            addUrl="/api/category"
            itemHead={["category_name", "category_type"]}
            fieldType={["text", "text"]}
            label="Tambah Kategori"
          />
        </div>
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
            <th scope="col" className="px-6 py-3 w-40"></th>
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
                    <UpdateModal
                      item={object}
                      itemHead={head}
                      itemIndex="category_id"
                      refreshData={refreshData}
                      updateUrl="/api/category/"
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
