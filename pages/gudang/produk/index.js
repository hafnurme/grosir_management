import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Button, Input } from "@material-tailwind/react";

const ProdukList = () => {
  return (
    <>
      <div>
        <div className="flex justify-end">
          <div className="h-min w-96 flex gap-2 mb-5">
            <Input
              color="deep-orange"
              label="Search"
              className="bg-white inline-block"
            />
            <div>
              <Button color="deep-orange">Filter</Button>
            </div>
          </div>
        </div>
        <table class="table p-4 bg-white rounded-lg shadow w-full">
          <thead>
            <tr>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal"></th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal">
                First name
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal">
                Last name
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal">
                Username
              </th>
              <th class="border-b-2  dark:border-dark-5 whitespace-nowrap font-normal"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-c">
              <td class="border-b border-r p-4 dark:border-dark-5">1</td>
              <td class="border-b border-r p-4 dark:border-dark-5">
                Jean Marc
              </td>
              <td class="border-b border-r p-4 dark:border-dark-5">Louis</td>
              <td class="border-b border-r p-4 dark:border-dark-5">Jl987</td>
              <td class="border-b border-r px-4 dark:border-dark-5">
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
            <tr class="text-c">
              <td class="border-b border-r p-4 dark:border-dark-5">1</td>
              <td class="border-b border-r p-4 dark:border-dark-5">
                Jean Marc
              </td>
              <td class="border-b border-r p-4 dark:border-dark-5">Louis</td>
              <td class="border-b border-r p-4 dark:border-dark-5">Jl987</td>
              <td class="border-b border-r px-4 dark:border-dark-5">
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
