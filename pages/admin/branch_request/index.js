import AddModal from "@/components/Modal/AddModal";
import WarehouseRequestAddModal from "@/components/Modal/WarehouseRequest/WarehouseRequestAddModal";
import BranchRequestPanel from "@/components/TableComponents/BranchRequest/BranchRequestPandel";
import WarehouseRequestPanel from "@/components/TableComponents/WarehouseRequest/WarehouseRequestPanel";
import { Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function BranchRequest() {
  const [branchRequest, setBranchRequest] = useState();
  const [permission, setPermission] = useState();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      setPermission(session.permission);
    }
  }, [status]);

  const fetchBranchRequest = async () => {
    const dataTemp = await axios.get("/api/branch/request").then((res) => {
      return res.data;
    });

    setBranchRequest(dataTemp);
  };

  useEffect(() => {
    fetchBranchRequest();
  }, []);

  return (
    <>
      {branchRequest && (
        <div>
          <div className="flex justify-between items-center py-4 px-2">
            <div>
              <Typography variant="h4">Branch Request</Typography>
            </div>
            {/* {permission && permission.includes("tambah-request-pesanan") && (
              <div className="flex gap-2">
                <WarehouseRequestAddModal refreshData={fetchBranchRequest} />
              </div>
            )} */}
          </div>
          <div className="px-2 sm:px-0">
            <BranchRequestPanel
              data={branchRequest.data}
              refreshData={fetchBranchRequest}
              permission={permission}
            />
          </div>
        </div>
      )}
    </>
  );
}
