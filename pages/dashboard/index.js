import { Button, Input } from "@material-tailwind/react";

const Dashboard = () => {
  return (
    <>
      <div>
        <h1 className="mb-5 text-2xl font-semibold text-gray-800">
          Dashboard Overview
        </h1>
      </div>
      <div className="flex gap-5 mb-8">
        <div className="w-60 h-32 rounded-lg bg-white shadow"></div>
        <div className="w-60 h-32 rounded-lg bg-white shadow"></div>
        <div className="w-60 h-32 rounded-lg bg-white shadow"></div>
      </div>
      <div className="mt-8">
        <table class="table p-4 bg-white rounded-lg shadow w-full">
          <thead>
            <tr>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                #
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                First name
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                Last name
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                Username
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-gray-700">
              <td class="border-b-2 p-4 dark:border-dark-5">1</td>
              <td class="border-b-2 p-4 dark:border-dark-5">Jean Marc</td>
              <td class="border-b-2 p-4 dark:border-dark-5">Louis</td>
              <td class="border-b-2 p-4 dark:border-dark-5">Jl987</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
