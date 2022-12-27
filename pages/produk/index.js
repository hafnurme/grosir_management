import {
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

const ProdukList = () => {
  return (
    <>
      <div>
        <h1 className="mb-5 text-2xl font-semibold text-gray-700">
          Produk List
        </h1>
      </div>
      <div className="mt-8">
        <table class="table p-4 bg-white rounded-lg shadow w-full">
          <thead>
            <tr>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-700"></th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-700">
                First name
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-700">
                Last name
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-700">
                Username
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-gray-700">
              <td class="border-b-2 p-4 dark:border-dark-5">1</td>
              <td class="border-b-2 p-4 dark:border-dark-5">Jean Marc</td>
              <td class="border-b-2 p-4 dark:border-dark-5">Louis</td>
              <td class="border-b-2 p-4 dark:border-dark-5">Jl987</td>
              <td class="border-b-2 px-4 dark:border-dark-5">
                <div className="flex justify-center gap-5">
                  <div className="w-7 p-1 text-blue-400 border rounded">
                    <PencilSquareIcon />
                  </div>
                  <div className="w-7 p-1 text-red-400 border rounded">
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
