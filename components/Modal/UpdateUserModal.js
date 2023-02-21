import { PencilSquareIcon } from "@heroicons/react/20/solid";
import {
    Button,
    Checkbox,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Radio,
} from "@material-tailwind/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

export default function UpdateModal({
    item,
    itemHead,
    updateUrl,
    refreshData,
    itemIndex,
    size,
    col,
}) {
    const [open, setOpen] = useState(false);
    const [itemUpdate, setItemUpdate] = useState({ username: "", name: "", contact: "", email: "", role_id: "" });
    const [role, setRole] = useState()
    const [roleId, setRoleId] = useState()

    useEffect(() => {
        setItemUpdate({ username: item.username, name: item.name, contact: item.password, email: item.email, role_id: item.role_id });
        fetchRole()
    }, []);

    const fetchRole = async () => {
        const res = await axios.get('/api/Role').then(res => res.data)

        setRole(res)
    }

    const handleUpdate = async (e, id) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        let itemUpdateTemp = itemUpdate;

        formData.forEach((value, key) => {
            itemUpdateTemp[key] = value;
        });


        setItemUpdate(itemUpdateTemp);

        await axios
            .put(`${updateUrl}${id}`, {
                data: itemUpdate,
            })
            .then((res) => {
                console.log(res.data)
                refreshData();
                handleOpen();
            });
    };

    const handleOpen = () => setOpen(!open);

    const handleOnChange = (e) => {
        setRoleId(e.target.value)
    }

    return (
        <Fragment>
            <Button variant="text" onClick={handleOpen}>
                ubah profile
            </Button>
            <Dialog open={open} handler={handleOpen} size={size}>
                <form
                    className="w-full relative flex flex-col"
                    onSubmit={(e) => {
                        handleUpdate(e, item[`${itemIndex ? itemIndex : "id"}`]);
                    }}
                >
                    <DialogHeader>Update</DialogHeader>
                    <DialogBody className="bg-blue-gray-50 flex-1" divider>
                        <h1 className="text-xl font-semibold mb-5">Profile</h1>
                        <div className={`grid grid-cols-${col || "2"} gap-5 h-min w-full  mb-5`}>
                            {itemUpdate &&
                                itemHead.map((key, index) => {
                                    return (
                                        <Input
                                            label={key.toUpperCase()}
                                            color="orange"
                                            key={index}
                                            defaultValue={item[key]}
                                            name={key}
                                        ></Input>
                                    );
                                })}
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">Role</h1>
                            {role &&
                                role.map((e, i) => {
                                    if (e.role_id == item.role_id) {
                                        return <Radio name="role_id" key={i} value={e.role_id} label={e.name} onChange={handleOnChange} defaultChecked={true} />
                                    } else {
                                        return <Radio name="role_id" key={i} value={e.role_id} label={e.name} onChange={handleOnChange} defaultChecked={false} />
                                    }
                                })
                            }
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="gray"
                            className="text-c mr-2"
                            onClick={handleOpen}
                        >
                            Close
                        </Button>
                        <Button color="orange" type="submit">
                            Update
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </Fragment>
    );
}
