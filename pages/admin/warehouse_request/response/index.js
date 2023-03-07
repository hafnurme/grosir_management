import GetOrder from "@/components/Modal/Order/GetOrderModalAdmin";
import Paginate from "@/components/paginate";
import InventoryTable from "@/components/TableComponents/InventoryTable";
import ResponseTable from "@/components/TableComponents/ResponseTable";
import { Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function index() {
  const [response, setRequestResponse] = useState();
  const [permission, setPermission] = useState();

  const { data: session, status } = useSession();

  const fetchResponse = async () => {
    const dataTemp = await axios.get("/api/warehouse/response").then((res) => {
      return res.data;
    });

    setRequestResponse(dataTemp);
  };

  useEffect(() => {
    fetchResponse();
  }, []);

  useEffect(() => {
    if (session) {
      return setPermission(session.permission);
    }
  }, [status]);

  return (
    <div>
      {response && (
        <div>
          <div className="flex justify-between items-center py-4 px-2">
            <div className="hidden sm:block">
              <Typography variant="h4">Get Order</Typography>
            </div>
            <div className="flex gap-2 w-full sm:justify-end">
              <div className="flex items-center w-full sm:w-52">
                <Input label="Search" color="orange" />
              </div>
            </div>
          </div>
          <div className="overflow-x-scroll lg:overflow-auto mx-2 sm:m-0">
            <ResponseTable
              head={["quantity", "response_id"]}
              title="Response List"
              data={response.data}
              refreshData={fetchResponse}
            />
          </div>
          <div className="px-2 flex justify-center sm:justify-end">
            <Paginate
              page={response}
              refreshData={fetchResponse}
              setData={setRequestResponse}
            />
          </div>
        </div>
      )}
    </div>
  );
}
