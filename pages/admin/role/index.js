import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Checkbox,
  Typography,
  DialogFooter,
  Card,
  CardBody,
  IconButton,
} from "@material-tailwind/react";
import UpdateModal from "@/components/Modal/UpdateRoleModal";
import DeleteDialog from "@/components/Modal/DeleteModal";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import DetailRoleModal from "@/components/Modal/DetailRoleModal";

const role = () => {
  const [permision, setPermision] = useState();
  const [role, setRole] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState();
  const [permisionList, setPermisionList] = useState([]);
  const [errName, setErrName] = useState();
  const [errPermision, setErrPermision] = useState();
  const [size, setSize] = useState();

  const fetchPermision = async () => {
    const res = await axios.get("/api/Permision").then((res) => res.data);
    setPermision(res);
  };

  const fetchRole = async () => {
    const res = await axios.get("/api/Role").then((res) => res.data);
    setRole(res);
  };

  const handleOpen = async () => {
    setOpenDialog(!openDialog);
    setPermisionList([]);
    setName(null);
    setErrName(null);
    setErrPermision(null);
  };

  const handleSubmit = async (e) => {
    console.log("first");
    e.preventDefault();
    const res = await axios
      .post("/api/Role", {
        data: { name, permision: permisionList.toString() },
      })
      .then((e) => {
        fetchRole();
        setOpenDialog(false);
      })
      .catch((err) => {
        setErrName(err.response.data.name);
        setErrPermision(err.response.data.permision);
      });
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      setPermisionList([...permisionList, e.target.value]);
    } else {
      setPermisionList(permisionList.filter((el) => el !== e.target.value));
    }
  };

  useEffect(() => {
    fetchPermision();
    fetchRole();
  }, []);

  return (
    <Card>
      <CardBody className="flex flex-col">
        <div className="overflow-x-auto w-full">
          <div className="inline-block min-w-full ">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b bg-white">
                  <tr>
                    <th
                      scope="col"
                      colSpan={2}
                      className="text-sm font-medium text-gray-900 text-left mb-4"
                    >
                      <Typography variant="h4">Daftar Role</Typography>
                    </th>
                    <th className="flex justify-end mr-4 mb-4">
                      <IconButton
                        className="flex items-center justify-center"
                        color="orange"
                        onClick={handleOpen}
                      >
                        <div className="h-6 w-6">
                          <PlusCircleIcon />
                        </div>
                      </IconButton>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {role &&
                    role.map((e, i) => {
                      return (
                        <tr className="bg-white border-b" key={i}>
                          <td className="text-md text-gray-900 px-6 py-2 whitespace-nowrap">
                            {i + 1}
                          </td>
                          <td className="text-md text-gray-900 px-6 py-2 whitespace-nowrap">
                            {e.name}
                          </td>
                          {/* <td className="text-md text-gray-900 px-6 py-2 whitespace-nowrap">{result.permision.toString()}</td> */}
                          <td className="flex justify-end">
                            <div className="flex gap-2 mr-4">
                              <DetailRoleModal item={e} />
                              <UpdateModal
                                size={size}
                                item={e}
                                itemHead={["name"]}
                                updateUrl="/api/Permision/"
                                refreshData={fetchRole}
                                itemIndex="role_id"
                                data={permision}
                              />
                              <DeleteDialog
                                itemToDelete={e}
                                itemHead={["name"]}
                                refreshData={fetchRole}
                                deleteUrl="/api/Role/"
                                itemIndex="role_id"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardBody>

      <Dialog
        className="p-5"
        open={openDialog}
        handler={handleOpen}
        size={size == "lg" ? "lg" : "xxl"}
      >
        <DialogHeader>Tambah Role</DialogHeader>
        <DialogBody>
          <div className="w-full flex justify-start gap-x-5 mb-5">
            <div className="w-72">
              <Input
                label="Username"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              variant="gradient"
              color="blue"
              onClick={handleSubmit}
            >
              <span>Submit</span>
            </Button>
          </div>
          <div className=" flex gap-x-4">
            {errName && (
              <div
                class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {errName.toString()}
              </div>
            )}
            {errPermision && (
              <div
                class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {errPermision.toString()}
              </div>
            )}
          </div>
          <div className="max-h-96 py-4 overflow-y-auto text-gray-800 mt-5">
            {permision &&
              Object.keys(permision).map((e, i) => {
                return (
                  <div key={i} className="mb-4">
                    <h1 className="text-base font-bold ">{e}</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 font-semibold text-sm">
                      {permision[e].map((el, idx) => {
                        return (
                          <Checkbox
                            key={idx}
                            id={el.name}
                            value={el.permision_id}
                            label={el.label}
                            ripple={true}
                            onChange={handleChange}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

export default role;
