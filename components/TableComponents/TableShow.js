import { Chip } from "@material-tailwind/react";

const TableShow = (props) => {
  const { head, title, status } = props;

  return (
    <>
      <div className="text-c">
        <div className="mx-2 mb-4 text-lg">
          <h3>{title}</h3>
        </div>
      </div>
      <table className=" p-4 bg-white rounded-lg shadow w-full">
        <thead>
          <tr>
            <th class="border-b-2 p-1 dark:border-dark-5 whitespace-nowrap font-normal"></th>
            {head &&
              head.map((labelHead) => {
                return (
                  <th
                    className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-c"
                    key={labelHead}
                  >
                    {labelHead}
                  </th>
                );
              })}
            {status && (
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-c">
                Status
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr className="text-c">
            <td className="border-b-2 p-1 dark:border-dark-5 border-r text-center">
              1
            </td>
            {head &&
              head.map(() => {
                return (
                  <>
                    <td className="border-b-2 p-4 dark:border-dark-5 border-r text-center">
                      {Math.floor(Math.random() * 2000)}
                    </td>
                  </>
                );
              })}
            {status && (
              <td className="border-b-2 p-1 dark:border-dark-5 border-r text-center">
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
