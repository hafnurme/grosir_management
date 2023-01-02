import ProdukEdit from "../../../components/TableComponents/TableEdit";
const ProdukList = () => {
  return (
    <>
      <div>
        <div className="p-5 bg-white rounded-xl">
          <ProdukEdit
            head={["Code", "Name", "Brand", "Supplier", "Stock"]}
            title="Product List"
          />
        </div>
        <table className="table p-4 bg-white rounded-lg shadow w-full">
          <thead>
            <tr>
              <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal"></th>
              <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal">
                First name
              </th>
              <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal">
                Last name
              </th>
              <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal">
                Username
              </th>
              <th className="border-b-2  dark:border-dark-5 whitespace-nowrap font-normal"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-c">
              <td className="border-b border-r p-4 dark:border-dark-5">1</td>
              <td className="border-b border-r p-4 dark:border-dark-5">
                Jean Marc
              </td>
              <td className="border-b border-r p-4 dark:border-dark-5">
                Louis
              </td>
              <td className="border-b border-r p-4 dark:border-dark-5">
                Jl987
              </td>
              <td className="border-b border-r px-4 dark:border-dark-5">
                <div className="flex justify-center gap-3">
                  <div className="w-8 p-1 text-white bg-blue-400 rounded">
                    <PencilSquareIcon />
                  </div>
                  <div className="w-8 p-1 text-white bg-red-400 rounded">
                    <TrashIcon />
                  </div>
                </div>
              </td>
            </tr>
            <tr className="text-c">
              <td className="border-b border-r p-4 dark:border-dark-5">1</td>
              <td className="border-b border-r p-4 dark:border-dark-5">
                Jean Marc
              </td>
              <td className="border-b border-r p-4 dark:border-dark-5">
                Louis
              </td>
              <td className="border-b border-r p-4 dark:border-dark-5">
                Jl987
              </td>
              <td className="border-b border-r px-4 dark:border-dark-5">
                <div className="flex justify-center gap-3">
                  <div className="w-8 p-1 text-white bg-blue-400 rounded">
                    <PencilSquareIcon />
                  </div>
                  <div className="w-8 p-1 text-white bg-red-400 rounded">
                    <TrashIcon />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProdukList;
