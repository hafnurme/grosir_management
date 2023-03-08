import { useEffect, useState } from "react";
import DeleteDialog from "@/components/Modal/DeleteModal";
import DetailModal from "@/components/Modal/DetailModal";
import ProductUpdateModal from "../Modal/Produk/ProdukUpdateModal";

const ProductTable = ({ head, data, refreshData, current_page }) => {
  const [finalData, setFinalData] = useState();

  useEffect(() => {
    setFinalData(data);
  }, [data]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-[12px] sm:text-xs uppercase bg-gray-100">
          <tr>
            <th></th>
            {head &&
              head.map((elem, i) => {
                return (
                  <th key={i} scope="col" className="px-3 py-3">
                    {elem}
                  </th>
                );
              })}
            <th scope="col" className="px-3 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {finalData &&
            finalData.map((object, indexp) => {
              return (
                <tr
                  className="bg-white border-b text-[11px] sm:text-sm"
                  key={indexp}
                >
                  <td className="px-3">
                    {indexp + 1 + current_page * 10 - 10}
                  </td>
                  {head &&
                    head.map((elem, i) => {
                      return (
                        <td
                          className="px-3 py-3  whitespace-nowrap lg:whitespace-normal"
                          key={Math.random() * 100 * i}
                        >
                          {object[elem]}
                        </td>
                      );
                    })}
                  <td className="px-3 py-3 sm:py-1 flex gap-3 justify-end items-center">
                    <DetailModal
                      exception={["id", "supplier_id"]}
                      item={object}
                    />
                    <ProductUpdateModal
                      item={object}
                      itemHead={[
                        "product_code",
                        "brand",
                        "name",
                        "description",
                      ]}
                      updateUrl="/api/product/"
                      refreshData={refreshData}
                    />
                    <DeleteDialog
                      itemToDelete={object}
                      itemHead={head}
                      deleteUrl="/api/producat/"
                      refreshData={refreshData}
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

export default ProductTable;
