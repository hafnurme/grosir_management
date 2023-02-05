import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Card, Input } from "@material-tailwind/react";
import axios from "axios";
import BranchTable from "../../components/TableComponents/BranchTable";
import { getSession } from "next-auth/react";

export default function Branch() {
  const [branch, setBranch] = useState();
  const [branch_name, setName] = useState(null);
  const [leader_name, setLeader] = useState(null);
  const [contact, setContact] = useState(null);
  const [address, setAddress] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const session = await getSession();
    const user_id = session.user.user_id;
    const res = await axios.post("/api/branch", {
      data: { branch_name, leader_name, contact, address, user_id },
    });
    fetchBranch();
  };

  const fetchBranch = async () => {
    const branches = await axios.get("/api/branch");
    const res = branches.data;

    setBranch(res);
  };
  useEffect(() => {
    fetchBranch();
  }, []);
  return (
    <>
      <div className="flex mb-5">
        <Card className="flex-1 h-min bg-white p-5">
          <form method="POST" onSubmit={handleSubmit}>
            <div className=" flex gap-3 mb-3">
              <Input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                color="deep-orange"
                label="Name"
                tabIndex="1"
              />
              <Input
                onChange={(e) => {
                  setLeader(e.target.value);
                }}
                color="deep-orange"
                label="Leader"
                tabIndex="2"
              />
              <Input
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                color="deep-orange"
                label="Address"
                tabIndex="3"
              />
              <Input
                onChange={(e) => {
                  setContact(e.target.value);
                }}
                color="deep-orange"
                label="Contact"
                tabIndex="4"
              />
            </div>

            <div className="flex justify-end">
              <Button
                className="flex w-40 items-center justify-center"
                color="deep-orange"
                type="submit"
              >
                <div className="text-md">Add</div>
                <div className="h-5 w-5 inline-block ml-2">
                  <PlusCircleIcon />
                </div>
              </Button>
            </div>
          </form>
        </Card>
      </div>
      <div className="my-3">
        <BranchTable
          head={["branch_name", "leader_name", "contact", "address"]}
          title="Branches"
          data={branch}
          refreshData={fetchBranch}
        />
      </div>
    </>
  );
}
