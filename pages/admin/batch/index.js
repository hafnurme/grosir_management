import BatchTable from "@/components/TableComponents/Batch/BatchTable";
import BatchTablePanel from "@/components/TableComponents/Batch/BatchTablePanel";
import { Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function index() {
  const [batch, setBatch] = useState();
  const [permission, setPermission] = useState();

  const { data: session, status } = useSession();

  const fetchBatch = async () => {
    const dataTemp = await axios.get("/api/batch").then((res) => {
      return res.data;
    });

    setBatch(dataTemp);
  };

  useEffect(() => {
    fetchBatch();
  }, []);

  useEffect(() => {
    if (session) {
      return setPermission(session.permission);
    }
  }, [status]);

  return (
    <div>
      {batch && (
        <div>
          <div className="flex justify-between items-center py-4 px-2">
            <div className="hidden sm:block">
              <Typography variant="h4">Batch</Typography>
            </div>
            <div className="flex gap-2 w-full sm:justify-end">
              <div className="flex items-center w-full sm:w-52">
                <Input label="Search" color="orange" />
              </div>
            </div>
          </div>
          <div className="overflow-x-scroll lg:overflow-auto mx-2 sm:m-0">
            <BatchTablePanel data={batch} refreshData={fetchBatch} />
          </div>
          <div className="px-2 flex justify-center sm:justify-end">
            {/* <Paginate
              page={batch}
              refreshData={fetchBatch}
              setData={setBatch}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
}
