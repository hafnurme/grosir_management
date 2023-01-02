import {
  InformationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { Button, Chip, Input } from "@material-tailwind/react";

const TableShow = (props) => {
  const { head, title } = props;

  return (
    <>
      {title && (
        <div className="text-c">
          <div className="mx-2 mb-4 text-2xl font-semibold">
            <h3>{title}</h3>
          </div>
        </div>
      )}
      <table className=" p-4 bg-blue-gray-50/70 rounded-lg shadow w-full text-sm border-gray-200">
        <thead>
          <tr>
            <th className="border-b p-1  whitespace-nowrap font-normal border-gray-300"></th>
            {head &&
              head.map((labelHead) => {
                return (
                  <th
                    className="border-b p-3 whitespace-nowrap font-normal text-c border-gray-300"
                    key={labelHead}
                  >
                    {labelHead}
                  </th>
                );
              })}
            <th className="border-b w-40 whitespace-nowrap font-normal border-gray-300">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-c">
            <td className="border-b p-1 border-r text-center">1</td>
            {head &&
              head.map(() => {
                return (
                  <>
                    <td className="border-b p-3 border-r text-center border-gray-300">
                      {Math.floor(Math.random() * 2000)}
                    </td>
                  </>
                );
              })}
            <td className="border-b border-r p-2 w-40 flex items-center justify-center gap-3 box-border">
              <InformationCircleIcon className="h-7" />
              <PencilSquareIcon className="h-7" />
              <TrashIcon className="h-7" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TableShow;
