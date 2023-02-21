const UserTable = ({ data }) => {
  return (
    <>
      {data &&
        data.map((element, index) => {
          return (
            <div className="px-3 bg-gray-50 border-b text-gray-700">
              <span className="block p-2">{element["username"]}</span>
            </div>
          );
        })}
    </>
  );
};

export default UserTable;
