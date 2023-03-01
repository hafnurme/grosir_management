import axios from "axios";
import { useEffect, useState } from "react";
import DeleteModal from "../Modal/DeleteModal";
import DetailModal from "../Modal/DetailModal";
import UpdateModal from "../Modal/UpdateModal";
import UserDetailModal from "../Modal/UserDetailModal";

const UserTable = ({ data, head, refreshData }) => {
  const [finalData, setFinalData] = useState();
  const [userDetail, setUserDetail] = useState();

  const fetchUserDetail = async (id) => {
    const user_detail = await axios.get(`/api/user/${id}`).then((res) => {
      return res.data;
    });

    setUserDetail(user_detail);
  };

  useEffect(() => {
    setFinalData(data);
  }, [data]);

  return (
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
          <th scope="col" className="px-6 py-3"></th>
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
                <td className="px-3">{indexp + 1}</td>
                {head &&
                  head.map((elem, i) => {
                    return (
                      <td
                        className="px-2  whitespace-nowrap lg:whitespace-normal py-1"
                        key={Math.random() * 100 * i}
                      >
                        {object[elem]}
                      </td>
                    );
                  })}
                <td className="px-2 sm:py-1 flex gap-3 justify-end items-center">
                  <DetailModal
                    col={1}
                    item={object}
                    exception={["user_id", "role_id"]}
                    size="xl"
                  />
                  <UpdateModal
                    item={object}
                    itemHead={["username", "name", "email", "contact"]}
                    updateUrl="/api/user/"
                    refreshData={refreshData}
                    itemIndex={"user_id"}
                  />
                  <DeleteModal
                    itemToDelete={object}
                    itemHead={head}
                    deleteUrl="/api/user/"
                    refreshData={refreshData}
                    itemIndex="user_id"
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default UserTable;
