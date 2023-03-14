import { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import SelectRoleModal from "./SelectRoleModal";
import AlertComponent from "@/components/AlertComponent";

const AddUserModel = ({ size, refreshData, itemHead, fieldType, min }) => {
  const [open, setOpen] = useState(false);
  const [roleModal, setRoleModal] = useState(false);
  const [role, setRole] = useState();
  const [alertShow, setAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const refForm = useRef(null);

  const handleOpen = () => setOpen(!open);

  const handleOpenRoleModal = () => {
    setRoleModal(!roleModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(refForm.current);

    const dataTemp = {};

    formData.forEach((value, key) => {
      dataTemp[key] = value;
    });

    dataTemp["role_id"] = role.role_id;

    try {
      await axios.post("/api/user", { data: dataTemp }).then((res) => {
        handleOpen();
        refreshData();
      });
    } catch (error) {
      setAlertMessage(error.response.data);
      setAlertShow(true);
    }
  };

  const submitAddRole = () => {
    refForm.current.requestSubmit();
  };

  return (
    <div className="lg:static">
      <div className="flex gap-3">
        <IconButton
          size={size}
          className="w-20"
          onClick={handleOpen}
          color="orange"
        >
          <PlusCircleIcon className="h-6" />
        </IconButton>
      </div>
      <Dialog
        open={open}
        size={"xl"}
        handler={handleOpen}
        className="flex flex-col"
      >
        <DialogHeader>Add User</DialogHeader>
        <DialogBody
          className="flex-1 bg-blue-gray-50 overflow-y-scroll"
          divider
        >
          <form
            ref={refForm}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className={`grid grid-cols-2 gap-5 h-min w-full`}>
              {itemHead &&
                itemHead.map((key, index) => {
                  return (
                    <Input
                      label={key.toUpperCase()}
                      color="orange"
                      key={index}
                      name={key}
                      type={fieldType[index]}
                      min={min[index]}
                      required
                    ></Input>
                  );
                })}
              <Input
                readOnly
                label="Role"
                name="role_id"
                color="orange"
                className="w-full"
                defaultValue={role ? role.name : ""}
                onClick={handleOpenRoleModal}
                onKeyDown={(e) => {
                  if (e.key !== "Tab") handleOpenRoleModal();
                }}
                tabIndex="4"
                required={true}
                key={role ? role.name : "role"}
              />
            </div>
          </form>

          <AlertComponent
            setShow={setAlertShow}
            show={alertShow}
            message={alertMessage}
          />

          <div>
            <SelectRoleModal
              handleOpenMod={handleOpenRoleModal}
              modalOpen={roleModal}
              setRole={setRole}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              handleOpen();
              setRole(null);
            }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={(e) => submitAddRole(e)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default AddUserModel;
