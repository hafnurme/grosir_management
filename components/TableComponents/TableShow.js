import { Chip } from "@material-tailwind/react";
import { useEffect } from "react";

const TableShow = (props) => {
  const { title, status, data, head } = props;
  return (
    <>
      {title && (
        <div className="text-c">
          <div className="mx-2 mb-4 text-md">
            <h3>{title}</h3>
          </div>
        </div>
      )}
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
            {status && (
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((object, indexp) => {
              return (
                <tr className="bg-white border-b text-c" key={indexp}>
                  <td className="px-6 py-3">{indexp + 1}</td>
                  {head &&
                    head.map((elem, i) => {
                      return (
                        <td className="px-6 py-3" key={Math.random() * 100 * i}>
                          {object[elem]}
                        </td>
                      );
                    })}
                  {status && (
                    <td className="px-6 py-3">
                      <Chip variant="gradient" color="yellow" value="Pending" />
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TableShow;
