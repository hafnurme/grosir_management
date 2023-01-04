import { Chip } from "@material-tailwind/react";

const TableShow = (props) => {
  const { head, title, status } = props;

  return (
    <>
      {title && (
        <div className="text-c">
          <div className="mx-2 mb-4 text-md">
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
            {status && (
              <th className="border-b p-4 whitespace-nowrap font-normal text-c border-gray-300">
                Status
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr className="text-c">
            <td className="border-b p-1 border-r text-center">1</td>
            {head &&
              head.map((labelHead) => {
                return (
                  <>
                    <td
                      className="border-b p-3 border-r text-center border-gray-300"
                      key={labelHead}
                    >
                      {Math.floor(Math.random() * 2000)}
                    </td>
                  </>
                );
              })}
            {status && (
              <td className="border-b p-1 border-r text-center border-gray-300">
                <Chip variant="gradient" color="yellow" value="Pending" />
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TableShow;
